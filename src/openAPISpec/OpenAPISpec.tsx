import * as React from 'react';
import * as Markdown from 'react-markdown';
import { connect } from 'react-redux';
import { Endpoints, OpenAPIContents } from './components';
import { loadOpenAPISpec, OpenAPIDispatch } from './state';
import { AppRootState, OpenAPISpecDefinition, OpenAPISpecItem } from './types';

import './OpenAPISpec.scss';

// this is awful and I take no responsibility for it
declare const window: { VetsGov: object };

interface OpenAPISpecProps {
  apiId: string;
  endpoint: string;
  spec?: OpenAPISpecDefinition;
  loadSpec: () => void;
}

const mapStateToProps = (
  state: AppRootState,
  ownProps: OpenAPISpecProps,
): Partial<OpenAPISpecProps> => {
  const specItem: OpenAPISpecItem = state.specs[ownProps.apiId];
  return {
    spec: specItem ? specItem.spec : undefined,
  };
};

const mapDispatchToProps = (
  dispatch: OpenAPIDispatch,
  ownProps: OpenAPISpecProps,
): Partial<OpenAPISpecProps> => {
  return {
    loadSpec: () => dispatch(loadOpenAPISpec(ownProps.apiId, ownProps.endpoint)),
  };
};

class OpenAPISpec extends React.Component<OpenAPISpecProps> {
  public componentDidMount() {
    this.props.loadSpec();

    // CollapsiblePanel expects a VetsGov object on the global window
    if (!window.VetsGov) {
      window.VetsGov = { scroll: null };
    }
  }

  public componentDidUpdate(prevProps: OpenAPISpecProps) {
    if (prevProps.apiId !== this.props.apiId || prevProps.endpoint !== this.props.endpoint) {
      this.props.loadSpec();
    }
  }

  public render() {
    if (!this.props.spec) {
      return <div>My API</div>;
    }

    return (
      <div>
        <OpenAPIContents />
        <div id="open-api-description">
          <Markdown>{this.props.spec!.info.description}</Markdown>
        </div>
        <Endpoints apiId={this.props.apiId} />
      </div>
    );
  }
}

export default connect<
  ReturnType<typeof mapStateToProps>,
  ReturnType<typeof mapDispatchToProps>,
  Pick<OpenAPISpecProps, 'apiId' | 'endpoint'>
>(
  mapStateToProps,
  mapDispatchToProps,
)(OpenAPISpec);
