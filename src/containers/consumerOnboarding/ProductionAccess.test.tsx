import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticBackend } from 'flag';
import { AppFlags, FlagBackendProvider, getFlags } from '../../flags';
import store from '../../store';
import ProductionAccess from './ProductionAccess';

describe('ProductionAccess', () => {
  const backend = new StaticBackend<AppFlags>(getFlags());

  beforeEach(() => {
    render(
      <Provider store={store}>
        <FlagBackendProvider backend={backend}>
          <ProductionAccess />
        </FlagBackendProvider>
      </Provider>,
    );
  });

  it('renders the main heading', () => {
    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Production access form',
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the h2 subheading', () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Step 1: Verification',
    });
    expect(heading).toBeInTheDocument();
  });
});
