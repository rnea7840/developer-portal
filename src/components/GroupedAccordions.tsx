import CollapsiblePanel from '@department-of-veterans-affairs/formation-react/CollapsiblePanel';
import * as classNames from 'classnames';
import * as React from 'react';

import './GroupedAccordions.scss';

// formation-react has a special object on the window for VA.gov. we really don't
// care about the type except that it compiles.
declare const window: { VetsGov: unknown };

export interface PanelContent {
  readonly body: string | JSX.Element;
  readonly title: string;
}

interface GroupedAccordionsProps {
  readonly panelContents: PanelContent[];
  readonly title: string;
}

interface GroupedAccordionsStates {
  allCollapsed: boolean;
}

interface CollapsiblePanelStates {
  open: boolean;
}

/* eslint-disable @typescript-eslint/indent */
export default class GroupedAccordions extends React.Component<
  GroupedAccordionsProps,
  GroupedAccordionsStates
> {
  private panelRefs: Array<
    React.RefObject<React.Component<Record<string, unknown>, CollapsiblePanelStates>>
  >;
  /* eslint-enable @typescript-eslint/indent */

  public constructor(props: GroupedAccordionsProps) {
    super(props);
    this.state = { allCollapsed: true };
    this.panelRefs = [];
  }

  public componentDidMount(): void {
    // CollapsiblePanel expects a VetsGov object on the global window
    if (!window.VetsGov) {
      window.VetsGov = { scroll: null };
    }
  }

  public componentWillUnmount(): void {
    this.panelRefs = [];
  }

  public render(): JSX.Element {
    return (
      <section className={classNames('va-grouped-accordion', 'vads-u-margin-bottom--2p5')}>
        <div
          className={classNames(
            'vads-u-display--flex',
            'vads-u-justify-content--space-between',
            'vads-u-align-items--center',
          )}
        >
          <h3>{this.props.title}</h3>
          <button
            className={classNames(
              'va-api-grouped-accordions-button',
              'vads-u-color--primary',
              'vads-u-margin--0',
              'vads-u-padding--0',
              'vads-u-text-decoration--underline',
              'vads-u-font-weight--normal',
              'vads-u-width--auto',
            )}
            onClick={event => this.handleExpandCollapse(event)}
          >
            {this.state.allCollapsed ? 'Expand all' : 'Collapse all'}
          </button>
        </div>
        {this.props.panelContents.map((c: PanelContent, index: number) => {
          /* eslint-disable @typescript-eslint/indent -- see .eslintrc.js */
          const panelRef = React.createRef<
            React.Component<Record<string, unknown>, CollapsiblePanelStates>
          >();
          /* eslint-disable @typescript-eslint/indent */

          this.panelRefs.push(panelRef);
          return (
            <CollapsiblePanel
              ref={panelRef}
              panelName={c.title}
              startOpen={!this.state.allCollapsed}
              key={index}
            >
              {c.body}
            </CollapsiblePanel>
          );
        })}
      </section>
    );
  }

  private handleExpandCollapse(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    this.setState(
      (prevState: GroupedAccordionsStates) => ({ allCollapsed: !prevState.allCollapsed }),
      () => {
        this.panelRefs
          .filter(r => r.current && r.current.state.open === this.state.allCollapsed)
          .forEach(r => {
            if (r.current) {
              r.current.setState({ open: !this.state.allCollapsed });
            }
          });
      },
    );
  }
}
