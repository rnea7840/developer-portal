import * as React from 'react';
import * as Markdown from 'react-markdown';
import { connect } from 'react-redux';
import { OpenAPIContents } from './components';
import {
  AppRootState,
  loadOpenAPISpec,
  OpenAPIDispatch,
  OpenAPISpecDefinition,
  OpenAPISpecItem,
  Path,
} from './state';

const HTTP_VERBS = ['get', 'put', 'post', 'delete', 'patch', 'head', 'options', 'trace'];

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
  }

  public componentDidUpdate(prevProps: OpenAPISpecProps) {
    if (prevProps.apiId !== this.props.apiId || prevProps.endpoint !== this.props.endpoint) {
      this.props.loadSpec();
    }
  }

  public render() {
    const { spec } = this.props;
    if (!spec) {
      return <div>My API</div>;
    }

    const paths = Object.keys(spec.paths);
    return (
      <div>
        <OpenAPIContents />
        <div id="open-api-description">
          <Markdown>{this.props.spec!.info.description}</Markdown>
        </div>
        <h2 id="open-api-endpoints">Endpoints</h2>
        <ul>
          {paths.map(
            (path: string): JSX.Element => {
              const pathDefinition: Path = spec.paths[path];
              // console.log(path, pathDefinition);
              return (
                <React.Fragment key={path}>
                  {HTTP_VERBS.map((verb: string) => {
                    if (!pathDefinition[verb]) {
                      return null;
                    }

                    return (
                      <li key={`${path}-${verb}`}>
                        {verb.toUpperCase()} {path}
                      </li>
                    );
                  })}
                </React.Fragment>
              );
            },
          )}
        </ul>
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
