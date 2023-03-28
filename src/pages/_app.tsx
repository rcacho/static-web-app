import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Auth } from '@/components/Auth'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Auth>
      <Component {...pageProps} />
    </Auth>
  )
}
