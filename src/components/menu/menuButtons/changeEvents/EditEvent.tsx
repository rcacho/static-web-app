import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  TextField,
  Button,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
// @ts-ignore
import { APIManager } from '@/utils/APIManager'
import { Event } from '@/interfaces/Event'
import { useAPIContext } from '@/store/APIContext'
import { useCalendarContext } from '@/store/CalendarContext'
import Popup from './Popup'
import RightMenuPanel, { Header, RightMenuPanelBottom } from '../RightMenuPanel'

// placeholder for the list of categories
let EventList: string[] = []
let catIDs: any[] = []
const nullDate = new Date(0)

// @ts-ignore
const EditEvent = (props: any) => {
  const {
    categories,
    selectedEvent,
    eventIndex,
    accountId,
    eventId,
    updateEvents,
    setUpdateCats
  } = useAPIContext()
  const { selectedDate } = useCalendarContext()
  const [clicked, setClicked] = useState(false)
  const [selected, setSelected] = useState(eventIndex)
  const [first, setFirst] = useState(true)
  const [events, setEvents] = useState([''])
  const [open, setOpen] = React.useState(false)
  const [openFailed, setOpenFailed] = React.useState(false)

  const [eventDate, setEventDate] = useState(nullDate)
  const [description, setEventDescription] = useState('')
  const adminID = accountId

  useEffect(() => {
    EventList = []
    catIDs = []
    for (let i = 0; i < categories.length; i++) {
      EventList.push(categories[i].category_name)
      catIDs.push(categories[i].category_id)
    }
    setEvents(EventList)
    if (first) {
      setSelected(catIDs.indexOf(selectedEvent))
      setEventDate(new Date(reformatDate(selectedDate as string)))
      setFirst(false)
    }
    if (props.fromMenu === 1) setEventDate(nullDate)
  }, [selected])

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

  const handleBackClick = () => {
    props.updateState(0)
  }

  const handleOnClick = () => {
    setClicked(true)
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

          editEvent(
            eventId,
            eventDate,
            description,
            adminID,
            catIDs[selected]
          ).then((_) => {
            setOpen(true)
          })
        })
      })
    }
  }

  const handleClose = () => {
    setOpen(false)
    props.clickAway()
  }

  const EventEditPopup = () => {
    return (
      <Popup
        open={open}
        onClose={handleClose}
        title={'Event Edited'}
        body={'Event successfully edited!'}
      />
    )
  }

  const EventEditFailedPopup = () => {
    return (
      <Popup
        open={openFailed}
        onClose={handleClose}
        title={'ERROR: Edit Event'}
        body={'Event already exists!'}
      />
    )
  }

  async function editEvent(
    event_id: number,
    event_date: Date,
    event_description: string,
    admin_id: string,
    category_id: number
  ) {
    let payload: Event = {
      event_id: event_id,
      event_date: event_date,
      category_id: category_id,
      event_description: event_description,
      admin_id: admin_id
    }
    APIManager.getInstance()
      .then((instance) => instance.editEvent(event_id, payload))
      .then((data) => {
        console.log(data)
      })
      .then(() => {
        setUpdateCats((prev) => !prev)
      })
      .catch((err) => {
        console.log(err)
      })

    setEventDate(event_date)
    updateEvents()
  }

  function reformatDate(date: string) {
    let res: string = ''
    res += date.substring(6, 10)
    res += '-'
    res += date.substring(0, 2)
    res += '-'
    res += date.substring(3, 5)
    return res
  }

  return (
    <>
      <EventEditPopup />
      <EventEditFailedPopup />
      <RightMenuPanel
        title={"Edit Event"}
        handleBackClick={handleBackClick}
      >
        <Header text="Please select category:"/>
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
        <Header text="Please enter date:"/>
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
            defaultValue={reformatDate(selectedDate as string)}
            onChange={(newVal) => {
              setEventDate(new Date(newVal.target.value))
            }}
          />
        </ListItem>
        <Header text="Event description:"/>
        <ListItem sx={{ pl: 5, pt: 0 }}>
          <TextField
            multiline={true}
            maxRows={4}
            id="standard-basic"
            label="(Max 200 chars.)"
            sx={{ color: '#898989' }}
            variant="standard"
            inputProps={{ maxLength: 200 }}
            onChange={(newVal) => setEventDescription(newVal.target.value)}
          />
        </ListItem>
      </RightMenuPanel>
      <RightMenuPanelBottom handleCancelClick={handleBackClick}>
      <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            disabled={clicked}
            className="menu-button"
            size="medium"
            variant="contained"
            color="primary"
            onClick={handleOnClick}
          >
            Save Changes
          </Button>
        </ListItem>
      </RightMenuPanelBottom>
    </>
  )
}

export default EditEvent
