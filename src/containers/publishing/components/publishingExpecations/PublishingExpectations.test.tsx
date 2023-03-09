import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { StaticBackend } from 'flag';
import { AppFlags, FlagBackendProvider, getFlags } from '../../../../flags';
import { PublishingExpectations } from './PublishingExpectations';

describe('PublishingExpectations', () => {
  const backend = new StaticBackend<AppFlags>(getFlags());

  beforeEach(() => {
    render(
      <FlagBackendProvider backend={backend}>
        <MemoryRouter initialEntries={['/api-publishing/expectations']}>
          <PublishingExpectations />
        </MemoryRouter>
      </FlagBackendProvider>,
    );
  });

  it('renders successfully', () => {
    expect(
      screen.getByRole('heading', { name: 'Expectations for Lighthouse APIs' }),
    ).toBeInTheDocument();
  });

  describe.each([
    ['Security'],
    ['Documentation'],
    ['Versioning'],
    ['Monitoring'],
    ['Support'],
    ['Modernization'],
    ['Authentication and Authorization'],
  ])('%s', name => {
    it('renders succesfully', () => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    });
  });
});
