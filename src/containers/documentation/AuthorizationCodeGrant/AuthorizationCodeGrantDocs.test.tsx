import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { StaticBackend } from 'flag';
import { AppFlags, FlagBackendProvider, getFlags } from '../../../flags';
import store from '../../../store';
import { AuthorizationCodeGrantDocs } from './AuthorizationCodeGrantDocs';

describe('Authorization Docs', () => {
  const backend = new StaticBackend<AppFlags>(getFlags());

  beforeEach(() => {
    render(
      <Provider store={store}>
        <FlagBackendProvider backend={backend}>
          <MemoryRouter>
            <AuthorizationCodeGrantDocs />
          </MemoryRouter>
        </FlagBackendProvider>
      </Provider>,
    );
  });

  it('renders successfully', () => {
    const authHeading = screen.getByRole('heading', { name: 'Authorization Code Flow' });
    expect(authHeading).toBeInTheDocument();
  });

  it('Building OpenId header', () => {
    const heading = screen.getAllByText('Building OpenID Connect Applications');
    expect(heading).toHaveLength(2);
    expect(heading[0]).toBeInTheDocument();
    expect(heading[1]).toBeInTheDocument();
  });
});
