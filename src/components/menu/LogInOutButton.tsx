import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import { InteractionStatus } from '@azure/msal-browser'
import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import { loginRequest } from '@/authConfig'
import MenuButton from './MenuButton'

const LoginButton = () => {
  const { instance } = useMsal()

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.error(`loginRedirect failed: ${e}`)
    })
  }

  return (
    <MenuButton handleClick={handleLogin} icon={LoginIcon} text={'Login'} />
  )
}

const LogoutButton = () => {
  const { instance } = useMsal()
  const handleLogout = () => {
    instance.logoutRedirect().catch((e) => {
      console.error(`loginRedirect failed: ${e}`)
    })
  }
  return (
    <MenuButton handleClick={handleLogout} icon={LogoutIcon} text={'Logout'} />
  )
}

const LogInOutButton = () => {
  const { inProgress } = useMsal()
  const isAuthenticated = useIsAuthenticated()

  console.log('is logged in: ', isAuthenticated)
  if (isAuthenticated) {
    return <LogoutButton />
  } else if (
    inProgress !== InteractionStatus.Startup &&
    inProgress !== InteractionStatus.HandleRedirect
  ) {
    return <LoginButton />
  } else {
    return <></>
  }
}

export default LogInOutButton
