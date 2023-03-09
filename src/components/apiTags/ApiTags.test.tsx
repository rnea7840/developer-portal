import { render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { VaInternalOnly } from '../../apiDefs/schema';
import { StaticBackend } from 'flag';
import { AppFlags, FlagBackendProvider, getFlags } from '../../flags';
import { ApiTags } from './ApiTags';

const internalOnlyText = 'Internal VA use only';
const openDataText = 'Open Data';

describe('ApiTags', () => {
  const backend = new StaticBackend<AppFlags>(getFlags());
  it('renders the VA internal only tag and not the open data tag', () => {
    render(
      <FlagBackendProvider backend={backend}>
        <ApiTags openData={false} vaInternalOnly={VaInternalOnly.StrictlyInternal} />
      </FlagBackendProvider>,
    );

    expect(screen.queryByText(internalOnlyText)).toBeInTheDocument();
    expect(screen.queryByText(openDataText)).not.toBeInTheDocument();
  });

  it('renders the open data tag and not the VA internal only tag', () => {
    render(
      <FlagBackendProvider backend={backend}>
        <ApiTags openData vaInternalOnly={undefined} />
      </FlagBackendProvider>,
    );

    expect(screen.queryByText(internalOnlyText)).not.toBeInTheDocument();
    expect(screen.queryByText(openDataText)).toBeInTheDocument();
  });

  it('renders neither tag', () => {
    render(
      <FlagBackendProvider backend={backend}>
        <ApiTags openData={false} vaInternalOnly={undefined} />
      </FlagBackendProvider>,
    );

    expect(screen.queryByText(internalOnlyText)).not.toBeInTheDocument();
    expect(screen.queryByText(openDataText)).not.toBeInTheDocument();
  });

  it('renders both tags', () => {
    render(
      <FlagBackendProvider backend={backend}>
        <ApiTags openData vaInternalOnly={VaInternalOnly.StrictlyInternal} />
      </FlagBackendProvider>,
    );

    expect(screen.queryByText(internalOnlyText)).toBeInTheDocument();
    expect(screen.queryByText(openDataText)).toBeInTheDocument();
  });
});
