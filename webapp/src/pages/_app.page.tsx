import type { AppProps } from 'next/app';

import GlobalStyles from '@televisaunivision/components-base-web/components/globalStyle/GlobalStyles.styles';

/**
 * Webapp Component
 *
 * @param props - Web App props
 * @param props.Component is the active page, so whenever you navigate between routes,
 * Component will change to the new page. Therefore, any props you send to Component will
 * be received by the page.
 * @param props.pageProps the initial props that were preloaded for your page,
 * it's an empty object if the page is not using getInitialProps.
 */
const WebApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default WebApp;
