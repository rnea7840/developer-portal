import * as React from 'react';
import { connect } from 'react-redux';
import { 
  AppRootState, 
  loadOpenAPISpec,
  OpenAPIDispatch,
} from './state';

interface OpenAPISpecProps {
  apiId: string;
  endpoint: string;
  loadSpec: () => void;
}

const mapStateToProps = (state: AppRootState): Partial<OpenAPISpecProps> => {
  return {};
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

  public componentDidUpdate() {
    this.props.loadSpec();
  }

  public render() {
    return (
      <div>
        My API
      </div>
    );
  }
}

export default connect<
  ReturnType<typeof mapStateToProps>,
  ReturnType<typeof mapDispatchToProps>,
  Pick<OpenAPISpecProps, 'apiId' | 'endpoint'>
>(mapStateToProps, mapDispatchToProps)(OpenAPISpec);