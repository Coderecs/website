import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <head>
        {/* <script>
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker
                .getRegistrations()
                .then((res) => {
                  if (res.length > 0) {
                    res?.[0]?.unregister?.()
                  }
                  window.addEventListener('load', () => {
                    return navigator.serviceWorker
                    .register('./serviceWorker.js')
                      .then((reg) => null)
                      .catch((error) => null)
                  })
                })
                .catch(() => null)
              }
          </script> */}
        </head>
        <Head>
          <meta
            name='description'
            content='Teams is a web app implementation of Microsoft Teams'
          />
        </Head>
        <body>
          <script
            async
            defer
            src='https://scripts.simpleanalyticscdn.com/latest.js'
          ></script>
          <noscript>
            <img
              src='https://queue.simpleanalyticscdn.com/noscript.gif'
              alt=''
              referrerPolicy='no-referrer-when-downgrade'
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;