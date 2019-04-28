import { EditorState } from 'prosemirror-state';
import { CollabEditProvider } from './provider';

export interface Participant {
  lastActive: number;
  sessionId: string;
  avatar: string;
  name: string;
  email: string;
}

export interface InitData {
  doc?: any;
  json?: any;
  version?: number;
  sid?: string;
}

export interface RemoteData {
  json?: any;
  newState?: EditorState;
  userIds?: string[];
}

export interface ConnectionData {
  sid: string;
}

export interface PresenceData {
  joined?: Participant[];
  left?: { sessionId: string }[];
}

export interface TelepointerData {
  type: 'telepointer';
  selection: SendableSelection;
  sessionId: string;
}

export interface SendableSelection {
  type: 'textSelection' | 'nodeSelection';
  anchor: number;
  head: number;
}

export interface CollabEditOptions {
  provider?: Promise<CollabEditProvider>;
  inviteToEditHandler?: (event: Event) => void;
  isInviteToEditButtonSelected?: boolean;
  userId?: string;
  useNativePlugin?: boolean;
  allowUnsupportedContent?: boolean;
}
