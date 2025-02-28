import { Analytics } from '@vercel/analytics/react'
import { useState } from 'react'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import {
    Hydrate,
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'
import AppProvider from 'components/app'

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <>
            <Head>
                <title>Cakemasa</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="description" content="" />
            </Head>

            <SessionProvider session={session}>
                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <AppProvider
                            active={true}
                            authentication={Component.authentication}
                        >
                            <Component {...pageProps} />
                        </AppProvider>
                    </Hydrate>
                </QueryClientProvider>
            </SessionProvider>

            <Analytics />
        </>
    )
}

export default App
