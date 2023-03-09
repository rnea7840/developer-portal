import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { StaticBackend } from 'flag';
import { AppFlags, FlagBackendProvider, getFlags } from '../../../flags';
import store from '../../../store';
import { ClientCredentialsGrantDocs } from './ClientCredentialsGrantDocs';

describe('Authorization Docs', () => {
  const backend = new StaticBackend<AppFlags>(getFlags());

  beforeEach(() => {
    render(
      <Provider store={store}>
        <FlagBackendProvider backend={backend}>
          <MemoryRouter>
            <ClientCredentialsGrantDocs />
          </MemoryRouter>
        </FlagBackendProvider>
      </Provider>,
    );
  });

  it('renders successfully', () => {
    const authHeading = screen.getByRole('heading', { name: 'Client Credentials Grant' });
    expect(authHeading).toBeInTheDocument();
  });

  it('Requesting a Token header', () => {
    const heading = screen.getAllByText('Requesting a Token with CCG');
    expect(heading).toHaveLength(1);
    expect(heading[0]).toBeInTheDocument();
  });
});
