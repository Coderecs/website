import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang='en'>
                <Head>
                    <meta
                        name='description'
                        content='Coderecs is a CP recommender system.'
                    />
                    <link rel='manifest' href='/manifest.json' />
                </Head>
                <body>
                    <script
                        async
                        defer
                        src='https://scripts.simpleanalyticscdn.com/latest.js'
                    ></script>
                    <noscript>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
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