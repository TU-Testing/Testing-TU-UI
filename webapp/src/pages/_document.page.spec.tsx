/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-no-useless-fragment */
import {
  AppType,
  DocumentContext,
  Enhancer,
  RenderPageResult,
} from 'next/dist/shared/lib/utils';
import Document, { DocumentInitialProps, DocumentProps } from 'next/document';
import { HtmlContext } from 'next/dist/shared/lib/html-context';
import { render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';

import documentProps, { pageHtml } from '../__mocks__/documentProps';

import WebappDocument from './_document.page';

jest.mock('next/document', () => {
  const nextDocument: Record<string, unknown> =
    jest.requireActual('next/document');
  nextDocument.Html = jest.fn(({ children }): JSX.Element => <>{children}</>);

  return nextDocument;
});

type EnhancedFn = (props: Record<string, unknown>) => RenderPageResult;

const pageStyle = '.test { color: blue; }';
const WrapperStyled = styled.div`
  color: red;
`;

describe('WebappDocument custom _document test', () => {
  it('should render correctly custom document', () => {
    const { container } = render(
      <HtmlContext.Provider value={documentProps}>
        <WebappDocument {...documentProps} />
      </HtmlContext.Provider>,
      {
        container: document.documentElement,
      }
    );
    expect(
      container.querySelector('next-js-internal-body-render-target')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[name="next-head-count"]')
    ).toBeInTheDocument();
  });

  it('should return custom styles data', async () => {
    const DocumentSpy = jest
      .spyOn(Document, 'getInitialProps')
      .mockImplementation((ctx): Promise<DocumentInitialProps> => {
        const page = ctx.renderPage();
        const initialProps: DocumentInitialProps = {
          ...page,
          ...documentProps,
          html: pageHtml,
          styles: [
            <style data-testid="page-style" key="foo">
              {pageStyle}
            </style>,
          ],
        };
        return Promise.resolve(initialProps);
      });
    const renderPageMock = jest.fn(
      (options?: { enhanceApp?: Enhancer<AppType> }): RenderPageResult => {
        /**
         * App
         */
        const App = (): JSX.Element => <WrapperStyled>Webapp</WrapperStyled>;
        if (options?.enhanceApp) {
          const enhancedApp = options.enhanceApp(App) as unknown as EnhancedFn;
          return enhancedApp({ test: true });
        }
        return {
          html: pageHtml,
        };
      }
    );

    const context = {} as DocumentContext;
    context.renderPage = renderPageMock as any;
    const enhanceProps = (await WebappDocument.getInitialProps(
      context
    )) as DocumentProps;

    const { styles: styleToRender } = enhanceProps;
    const stylesHead = renderToString(styleToRender as any);

    expect(DocumentSpy).toHaveBeenCalledWith(context);
    expect(enhanceProps).toHaveProperty('styles');
    expect(stylesHead).toContain(
      '<style data-testid="page-style">.test { color: blue; }</style>'
    );
    expect(stylesHead).toContain('data-styled-version');
  });
});
