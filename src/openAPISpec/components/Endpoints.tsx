import classNames from 'classnames';
import * as React from 'react';
import * as Markdown from 'react-markdown';
import { connect } from 'react-redux';

import CollapsiblePanel from '@department-of-veterans-affairs/formation-react/CollapsiblePanel';
import { AppRootState, Path, Paths } from '../types';
import APIRequest from './APIRequest';
import APIResponse from './APIResponse';

const HTTP_VERBS = ['get', 'put', 'post', 'delete', 'patch', 'head', 'options', 'trace'];
interface EndpointsProps {
  apiId: string;
  paths: Paths;
}

const mapStateToProps = (
  state: AppRootState,
  ownProps: Pick<EndpointsProps, 'apiId'>,
): Pick<EndpointsProps, 'paths'> => {
  const spec = state.specs[ownProps.apiId].spec;
  if (!spec) {
    throw new Error(`Attempted to render endpoints with unknown API: ${ownProps.apiId}`);
  }

  return {
    paths: spec.paths,
  };
};

class Endpoints extends React.Component<EndpointsProps> {
  public render() {
    const pathEndpoints = Object.keys(this.props.paths);
    return (
      <div id="open-api-endpoints">
        <h2>Endpoints</h2>
        <div>
          {pathEndpoints.map(
            (path: string, index: number): JSX.Element => {
              const pathDefinition: Path = this.props.paths[path];
              return (
                <React.Fragment key={path}>
                  {HTTP_VERBS.map((verb: string) => {
                    if (!pathDefinition[verb]) {
                      return null;
                    }

                    return (
                      <div className="open-api-endpoint" key={`${path}-${verb}`}>
                        <h3>
                          <span className={classNames('http-badge', verb)}>
                            {verb.toUpperCase()}
                          </span>
                          &nbsp;{path}
                        </h3>
                        <Markdown>{pathDefinition[verb].description}</Markdown>
                        <CollapsiblePanel panelName="Request" borderless={true}>
                          <APIRequest apiId={this.props.apiId} path={path} httpMethod={verb} />
                        </CollapsiblePanel>
                        <CollapsiblePanel panelName="Response" borderless={true}>
                          <APIResponse apiId={this.props.apiId} path={path} httpMethod={verb} />
                        </CollapsiblePanel>
                        {index !== pathEndpoints.length - 1 && <hr />}
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            },
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Endpoints);
