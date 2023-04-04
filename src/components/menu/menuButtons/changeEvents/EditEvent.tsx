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
import Popup, { ErrorPopup } from '../Popup'
import RightMenuPanel, { Header, RightMenuPanelBottom } from '../RightMenuPanel'
import PanelButton from '../PanelButton'

let EventList: string[] = []
let catIDs: any[] = []
const nullDate = new Date(0)

const EditEvent = (props: any) => {
  const { categories, selectedEvent, eventIndex, eventId, updateEvents } =
    useAPIContext()
  const { selectedDate } = useCalendarContext()
  const [clicked, setClicked] = useState(false)
  const [selected, setSelected] = useState(eventIndex)
  const [first, setFirst] = useState(true)
  const [events, setEvents] = useState([''])
  const [open, setOpen] = React.useState(false)
  const [openFailed, setOpenFailed] = React.useState(false)
  const [eventDate, setEventDate] = useState(nullDate)
  const [description, setEventDescription] = useState('')
  const [oldDate, setOldDate] = useState(nullDate)
  const [oldCat, setOldCat] = useState(-1)

  useEffect(() => {
    EventList = []
    catIDs = []
    for (const category of categories) {
      EventList.push(category.category_name)
      catIDs.push(category.category_id)
    }
    setEvents(EventList)
    if (first) {
      setSelected(catIDs.indexOf(selectedEvent))
      setEventDate(new Date(reformatDate(selectedDate as string)))
      setOldDate(new Date(reformatDate(selectedDate as string)))
      setOldCat(selectedEvent)
      setFirst(false)
    }
    if (props.fromMenu === 1) setEventDate(nullDate)
  }, [selected])

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

  const handleOnClick = async () => {
    setClicked(true)
    if (selected !== null) {
      const instance = await APIManager.getInstance()
      const data = await instance.getEvent()
      const events = data.result
      for (const event of events) {
        let eDate = new Date(event.event_date)
        if (
          eDate.toUTCString() === eventDate.toUTCString() &&
          event.category_id === catIDs[selected] &&
          (+oldDate !== +eventDate || oldCat !== catIDs[selected])
        ) {
          setOpenFailed(true)
          return
        }
      }
      editEvent(eventId, eventDate, description, catIDs[selected])
      setOpen(true)
    }
  }

  const handleConfirm = () => {
    editEvent(eventId, eventDate, description, catIDs[selected]).then((_) => {
      alert('Event changes saved.')
      setOpen(false)
      props.clickAway()
    })
  }

  const EventEditPopup = () => {
    return (
      <Popup
        open={open}
        onClose={handleConfirm}
        title={'Edit Event'}
        body={'Please confirm you would like to change the selected event.'}
      />
    )
  }

  const EventEditFailedPopup = () => {
    return (
      <ErrorPopup
        open={openFailed}
        onClose={() => setOpen(false)}
        body={'Event already exists on this date.'}
      />
    )
  }

  async function editEvent(
    event_id: number,
    event_date: Date,
    event_description: string,
    category_id: number
  ) {
    let payload: Event = {
      event_id: event_id,
      event_date: event_date,
      category_id: category_id,
      event_description: event_description
    }
    const instance = await APIManager.getInstance()
    await instance.editEvent(event_id, payload)
    await updateEvents()
    setEventDate(event_date)
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
    <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
      <EventEditPopup />
      <EventEditFailedPopup />
      <RightMenuPanel title={'Edit Event'} handleBackClick={handleBackClick}>
        <Header text="Please select category:" />
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
        <Header text="Please enter date:" />
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
            onChange={(newVal) => setEventDescription(newVal.target.value)}
          />
        </ListItem>
      </RightMenuPanel>
      <RightMenuPanelBottom handleCancelClick={handleBackClick}>
        <PanelButton disabled={clicked} onClick={handleOnClick}>
          Save Changes
        </PanelButton>
      </RightMenuPanelBottom>
    </ListItem>
  )
}

export default EditEvent
