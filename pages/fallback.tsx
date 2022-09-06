import Head from "next/head"
import Layout from "../components/Layout/Layout"

function fallback() {
  return (
    <Layout>
        <Head>
                    <title>Error Page - Coderecs</title>
                </Head>
                <div className="h-full w-full grid place-items-center">
                    <p>Page not loading.</p>
                </div>
    </Layout>
  )
}

export default fallback