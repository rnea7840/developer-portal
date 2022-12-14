import { getByRole, render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';

import { GroupedAccordions } from './GroupedAccordions';

const contents = [
  {
    body: 'The answer',
    title: 'The question?',
  },
  {
    body: 'The answer 2',
    title: 'The question 2?',
  },
];

describe('GroupedAccordions', () => {
  it('renders with title', () => {
    render(<GroupedAccordions title="title" panelContents={contents} />);
    const section = screen.getByRole('region', { name: 'title' });
    expect(section).toBeInTheDocument();

    const heading = getByRole(section, 'heading', { name: 'title' });
    expect(heading).toBeInTheDocument();
  });
});
