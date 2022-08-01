/* eslint-disable no-param-reassign */
import { AppInitialProps, AppProps } from 'next/app';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

interface IStyledSsr {
  initialPropsEnhanced: DocumentInitialProps;
  styledComponentsCss: React.ReactNode;
}

/**
 * Collect styled-components SSR css styles
 *
 * @param DocumentComponent - next.js page document component for
 * get initial props with enhanced app/context.
 * with 'renderPage' callback to get App/Page and collect styles.
 * @param ctx - context from next.js document
 */
async function getCssStyledComponents(
  DocumentComponent: typeof Document,
  ctx: DocumentContext
): Promise<IStyledSsr> {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;
  let styledComponentsCss: React.ReactNode;
  let initialPropsEnhanced: DocumentInitialProps;

  try {
    /**
     * extend renderPage to add enhanceApp and collect page styles
     *
     */
    ctx.renderPage = (): ReturnType<typeof ctx.renderPage> =>
      originalRenderPage({
        /**
         * Enhance app
         *
         * @param App - next.js App
         */
        enhanceApp: App => {
          /**
           * Enhance app component collecting styled-components styles
           *
           * @param props - Next.js page initial page props
           */
          function AppEnhanced(props: AppInitialProps): JSX.Element {
            return sheet.collectStyles(<App {...(props as AppProps)} />);
          }
          return AppEnhanced;
        },
      });

    // get Document/Page props with enhanced content
    initialPropsEnhanced = await DocumentComponent.getInitialProps(ctx);
    styledComponentsCss = sheet.getStyleElement();
  } finally {
    sheet.seal();
  }

  return {
    initialPropsEnhanced,
    styledComponentsCss,
  };
}

/**
 * Webapp Class
 */
class WebApp extends Document {
  /**
   * Collect styles in SSR
   *
   * @public
   * @param ctx - context object from next.js with one addition:
   * renderPage: {Function} - a callback that executes the actual
   * React rendering logic (synchronously).
   */
  public static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const { initialPropsEnhanced, styledComponentsCss } =
      await getCssStyledComponents(Document, ctx);

    return {
      ...initialPropsEnhanced,
      styles: [
        <>
          {initialPropsEnhanced.styles}
          {styledComponentsCss}
        </>,
      ],
    };
  }

  /**
   * Document custom markup
   */
  public render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default WebApp;
