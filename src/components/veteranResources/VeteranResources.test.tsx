import * as React from 'react';

import 'jest';
import {
  render,
  screen,
} from '@testing-library/react';
import { VeteranResources } from './VeteranResources';

describe('VeteranResources', () => {
  it('checks that modal button displays with correct information.', () => {
    render(<VeteranResources />);
    const modalButton = screen.queryByRole('button');
    expect(modalButton).toBeInTheDocument();
    expect(modalButton).toHaveTextContent('Veterans, find helpful resources and contact info.');
    expect(modalButton).toHaveAttribute('href', '#Veteran');
  });
});
