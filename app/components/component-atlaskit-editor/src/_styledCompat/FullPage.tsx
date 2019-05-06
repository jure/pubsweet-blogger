import * as React from 'react';
import { MouseEvent } from 'react';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';
import { akEditorMenuZIndex } from '@atlaskit/editor-common';
import { taskListSelector, decisionListSelector } from '@atlaskit/adf-schema';
// Webpack alias resolves it...
import Avatars from '../../plugins/collab-edit/ui/avatars';
import PluginSlot from '@atlaskit/editor-core/ui/PluginSlot';
import Toolbar from '@atlaskit/editor-core/ui/Toolbar';
import ContentStyles from '@atlaskit/editor-core/ui/ContentStyles';
import { ClickAreaBlock } from '@atlaskit/editor-core/ui/Addon';
import { tableFullPageEditorStyles } from '@atlaskit/editor-core/plugins/table/ui/styles';
import { akEditorToolbarKeylineHeight } from '@atlaskit/editor-core/styles';
import rafSchedule from 'raf-schd';
import { scrollbarStyles } from '@atlaskit/editor-core/ui/styles';
import WidthEmitter from '@atlaskit/editor-core/ui/WidthEmitter';

const GUTTER_PADDING = 32;
const SWOOP_ANIMATION = '0.5s cubic-bezier(.15,1,.3,1)';

const FullPageEditorWrapper = styled.div`
  min-width: 340px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;
FullPageEditorWrapper.displayName = 'FullPageEditorWrapper';

const ScrollContainer = styled(ContentStyles)`
  flex-grow: 1;
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  ${scrollbarStyles};
`;
ScrollContainer.displayName = 'ScrollContainer';

const ContentArea = styled.div`
  line-height: 24px;
  height: 100%;
  width: 100%;
  padding-top: 50px;
  flex-direction: column;
  flex-grow: 1;
  padding-bottom: 55px;
  max-width: ${({ theme, fullWidthMode }: any) =>
    fullWidthMode ? '1800' : theme.layoutMaxWidth + GUTTER_PADDING * 2}px;
  transition: margin-left ${SWOOP_ANIMATION}, max-width ${SWOOP_ANIMATION};
  margin-left: ${({ theme, fullWidthMode }: any) =>
    fullWidthMode
      ? 0
      : `calc(50% - ${(theme.layoutMaxWidth + GUTTER_PADDING * 2) / 2}px)`};

  ${({ theme }) => `
    @media (max-width: ${theme.layoutMaxWidth + GUTTER_PADDING * 2}px) {
      margin-left: auto;
    }
  `}

  & .ProseMirror {
    flex-grow: 1;
    box-sizing: border-box;
  }

  & .ProseMirror {
    & > * {
      /* pre-emptively clear all direct descendant content, just in case any are adjacent floated content */
      clear: both;
    }
    > p,
    > ul,
    > ol:not(${taskListSelector}):not(${decisionListSelector}),
    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > h6 {
      /* deliberately allow wrapping of text based nodes, just in case any are adjacent floated content */
      clear: none;
    }
  }

  ${tableFullPageEditorStyles};
`;
ContentArea.displayName = 'ContentArea';

interface MainToolbarProps {
  showKeyline: boolean;
}

const MainToolbar: React.ComponentClass<
  React.HTMLAttributes<{}> & MainToolbarProps
> = styled.div`
  position: relative;
  align-items: center;
  box-shadow: ${(props: MainToolbarProps) =>
    props.showKeyline
      ? `0 ${akEditorToolbarKeylineHeight}px 0 0 ${colors.N30}`
      : 'none'};
  transition: box-shadow 200ms;
  z-index: ${akEditorMenuZIndex};
  display: flex;
  height: 80px;
  flex-shrink: 0;

  & object {
    height: 0 !important;
  }
`;
MainToolbar.displayName = 'MainToolbar';

const MainToolbarCustomComponentsSlot = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;
MainToolbarCustomComponentsSlot.displayName = 'MainToolbar';

const SecondaryToolbar = styled.div`
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  display: flex;
  padding: 24px 0;
`;
SecondaryToolbar.displayName = 'SecondaryToolbar';

export default class Editor extends React.Component<
  EditorAppearanceComponentProps,
  any
> {
  state = { showKeyline: false };

  static displayName = 'FullPageEditor';
  private appearance: EditorAppearance = 'full-page';
  private scrollContainer: HTMLElement | undefined;
  private scheduledKeylineUpdate: number | undefined;

  stopPropagation = (event: MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  scrollContainerRef = (ref: HTMLElement | null) => {
    const previousScrollContainer = this.scrollContainer;

    // remove existing handler
    if (previousScrollContainer) {
      previousScrollContainer.removeEventListener(
        'scroll',
        this.scheduleUpdateToolbarKeyline,
      );
    }

    this.scrollContainer = ref ? ref : undefined;

    if (this.scrollContainer) {
      this.scrollContainer.addEventListener(
        'scroll',
        this.scheduleUpdateToolbarKeyline,
        false,
      );
      this.updateToolbarKeyline();
    }
  };

  updateToolbarKeyline = () => {
    if (!this.scrollContainer) {
      return false;
    }

    const { scrollTop } = this.scrollContainer;
    this.setState({ showKeyline: scrollTop > akEditorToolbarKeylineHeight });

    return false;
  };

  private scheduleUpdateToolbarKeyline = rafSchedule(this.updateToolbarKeyline);

  componentDidMount() {
    window.addEventListener('resize', this.scheduleUpdateToolbarKeyline, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.scheduleUpdateToolbarKeyline);

    if (this.scheduledKeylineUpdate) {
      cancelAnimationFrame(this.scheduledKeylineUpdate);
    }
  }

  render() {
    const {
      editorDOMElement,
      editorView,
      editorActions,
      eventDispatcher,
      providerFactory,
      primaryToolbarComponents,
      contentComponents,
      customPrimaryToolbarComponents,
      customContentComponents,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      disabled,
      collabEdit,
      dispatchAnalyticsEvent,
      fullWidthMode,
    } = this.props;

    const { showKeyline } = this.state;

    return (
      <FullPageEditorWrapper className="akEditor">
        <MainToolbar showKeyline={showKeyline}>
          <Toolbar
            editorView={editorView!}
            editorActions={editorActions}
            eventDispatcher={eventDispatcher!}
            providerFactory={providerFactory}
            appearance={this.appearance}
            items={primaryToolbarComponents}
            popupsMountPoint={popupsMountPoint}
            popupsBoundariesElement={popupsBoundariesElement}
            popupsScrollableElement={popupsScrollableElement}
            disabled={!!disabled}
            dispatchAnalyticsEvent={dispatchAnalyticsEvent}
          />
          <MainToolbarCustomComponentsSlot>
            <Avatars
              editorView={editorView}
              eventDispatcher={eventDispatcher}
              inviteToEditHandler={collabEdit && collabEdit.inviteToEditHandler}
              isInviteToEditButtonSelected={
                collabEdit && collabEdit.isInviteToEditButtonSelected
              }
            />
            {customPrimaryToolbarComponents}
          </MainToolbarCustomComponentsSlot>
        </MainToolbar>
        <ScrollContainer
          ref={this.scrollContainerRef}
          className="fabric-editor-popup-scroll-parent"
        >
          <ClickAreaBlock editorView={editorView}>
            <ContentArea fullWidthMode={fullWidthMode}>
              <div
                style={{ padding: `0 ${GUTTER_PADDING}px` }}
                className="ak-editor-content-area"
              >
                {customContentComponents}
                {
                  <PluginSlot
                    editorView={editorView}
                    editorActions={editorActions}
                    eventDispatcher={eventDispatcher}
                    providerFactory={providerFactory}
                    appearance={this.appearance}
                    items={contentComponents}
                    popupsMountPoint={popupsMountPoint}
                    popupsBoundariesElement={popupsBoundariesElement}
                    popupsScrollableElement={popupsScrollableElement}
                    disabled={!!disabled}
                    containerElement={this.scrollContainer}
                    dispatchAnalyticsEvent={dispatchAnalyticsEvent}
                  />
                }
                {editorDOMElement}
              </div>
            </ContentArea>
          </ClickAreaBlock>
        </ScrollContainer>
        <WidthEmitter
          editorView={editorView!}
          contentArea={this.scrollContainer}
        />
      </FullPageEditorWrapper>
    );
  }
}
