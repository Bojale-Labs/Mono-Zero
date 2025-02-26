import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'
import cn from 'classnames'
import { FC } from 'react'
import type { AppProps } from 'next/app'

import { ManagedUIContext } from '@components/ui/context'
import { Head } from '@components/common'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  return (
    <>
      <Head />
      <div className={cn('is-')}>
        <ManagedUIContext>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout> 
        </ManagedUIContext>
      </div>
    </>
  )
}
