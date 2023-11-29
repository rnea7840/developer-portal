import React from 'react';
import { Formik } from 'formik';
import { fireEvent, render } from '@testing-library/react';
import { LogoUploadField } from './LogoUploadField';

describe('LogoUploadField', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  it('renders without crashing', () => {
    const { getByLabelText } = render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <LogoUploadField />
      </Formik>,
    );
    expect(getByLabelText(/upload logo/i)).toBeInTheDocument();
  });

  it('handles file selection and shows preview', async () => {
    const { getByLabelText, findByAltText } = render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <LogoUploadField />
      </Formik>,
    );
    const fileInput = getByLabelText(/upload logo/i);
    const file = new File(['(⌐□_□)'], 'logo.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    const image = await findByAltText('Logo preview');
    expect(image).toHaveAttribute('src', expect.stringContaining('data:image/png;base64'));
  });

  it('uploads the file when selected', async () => {
    fetchMock
      .mockResolvedValueOnce({
        json: () => Promise.resolve({}),
        ok: true,
      })
      .mockResolvedValueOnce({
        ok: true,
      });

    const { getByLabelText, findByText } = render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <LogoUploadField />
      </Formik>,
    );
    const fileInput = getByLabelText(/upload logo/i);
    const file = new File(['logo content'], 'logo.jpg', { type: 'image/jpeg' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    const statusMessage = await findByText(/upload successful/i);
    expect(statusMessage).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(2); // One for policy request, one for S3 upload
  });
});
