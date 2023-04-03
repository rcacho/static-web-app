import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material/'
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress
} from '@mui/material'
import AdminAlert from './AdminAlert'
import SelectAutocomplete from '../../SelectAutocomplete'
import { APIManager } from '@/utils/APIManager'

const RemoveAdmin = (props: any) => {
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [selected, setSelected] = useState(null)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleBackClick = () => {
    props.updateState(3)
    setLoadingUsers(false)
    setSelected(null)
    setUsers([])
    setError(false)
    setLoadingUsers(false)
    setErrorMessage('')
    setSuccess(false)
    setSuccessMessage('')
  }

  useEffect(() => {
    const getAdmins = async () => {
      try {
        setLoadingUsers(true)
        setError(false)
        const instance = await APIManager.getInstance()
        const res = await instance.getAdmins()
        setUsers(res.admins)
      } catch (err: any) {
        setError(true)
        setErrorMessage(err.message)
      } finally {
        setLoadingUsers(false)
      }
    }
    getAdmins()
  }, [])

  const onClick = async () => {
    try {
      setLoading(true)
      setError(false)
      setSuccess(false)
      const instance = await APIManager.getInstance()
      if (!selected) {
        setError(true)
        setErrorMessage('Please select a user')
        return
      }
      let id = selected['id']
      await instance.removeAdmin(id)
      let usersCopy = [...users]
      setSelected(null)
      setUsers(usersCopy.filter((user) => user['id'] !== id))
      setSuccess(true)
      setSuccessMessage('Successfully removed admin')
    } catch (err: any) {
      setError(true)
      setErrorMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <List>
        <ListItem>
          <ListItemText
            sx={{ color: '#898989', textDecoration: 'underline' }}
            secondary="Add Admin"
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              color: '#898989',
              textDecoration: 'underline',
              fontFamily: 'Roboto'
            }}
          >
            <Typography
              onClick={handleBackClick}
              sx={{
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
              variant="body2"
              color="#898989"
            >
              Back
            </Typography>
          </Box>
        </ListItem>
        <ListItem>
          {error && (
            <AdminAlert isError={true} alertMessage={errorMessage}></AdminAlert>
          )}
          {success && (
            <AdminAlert
              isError={false}
              alertMessage={successMessage}
            ></AdminAlert>
          )}
        </ListItem>
        <ListItem>
          <SelectAutocomplete
            loading={loadingUsers}
            options={users}
            value={selected}
            setValue={setSelected}
            label="Users"
          />
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            size="medium"
            className="menu-button"
            disabled={loading || error}
            onClick={onClick}
          >
            {loading ? <CircularProgress size={20} /> : 'Remove'}
          </Button>
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="menu-button"
            size="medium"
            variant="contained"
            color="primary"
            onClick={handleBackClick}
          >
            Cancel
          </Button>
        </ListItem>
      </List>
    </>
  )
}

export default RemoveAdmin
