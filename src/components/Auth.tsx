import { msalInstance } from '@/authConfig'
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate
} from '@azure/msal-react'
import { Backdrop, CircularProgress } from '@mui/material'
import { Component, ReactNode } from 'react'
import { loginRequest } from '@/authConfig'
import { useMsalAuthentication } from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'

const LoadingScreen = () => {
  useMsalAuthentication(InteractionType.Redirect, loginRequest)
  return (
    <Backdrop
      style={{ height: '100%', width: '100%' }}
      sx={{ color: '#fff' }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export class Auth extends Component<{ children: ReactNode }> {
  render() {
    return (
      <MsalProvider instance={msalInstance}>
        <AuthenticatedTemplate>{this.props.children}</AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <LoadingScreen />
        </UnauthenticatedTemplate>
      </MsalProvider>
    )
  }
}
