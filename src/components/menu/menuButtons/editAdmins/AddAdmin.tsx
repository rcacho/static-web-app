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
import SelectAutocomplete from '../../SelectAutocomplete'
import { APIManager } from '@/utils/APIManager'
import AdminAlert from './AdminAlert'
import { useAPIContext } from '@/store/APIContext'
import RightMenuPanel from '../RightMenuPanel'

const AddAdmin = (props: any) => {
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [selected, setSelected] = useState(null)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const apiContext = useAPIContext()
  //function to handle Back button
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

  const setAutocompleteSelectValue = async (user: any) => {
    try {
      setSelected(user)
      setError(false)
      setErrorMessage('')
      setSuccess(false)
      setLoading(true)
      const instance = await APIManager.getInstance()
      const adminStatus = await instance.checkAdminMembership(user.id)
      if (adminStatus) {
        setError(true)
        setErrorMessage('User is already an admin')
      }
    } catch (err: any) {
      setError(true)
      setErrorMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  const onClick = async () => {
    try {
      setError(false)
      setErrorMessage('')
      setLoading(true)
      setSuccess(false)
      const instance = await APIManager.getInstance()
      if (!selected) {
        setError(true)
        setErrorMessage('Please select a user')
        return
      }
      await instance.addAdmin(selected['id'])
      setSuccess(true)
      setSuccessMessage(`Successfully added admin`)
      setSelected(null)
    } catch (err: any) {
      setError(true)
      setErrorMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      setLoadingUsers(true)
      const instance = await APIManager.getInstance()
      const res = await instance.getUsers()
      setUsers(
        res.users.filter((user: any) => {
          return user.id !== apiContext.accountId
        })
      )
      setLoadingUsers(false)
    }
    fetchUsers()
  }, [])
  return (
    <>
      <RightMenuPanel
        title={'Add Admin'}
        handleBackClick={handleBackClick}
      >

      </RightMenuPanel>
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
            setValue={setAutocompleteSelectValue}
            label="Users"
          />
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            size="medium"
            className="menu-button"
            variant="contained"
            color="primary"
            disabled={loading || error || selected === null}
            onClick={onClick}
          >
            {loading ? <CircularProgress size={20} /> : 'Add'}
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

export default AddAdmin
