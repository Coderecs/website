import Head from 'next/head'
import React, { ReactNode } from 'react'

type layout = {
    title?: string,
    children: ReactNode
}
function Layout({title, children}: layout) {
  return (
    <div>
        <Head>
            <title>{title}</title>
        </Head>
        {children}
    </div>
  )
}

export default Layout