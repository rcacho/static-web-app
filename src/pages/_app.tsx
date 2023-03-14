import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig } from '@/authConfig'

export const msalInstance = new PublicClientApplication(msalConfig)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MsalProvider instance={msalInstance}>
      <Component {...pageProps} />
    </MsalProvider>
  )
}
