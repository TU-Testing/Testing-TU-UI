import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { AppProps } from 'next/app';

import App from './_app.page';

/**
 * TestPage component
 *
 */
const TestPage = (): JSX.Element => {
  return (
    <div data-testid="page">
      <div role="region" />
    </div>
  );
};

const pageProps = {} as AppProps;

describe('App page', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it('should render correctly', async () => {
    render(<App {...pageProps} Component={TestPage} />);

    await waitFor(() => {
      expect(screen.getByTestId('page')).toBeInTheDocument();
      expect(screen.getByRole('region')).toBeInTheDocument();
    });
  });

  it('should render global styles', async () => {
    render(<App {...pageProps} Component={TestPage} />);

    await waitFor(() => {
      expect(document.querySelector('body')).toHaveStyle({
        display: 'block',
      });
    });
  });
});
