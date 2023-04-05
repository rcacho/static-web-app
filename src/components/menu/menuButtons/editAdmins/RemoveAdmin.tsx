import React, { useState, useEffect } from 'react'
import { ListItem, CircularProgress } from '@mui/material'
import AdminAlert from './AdminAlert'
import SelectAutocomplete from '../../SelectAutocomplete'
import { APIManager } from '@/utils/APIManager'
import { useAPIContext } from '@/store/APIContext'
import RightMenuPanel from '../RightMenuPanel'
import PanelButton from '../PanelButton'

const RemoveAdmin = (props: any) => {
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [selected, setSelected] = useState(null)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const apiContext = useAPIContext()

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
        setUsers(
          res.admins.filter((user: any) => {
            return user.id !== apiContext.accountId
          })
        )
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
    <RightMenuPanel title={'Remove Admin'} handleBackClick={handleBackClick}>
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
      <PanelButton
        disabled={loading || error || selected === null}
        onClick={onClick}
      >
        {loading ? <CircularProgress size={20} /> : 'Remove'}
      </PanelButton>
      <PanelButton onClick={handleBackClick}>Cancel</PanelButton>
    </RightMenuPanel>
  )
}

export default RemoveAdmin
