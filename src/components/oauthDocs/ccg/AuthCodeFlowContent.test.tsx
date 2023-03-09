import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { StaticBackend } from 'flag';
import { AppFlags, FlagBackendProvider, getFlags } from '../../../flags';

import { getActiveCCGApis, lookupApiByFragment } from '../../../apiDefs/query';
import store from '../../../store';
import { setApis } from '../../../actions';
import { fakeCategories } from '../../../__mocks__/fakeCategories';
import { AuthCodeFlowContent } from './AuthCodeFlowContent';

describe('Auth Flow Content', () => {
  store.dispatch(setApis(fakeCategories));
  const backend = new StaticBackend<AppFlags>(getFlags());

  beforeEach(() => {
    const selectedOption = 'apollo_13';
    const apiDef = lookupApiByFragment(selectedOption);
    const defs = getActiveCCGApis();

    render(
      <Provider store={store}>
        <FlagBackendProvider backend={backend}>
          <MemoryRouter>
            <AuthCodeFlowContent apiDef={apiDef} options={defs} selectedOption={selectedOption} />
          </MemoryRouter>
        </FlagBackendProvider>
      </Provider>,
    );
  });
  it('Initiating token request header', () => {
    const heading = screen.getByText('Requesting a Token with CCG');
    expect(heading).toBeInTheDocument();
  });
  it('Oauth base path found', () => {
    const codeWrapperArray = screen.getAllByText(/\/oauth2\/sample\-sandboxAud\/v1\//i);
    expect(codeWrapperArray.length).toBeGreaterThan(0);
  });
  it('Correct number of code wrappers', () => {
    const codeWrapperArray = document.getElementsByClassName('code-wrapper');
    expect(codeWrapperArray.length).toBeGreaterThanOrEqual(4);
  });
});
