import * as React from 'react';
import * as Markdown from 'react-markdown';
import { Parameter } from '../types';

export default (props: { param: Parameter }): JSX.Element => {
  return (
    <React.Fragment key={props.param.name}>
      <h5 className="open-api">
        <span className="param-name">{props.param.name}</span>
        {props.param.required && <span className="required-param-badge">REQUIRED</span>}
      </h5>
      {props.param.description && (
        <Markdown className="param-description">{props.param.description}</Markdown>
      )}
    </React.Fragment>
  );
};
