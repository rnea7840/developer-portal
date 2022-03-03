import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './CodeWrapper.scss';

interface CodeWrapperProps {
  children: React.ReactElement;
}

const CodeWrapper = (props: CodeWrapperProps): JSX.Element => (
  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
  <div className="code-wrapper" tabIndex={0}>
    <span className="sr-only">
      Ensure your screenreader verbosity is set to high for code snippets.
    </span>
    <CopyToClipboard text={ReactDOMServer.renderToStaticMarkup(props.children)}>
      <span className="va-api-curl__copy-to-clipboard">
        <FontAwesomeIcon icon={faCopy} size="2x" />
      </span>
    </CopyToClipboard>
    {props.children}
  </div>
);

export { CodeWrapper };
