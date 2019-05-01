import { EventEmitter2 } from 'eventemitter2';
import { getVersion, sendableSteps } from 'prosemirror-collab';
import { Transaction, EditorState } from 'prosemirror-state';
import {
  CollabEditProvider,
  CollabEvent,
  PubSubClient,
  StepResponse,
  Config,
} from './types';

import {
  TelepointerData,
  Participant,
} from '../types'

import { Channel } from './channel';
import { logger } from './';
import { getParticipant } from './mock-users';
import { response } from 'express';

export class CollabProvider implements CollabEditProvider {
  private eventEmitter: EventEmitter2 = new EventEmitter2();
  private channel: Channel;
  private queue: StepResponse[] = [];
  private config: Config;

  private getState = (): any => {};

  private participants: Map<string, Participant> = new Map();

  constructor(config: Config, pubSubClient: PubSubClient) {
    this.config = config;
    this.channel = new Channel(config, pubSubClient);
  }

  initialize(getState: () => any) {
    this.getState = getState;

    this.channel
      .on('connected', ({ doc, version }) => {
        logger(`Joined collab-session. The document version is ${version}`);
        const { userId } = this.config;

        this.emit('init', { sid: userId, doc, version }) // Set initial document
          .emit('connected', { sid: userId }); // Let the plugin know that we're connected an ready to go
      })
      .on('data', this.onReceiveData)
      .on('telepointer', this.onReceiveTelepointer)
      .connect();

    return this;
  }

  /**
   * Send steps from transaction to other participants
   */
  send(tr: Transaction, oldState: EditorState, newState: EditorState) {
    // Ignore transactions without steps
    if (!tr.steps || !tr.steps.length) {
      return;
    }

    this.channel.sendSteps(newState, this.getState);
  }

  /**
   * Send messages, such as telepointers, to other participants.
   */
  sendMessage(data: any) {
    if (!data) {
      return;
    }

    const { type } = data;
    switch (type) {
      case 'telepointer':
        this.channel.sendTelepointer({
          ...data,
          timestamp: new Date().getTime(),
        });
    }
  }

  private queueTimeout?: number;
  private pauseQueue: boolean = false;

  private queueData(data: StepResponse) {
    logger(`Queuing data for version ${data.version}`);
    const orderedQueue = [...this.queue, data].sort((a, b) =>
      a.version > b.version ? 1 : -1,
    );

    this.queue = orderedQueue;

    if (!this.queueTimeout && !this.pauseQueue) {
      this.queueTimeout = window.setTimeout(() => {
        this.catchup();
      }, 1000);
    }
  }

  private async catchup() {
    this.pauseQueue = true;

    logger(`Too far behind - fetching data from service`);

    const currentVersion = getVersion(this.getState());

    try {
      const { doc, version, steps } = await this.channel.getSteps(
        currentVersion,
      );

      /**
       * Remove steps from queue where the version is older than
       * the version we received from service. Keep steps that might be
       * newer.
       */
      this.queue = this.queue.filter(data => data.version > version);

      // We are too far behind - replace the entire document
      if (doc) {
        logger(`Replacing document.`);
        const { userId } = this.config;

        const { steps: localSteps = [] } = sendableSteps(this.getState()) || {};

        // Replace local document and version number
        this.emit('init', { sid: userId, doc, version });

        // Re-aply local steps
        if (localSteps.length) {
          this.emit('local-steps', { steps: localSteps });
        }

        clearTimeout(this.queueTimeout);
        this.pauseQueue = false;
        this.queueTimeout = undefined;
      } else if (steps) {
        logger(`Applying the new steps. Version: ${version}`);
        this.onReceiveData({ steps, version }, true);
        clearTimeout(this.queueTimeout);
        this.pauseQueue = false;
        this.queueTimeout = undefined;
      }
    } catch (err) {
      logger(`Unable to get latest steps: ${err}`);
    }
  }

  private processQeueue() {
    if (this.pauseQueue) {
      logger(`Queue is paused. Aborting.`);
      return;
    }

    logger(`Looking for proccessable data`);

    if (this.queue.length === 0) {
      return;
    }

    const [firstItem] = this.queue;
    const currentVersion = getVersion(this.getState());
    const expectedVersion = currentVersion + firstItem.steps.length;

    if (firstItem.version === expectedVersion) {
      logger(`Applying data from queue!`);
      this.queue.splice(0, 1);
      this.processRemoteData(firstItem);
    }
  }

  private processRemoteData = (data: StepResponse, forceApply?: boolean) => {
    if (this.pauseQueue && !forceApply) {
      logger(`Queue is paused. Aborting.`);
      return;
    }

    const { version, steps } = data;

    logger(`Processing data. Version: ${version}`);

    if (steps && steps.length) {
      const userIds = steps.map(step => step.userId);
      this.emit('data', { json: steps, version, userIds });
    }

    this.processQeueue();
  };

  private onReceiveData = (data: StepResponse, forceApply?: boolean) => {
    const currentVersion = getVersion(this.getState());
    const expectedVersion = currentVersion + data.steps.length;

    if (data.version === currentVersion) {
      logger(`Received data we already have. Ignoring.`);
    } else if (data.version === expectedVersion) {
      this.processRemoteData(data, forceApply);
    } else if (data.version > expectedVersion) {
      logger(
        `Version too high. Expected ${expectedVersion} but got ${
          data.version
        }. Current local version is ${currentVersion}`,
      );
      this.queueData(data);
    }
  };

  private onReceiveTelepointer = (
    data: TelepointerData & { timestamp: number },
  ) => {
    const { sessionId } = data;

    if (sessionId === this.config.userId) {
      return;
    }

    const participant = this.participants.get(sessionId);

    if (participant && participant.lastActive > data.timestamp) {
      logger(`Old telepointer event. Ignoring.`);
      return;
    }

    this.updateParticipant(sessionId, data.timestamp);
    logger(`Remote telepointer from ${sessionId}`);

    this.emit('telepointer', data);
  };

  private async updateParticipant(userId: string, timestamp: number) {
    // Get info about a user from server
    const response = await this.channel.getUser(userId);

    this.participants.set(userId, {
      name: response.user.username,
      email: response.user.email,
      avatar: `https://api.adorable.io/avatars/80/${userId.replace(/\s/g, '')}.png`,
      sessionId: userId,
      lastActive: timestamp,
    });

    const joined = [this.participants.get(userId)];

    // Filter out participants that's been inactive for
    // more than 5 minutes.

    const now = new Date().getTime();
    const left = Array.from(this.participants.values()).filter(
      p => (now - p.lastActive) / 1000 > 300,
    );

    left.forEach(p => this.participants.delete(p.sessionId));

    this.emit('presence', { joined, left });
  }

  /**
   * Emit events to subscribers
   */
  private emit(evt: CollabEvent, data: any) {
    this.eventEmitter.emit(evt, data);
    return this;
  }

  /**
   * Subscribe to events emitted by this provider
   */
  on(evt: CollabEvent, handler: (...args: any) => void) {
    this.eventEmitter.on(evt, handler);
    return this;
  }

  /**
   * Unsubscribe from events emitted by this provider
   */
  off(evt: CollabEvent, handler: (...args: any) => void) {
    this.eventEmitter.off(evt, handler);
    return this;
  }
}
