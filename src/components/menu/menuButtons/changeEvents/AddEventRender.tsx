import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  TextField,
  Button,
} from '@mui/material'

import React, { useEffect, useState } from 'react'
import { APIManager } from '@/utils/APIManager'
import { Event } from '@/interfaces/Event'
import { useAPIContext } from '@/store/APIContext'
import { useCalendarContext } from '@/store/CalendarContext'
import { ErrorPopup, SuccessPopup } from '../Popup'
import RightMenuPanel, { RightMenuPanelBottom } from '../RightMenuPanel'
import PanelButton from '../PanelButton'

// placeholder for the list of categories
let EventList: string[] = []
let catIDs: any[] = []
const nullDate = new Date(0)
// @ts-ignore
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

  const handleAddEvent = () => {
    if (selected !== null) {
      APIManager.getInstance().then((instance) => {
        instance.getEvent().then((data) => {
          for (let i = 0; i < data.result.length; i++) {
            let eDate = new Date(data.result[i].event_date)
            if (eDate.toUTCString() === eventDate.toUTCString()) {
              if (data.result[i].category_id === catIDs[selected]) {
                setOpenFailed(true)
                return
              }
            }
          }

          addEvent(
            eventDate,
            description,
            accountId.toString(),
            catIDs[selected]
          )
            .then(() => {
              updateEvents()
              setOpen(true)
            })
            .then(() => {
              setUpdateCats((prev) => !prev)
            })
        })
      })
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

    APIManager.getInstance()
      .then((instance) => instance.addEvent(payload))
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })

    setEventDate(event_date)
  }

  // render list for the scroll function
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
      <EventAddedPopup/>
      <EventAddedPopupFailed/>
      <RightMenuPanel 
        title={'Add Event'} 
        handleBackClick={goBack}
      >
        <ListItem>
          <ListItemText primary="Please select category:" />
        </ListItem>
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
        <ListItem>
          <ListItemText primary="Please enter a date:" />
        </ListItem>
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
        <ListItem>
          <ListItemText primary="Event description:" />
        </ListItem>
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
        <PanelButton disabled={selected === null || +eventDate === +nullDate} onClick={handleAddEvent}>
          Add Event
        </PanelButton>
      </RightMenuPanelBottom>
    </>
  )
}

export default AddEventRender
