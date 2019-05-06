// tslint:disable:no-console
import * as React from 'react';
import {
  // profilecard as profilecardUtils,
  emoji,
  taskDecision,
} from './component-atlaskit-editor/src/util-data-test';
import { CardEvent } from '@atlaskit/media-card';
import { defaultSchema, ActionMarkAction } from '@atlaskit/adf-schema';
import {
  CardSurroundings,
  ProviderFactory,
  ExtensionHandlers,
  EventHandlers,
} from '@atlaskit/editor-common';
import Button from '@atlaskit/button';
// import {
//   storyMediaProviderFactory,
//   storyContextIdentifierProviderFactory,
// } from '@atlaskit/editor-test-helpers';
// import * as Clock from 'react-live-clock';

import {
  default as Renderer,
  Props as RendererProps,
  RendererAppearance,
} from '@atlaskit/renderer/ui/Renderer';

// import { AkProfileClient, modifyResponse } from '@atlaskit/profilecard';

import { EmailSerializer, renderDocument, TextSerializer } from '@atlaskit/renderer';


// const { getMockProfileClient: getMockProfileClientUtil } = profilecardUtils;
// const MockProfileClient = getMockProfileClientUtil(
//   AkProfileClient,
//   modifyResponse,
// );

const mentionProvider = Promise.resolve({
  shouldHighlightMention(mention: { id: string }) {
    return mention.id === 'ABCDE-ABCDE-ABCDE-ABCDE';
  },
});

// const mediaProvider = storyMediaProviderFactory();

const emojiProvider = emoji.storyData.getEmojiResource();

// const profilecardProvider = Promise.resolve({
//   cloudId: 'DUMMY-CLOUDID',
//   resourceClient: new MockProfileClient({
//     cacheSize: 10,
//     cacheMaxAge: 5000,
//   }),
//   getActions: (id: string) => {
//     const actions = [
//       {
//         label: 'Mention',
//         callback: () => console.log('profile-card:mention'),
//       },
//       {
//         label: 'Message',
//         callback: () => console.log('profile-card:message'),
//       },
//     ];

//     return id === '1' ? actions : actions.slice(0, 1);
//   },
// });

const taskDecisionProvider = Promise.resolve(
  taskDecision.getMockTaskDecisionResource(),
);

// const contextIdentifierProvider = storyContextIdentifierProviderFactory();

const providerFactory = ProviderFactory.create({
  mentionProvider,
  // mediaProvider,
  emojiProvider,
  // profilecardProvider,
  taskDecisionProvider,
  // contextIdentifierProvider,
});

// const extensionHandlers: ExtensionHandlers = {
//   'com.atlassian.fabric': (ext, doc) => {
//     const { extensionKey } = ext;

//     switch (extensionKey) {
//       case 'clock':
//         return (
//           <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />
//         );
//       case 'mention':
//         return [
//           {
//             type: 'paragraph',
//             content: [
//               {
//                 type: 'text',
//                 text:
//                   'Hi, my name is... My name is... My name is... My name is ',
//               },
//               {
//                 type: 'mention',
//                 attrs: {
//                   id: '1',
//                   text: '@Oscar Wallhult',
//                 },
//               },
//             ],
//           },
//         ];
//       case 'inline':
//         return [
//           {
//             type: 'text',
//             text: 'Hi, my name is... My name is... My name is... My name is ',
//           },
//           {
//             type: 'mention',
//             attrs: {
//               id: '1',
//               text: '@Oscar Wallhult',
//             },
//           },
//         ];
//       default:
//         return null;
//     }
//   },
// };

const eventHandlers: EventHandlers = {
  mention: {
    onClick: () => console.log('onMentionClick'),
    onMouseEnter: () => console.log('onMentionMouseEnter'),
    onMouseLeave: () => console.log('onMentionMouseLeave'),
  },
  media: {
    onClick: (
      result: CardEvent,
      surroundings?: CardSurroundings,
      analyticsEvent?: any,
    ) => {
      // json-safe-stringify does not handle cyclic references in the react mouse click event
      return console.log(
        'onMediaClick',
        '[react.MouseEvent]',
        result.mediaItemDetails,
        surroundings,
        analyticsEvent,
      );
    },
  },
  action: {
    onClick: (event: ActionMarkAction) =>
      console.log('onClick', '[react.MouseEvent]', event),
  },
};

export interface DemoRendererProps {
  withPortal?: boolean;
  withProviders?: boolean;
  withExtension?: boolean;
  serializer: 'react' | 'text' | 'email';
  document?: object;
  appearance?: RendererAppearance;
  maxHeight?: number;
  truncationEnabled?: boolean;
  allowDynamicTextSizing?: boolean;
}

export interface DemoRendererState {
  input: string;
  portal?: HTMLElement;
  truncated: boolean;
  showSidebar: boolean;
  shouldUseEventHandlers: boolean;
}

export default class RendererDemo extends React.Component<
  DemoRendererProps,
  DemoRendererState
> {
  textSerializer = new TextSerializer(defaultSchema);
  emailSerializer = new EmailSerializer();
  emailRef?: HTMLIFrameElement;
  inputBox: HTMLTextAreaElement | null;
  emailTextareaRef?: any;

  constructor(props: DemoRendererProps) {
    super(props);

    this.state = {
      truncated: true,
      shouldUseEventHandlers: false,
    };
  }

  private handlePortalRef = (portal: HTMLElement | null) => {
    this.setState({ portal: portal || undefined });
  };

  private onEmailRef = (ref: HTMLIFrameElement | null) => {
    this.emailRef = ref || undefined;

    if (ref && ref.contentDocument) {
      // reset padding/margin for empty iframe with about:src URL
      ref.contentDocument.body.style.padding = '0';
      ref.contentDocument.body.style.margin = '0';

      this.onComponentRendered();
    }
  };

  componentDidMount() {
    this.onComponentRendered();
  }

  componentDidUpdate() {
    this.onComponentRendered();
  }

  render() {
    return (
      <>
      {this.renderRenderer()}
      </>
    );
  }

  private onComponentRendered() {
    if (this.props.serializer !== 'email' || !this.emailRef) {
      return;
    }

    try {
      const doc = JSON.parse(this.state.input);
      const html = renderDocument<string>(doc, this.emailSerializer).result;

      if (this.emailRef && this.emailRef.contentDocument && html) {
        this.emailRef.contentDocument.body.innerHTML = html;
        this.emailTextareaRef.value = html;
      }
    } catch (ex) {
      console.error(ex);
      // pass
    }
  }

  private toggleTruncated(e: React.MouseEvent<HTMLButtonElement>) {
    this.setState(prevState => ({
      truncated: !prevState.truncated,
    }));
  }

  private renderRenderer() {
    const { shouldUseEventHandlers } = this.state;
    if (this.props.serializer !== 'react') {
      return null;
    }

    try {
      let props: RendererProps = {
        document: JSON.parse(this.props.document),
      };

      props.document.version = 1
      if (this.props.withProviders) {
        props.eventHandlers = shouldUseEventHandlers
          ? eventHandlers
          : undefined;
        props.dataProviders = providerFactory;
      }

      // if (this.props.withExtension) {
      //   props.extensionHandlers = extensionHandlers;
      // }

      if (this.props.withPortal) {
        props.portal = this.state.portal;
      }

      props.appearance = this.props.appearance;
      props.maxHeight = this.props.maxHeight;
      props.truncated = this.props.truncationEnabled && this.state.truncated;
      props.allowDynamicTextSizing = this.props.allowDynamicTextSizing;

      const expandButton = (
        <div>
          <Button
            appearance={'link'}
            spacing={'none'}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              this.toggleTruncated(e)
            }
          >
            {this.state.truncated ? 'Expand text' : 'Collapse text'}
          </Button>
          &nbsp;&middot;&nbsp;
          <Button appearance={'link'} spacing={'none'}>
            Do something else
          </Button>
        </div>
      );

      return (
        <div>
          <div id="RendererOutput">
            <Renderer {...props} />
          </div>
          {this.props.truncationEnabled ? expandButton : null}
        </div>
      );
    } catch (ex) {
      return <pre>Invalid document: {ex.stack}</pre>;
    }
  }


  private toggleSidebar = () => {
    this.setState(prevState => ({ showSidebar: !prevState.showSidebar }));
  };

  private toggleEventHandlers = () => {
    this.setState(prevState => ({
      shouldUseEventHandlers: !prevState.shouldUseEventHandlers,
    }));
  };

  private copyHTMLToClipboard = () => {
    if (!this.emailTextareaRef) return;
    this.emailTextareaRef.select();
    document.execCommand('copy');
  };

  private onDocumentChange = () => {
    if (this.inputBox) {
      this.setState({ input: this.inputBox.value });
    }
  };
}
