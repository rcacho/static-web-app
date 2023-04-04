import React from 'react'
import { Alert } from '@mui/material'

type AdminAlertProps = {
  alertMessage: string
  isError: boolean
}

const AdminAlert = (props: AdminAlertProps) => {
  return (
    <Alert
      severity={props.isError ? 'error' : 'success'}
      variant="filled"
      style={{ width: '100%' }}
    >
      {props.alertMessage}
    </Alert>
  )
}

export default AdminAlert
