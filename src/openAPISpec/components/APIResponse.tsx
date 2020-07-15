import * as React from 'react';
import { connect } from 'react-redux';
import { makeGetOperation } from '../state';
import { APIEndpointComponentProps, AppRootState, Operation, Responses } from '../types';

interface APIResponseProps extends APIEndpointComponentProps {
  responses: Responses;
}

const makeMapStateToProps = () => {
  const getOperation = makeGetOperation();
  return (state: AppRootState, ownProps: APIResponseProps): Pick<APIResponseProps, 'responses'> => {
    const operation: Operation | null = getOperation(state, ownProps);
    if (operation == null) {
      throw new Error(
        `Tried to get an operation that does not exist: ${ownProps.httpMethod.toUpperCase()} ${
          ownProps.path
        }`,
      );
    }

    return {
      responses: operation.responses,
    };
  };
};

const APIResponse: React.FunctionComponent<APIResponseProps> = (props: APIResponseProps) => {
  const responseStatuses = Object.keys(props.responses);
  return (
    <div>
      {responseStatuses.map((status: string) => {
        return <h4 key={status}>{status}</h4>;
      })}
    </div>
  );
};

export default connect<Pick<APIResponseProps, 'responses'>>(makeMapStateToProps)(APIResponse);
