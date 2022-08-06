import Document, { Head, Html, Main, NextScript } from 'next/document';

import { AppConfig } from '@/utils/AppConfig';
import { themeScript } from '@/utils/ThemeScript';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html
        lang={AppConfig.locale}
        className="antialiased [font-feature-settings:'ss01']"
      >
        <Head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body className="bg-white dark:bg-fetcch-dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
