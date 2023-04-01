import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ThemeProvider,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import MuiTheme from '@/styles/MuiTheme'
// @ts-ignore
import { APIManager } from '@/utils/APIManager'
import { Event } from '@/interfaces/Event'
import { useAPIContext } from '@/store/APIContext'
import { useCalendarContext } from '@/store/CalendarContext'

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

  const [selected, setSelected] = useState(eventIndex)
  const [first, setFirst] = useState(true)
  const [events, setEvents] = useState([''])
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
            <ListItemText primary={`${events[index]}`} />
          </ListItemButton>
        </ListItem>
      )
    })
  }

  const handleBackClick = () => {
    props.updateState(0)
  }

  const handleOnClick = () => {
    if (selected !== null) {
      editEvent(
        eventId,
        eventDate,
        description,
        adminID,
        catIDs[selected]
      ).then(props.clickAway())
    }
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
      .then(() => {
        updateEvents()
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
    <ThemeProvider theme={MuiTheme}>
      <List>
        <ListItem>
          <ListItemText
            sx={{ color: '#898989', textDecoration: 'underline' }}
            secondary="Edit Event"
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
          <ListItemText primary="Please enter date:" />
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
            defaultValue={reformatDate(selectedDate as string)}
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
            onChange={(newVal) => setEventDescription(newVal.target.value)}
          />
        </ListItem>
      </List>
      <List
        className="bottom-buttons"
        disablePadding={true}
        sx={{
          position: 'absolute',
          margin: 'auto',
          bottom: '0',
          width: '100%',
          height: '13%'
        }}
      >
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="menu-button"
            size="medium"
            variant="contained"
            color="primary"
            onClick={handleOnClick}
          >
            Save Changes
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
    </ThemeProvider>
  )
}

export default EditEvent
