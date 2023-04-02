import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  TextField
} from '@mui/material'

import React, { useEffect, useState } from 'react'
import { APIManager } from '@/utils/APIManager'
import { Event } from '@/interfaces/Event'
import { useAPIContext } from '@/store/APIContext'
import { useCalendarContext } from '@/store/CalendarContext'
import { ErrorPopup, SuccessPopup } from '../Popup'
import RightMenuPanel, { Header, RightMenuPanelBottom } from '../RightMenuPanel'
import PanelButton from '../PanelButton'

let EventList: string[] = []
let catIDs: any[] = []
const nullDate = new Date(0)

const AddEventRender = (props: any) => {
  const [eventDate, setEventDate] = useState(new Date(0))
  const [selected, setSelected] = useState(null)
  const [description, setEventDescription] = useState('')
  const [events, setEvents] = useState([''])
  const { categories, updateEvents, accountId, updateCats, setUpdateCats } =
    useAPIContext()
  const [open, setOpen] = React.useState(false)
  const [openFailed, setOpenFailed] = React.useState(false)
  const [first, setFirst] = useState(true)
  const { selectedDate } = useCalendarContext()

  useEffect(() => {
    EventList = []
    for (let i = 0; i < categories.length; i++) {
      EventList.push(categories[i].category_name)
      catIDs.push(categories[i].category_id)
    }
    setEvents(EventList)
    if (first) {
      if (props.fromMenu === 0) {
        setEventDate(nullDate)
      } else {
        setEventDate(new Date(reformatDate(selectedDate as string)))
      }
      setFirst(false)
    }
  }, [selected, categories, updateCats])

  function reformatDate(date: string) {
    let res: string = ''
    res += date.substring(6, 10)
    res += '-'
    res += date.substring(0, 2)
    res += '-'
    res += date.substring(3, 5)
    return res
  }

  const handleAddEvent = async () => {
    if (selected !== null) {
      const instance = await APIManager.getInstance()
      const data = await instance.getEvent()
      const events = data.result
      for (const event of events) {
        let eDate = new Date(event.event_date)
        if (eDate.toUTCString() === eventDate.toUTCString()) {
          if (event.category_id === catIDs[selected]) {
            setOpenFailed(true)
            return
          }
        }
      }

      await addEvent(
        eventDate,
        description,
        accountId.toString(),
        catIDs[selected]
      )
      await updateEvents()
      setOpen(true)
      setUpdateCats((prev) => !prev) // @TODO
    }
  }

  async function addEvent(
    event_date: Date,
    event_description: string,
    admin_id: string,
    category_id: number
  ) {
    let payload: Event = {
      event_id: null,
      event_date: event_date,
      category_id: category_id,
      event_description: event_description,
      admin_id: admin_id
    }

    const instance = await APIManager.getInstance()
    await instance.addEvent(payload)
    setEventDate(event_date)
  }

  function renderList() {
    const handleSelect = (index: any) => {
      setSelected(index)
    }
    return events.map((value, index) => {
      return (
        <ListItem
          key={index}
          component="div"
          disablePadding
          onClick={() => handleSelect(index)}
        >
          <ListItemButton sx={{ pl: 5, pt: 0 }} selected={selected === index}>
            <ListItemText primary={`${value}`} />
          </ListItemButton>
        </ListItem>
      )
    })
  }

  const goBack = () => {
    props.updateState(0)
  }

  const handleClose = () => {
    setOpen(false)
    setOpenFailed(false)
    props.clickAway()
  }

  const EventAddedPopupFailed = () => {
    return (
      <ErrorPopup
        open={openFailed}
        onClose={handleClose}
        body={'Event already exists on this date!'}
      />
    )
  }

  const EventAddedPopup = () => {
    return (
      <SuccessPopup
        open={open}
        onClose={handleClose}
        body={'Event Successfully Added'}
      />
    )
  }

  return (
    <>
      <EventAddedPopup />
      <EventAddedPopupFailed />
      <RightMenuPanel title={'Add Event'} handleBackClick={goBack}>
        <Header text="Please select a category:" />
        <List
          disablePadding={true}
          style={{
            overflow: 'auto',
            overflowY: 'scroll',
            height: '200px'
          }}
        >
          {renderList()}
        </List>
        <Header text="Please enter a date:" />
        <ListItem sx={{ pl: 5, pt: 0 }}>
          <TextField
            id="standard-basic"
            variant="standard"
            label="Event Date"
            type="date"
            sx={{ width: 220, color: '#898989' }}
            InputLabelProps={{
              shrink: true
            }}
            defaultValue={
              props.fromMenu === 1 ? reformatDate(selectedDate as string) : ''
            }
            onChange={(newVal) => {
              setEventDate(new Date(newVal.target.value))
            }}
          />
        </ListItem>
        <Header text="Event description:" />
        <ListItem sx={{ pl: 5, pt: 0 }}>
          <TextField
            multiline={true}
            maxRows={4}
            id="standard-basic"
            label="(Max 200 chars.)"
            sx={{ color: '#898989' }}
            variant="standard"
            inputProps={{ maxLength: 200 }}
            onChange={(newVal) => {
              setEventDescription(newVal.target.value)
            }}
          />
        </ListItem>
      </RightMenuPanel>
      <RightMenuPanelBottom handleCancelClick={goBack}>
        <PanelButton
          disabled={selected === null || +eventDate === +nullDate}
          onClick={handleAddEvent}
        >
          Add Event
        </PanelButton>
      </RightMenuPanelBottom>
    </>
  )
}

export default AddEventRender
