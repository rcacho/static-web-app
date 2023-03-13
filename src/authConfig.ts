import { LogLevel } from '@azure/msal-browser'

// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
// const ua = window.navigator.userAgent
// const msie = ua.indexOf('MSIE ')
// const msie11 = ua.indexOf('Trident/')
// const msedge = ua.indexOf('Edge/')
// const firefox = ua.indexOf('Firefox')
// const isIE = msie > 0 || msie11 > 0
// const isEdge = msedge > 0
// const isFirefox = firefox > 0 // Only needed if you need to support the redirect flow in Firefox incognito

export const b2cPolicies = {
  names: {
    signUpSignIn: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
    editProfile: process.env.AZURE_AD_B2C_PROFILE_EDIT
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW}`
    },
    editProfile: {
      authority: `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.AZURE_AD_B2C_PROFILE_EDIT}`
    }
  },
  authorityDomain: `${process.env.AZURE_AD_B2C_TENANT_NAME}.b2clogin.com`
}

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: process.env.AZURE_AD_B2C_CLIENT_ID || '',
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: '/',
    postLogoutRedirectUri: '/'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean
      ) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
          default:
            return
        }
      }
    }
  }
}

// Scopes you add here will be prompted for consent during login
export const loginRequest = {
  scopes: ['https://t3am319.onmicrosoft.com/t3am319api/read']
}
