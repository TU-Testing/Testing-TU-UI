const pageHtml = '<div class="PageWrapper"><main data-testid="main"/><div/>';
const pages: readonly string[] = ['static/chunks/pages/_app.js'];

const documentProps = {
  __NEXT_DATA__: {
    buildId: 'development',
    page: '/',
    props: {},
    query: {},
  },
  ampPath: '',
  buildManifest: {
    ampDevFiles: [],
    ampFirstPages: [],
    ampPath: '',
    devFiles: [],
    lowPriorityFiles: [],
    pages: {
      '/': pages,
      '/_app': pages,
    },
    polyfillFiles: [],
    rootMainFiles: [],
  },
  canonicalBase: '',
  dangerousAsPath: '/',
  devOnlyCacheBusterQueryString: '?ts=1628555865298',
  docComponentsRendered: {},
  dynamicImports: [],
  headTags: [],
  html: pageHtml,
  hybridAmp: false,
  inAmpMode: false,
  isDevelopment: true,
  scriptLoader: {
    afterInteractive: [],
    beforeInteractive: [],
  },
  /**
   * Use Myabe defe
   *
   * @param _name - defer name
   * @param contentFn - content function
   */
  useMaybeDeferContent: (
    _name: string,
    contentFn: () => JSX.Element
  ): [boolean, JSX.Element] => [false, contentFn()],
};

export default documentProps;
export { pageHtml };
