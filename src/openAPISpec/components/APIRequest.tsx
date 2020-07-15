import classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { makeGetEndpointParameters } from '../state';
import { APIEndpointComponentProps, AppRootState, Parameter } from '../types';
import ParameterInfo from './Parameter';

interface ParamsSectionProps {
  params: Parameter[];
  title: string;
}

const ParamsSection: React.FunctionComponent<ParamsSectionProps> = (props: ParamsSectionProps) => {
  return props.params.length > 0 ? (
    <React.Fragment>
      <h4 className="open-api">{props.title}</h4>
      {props.params.map((param: Parameter) => (
        <ParameterInfo key={param.name} param={param} />
      ))}
    </React.Fragment>
  ) : null;
};

interface APIRequestProps extends APIEndpointComponentProps {
  pathParams: Parameter[];
  queryParams: Parameter[];
  headerParams: Parameter[];
  cookieParams: Parameter[];
}

const makeMapStateToProps = () => {
  const getEndpointParameters = makeGetEndpointParameters();
  return (
    state: AppRootState,
    ownProps: Pick<APIRequestProps, 'apiId' | 'path' | 'httpMethod'>,
  ): Pick<APIRequestProps, 'headerParams' | 'queryParams' | 'pathParams' | 'cookieParams'> => {
    const params: Parameter[] = getEndpointParameters(state, ownProps);
    return {
      cookieParams: params.filter(param => param.in === 'cookie'),
      headerParams: params.filter(param => param.in === 'header'),
      pathParams: params.filter(param => param.in === 'path'),
      queryParams: params.filter(param => param.in === 'query'),
    };
  };
};

const APIRequest: React.FunctionComponent<APIRequestProps> = (props: APIRequestProps) => {
  return (
    <div className={classNames('open-api', 'api-request')}>
      <ParamsSection params={props.pathParams} title="Path Parameters" />
      <ParamsSection params={props.headerParams} title="Header Parameters" />
      <ParamsSection params={props.queryParams} title="Query Parameters" />
      <ParamsSection params={props.cookieParams} title="Cookie Parameters" />
    </div>
  );
};

export default connect(makeMapStateToProps)(APIRequest);
