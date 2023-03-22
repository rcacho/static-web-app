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
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { APIManager } from '@/utils/APIManager'
import { Event } from '@/interfaces/Event'
import { useCalendarContext } from '@/store/CalendarContext'

// placeholder for the list of categories
let EventList: string[] = []
let catIDs: any[] = []
// @ts-ignore
const AddEventRender = (props: any) => {
  const [eventDate, setEventDate] = useState(new Date(2022, 1, 1))

  const adminID = 'user' // this will be changed to whatever user is logged in?
  const [selected, setSelected] = useState(null)
  const [description, setEventDescription] = useState('')
  const [events, setEvents] = useState([''])
  const { categories } = useCalendarContext()

  useEffect(() => {
    EventList = []
    for (let i = 0; i < categories.length; i++) {
      EventList.push(categories[i].category_name)
      catIDs.push(categories[i].category_id)
    }
    setEvents(EventList)
  }, [selected])

  const handleAddEvent = () => {
    if (selected !== null) {
      addEvent(eventDate, description, adminID, catIDs[selected]).then(
        props.clickAway()
      )
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
  function renderList(props: ListChildComponentProps) {
    const { index, style } = props

    const handleSelect = () => {
      setSelected(index)
    }
    return (
      <ListItem
        style={style}
        key={index}
        component="div"
        disablePadding
        onClick={handleSelect}
      >
        <ListItemButton sx={{ pl: 5, pt: 0 }} selected={selected === index}>
          <ListItemText primary={`${events[index]}`} />
        </ListItemButton>
      </ListItem>
    )
  }

  const handleBackClick = () => {
    props.updateState(0)
  }

  return (
    <ThemeProvider theme={MuiTheme}>
      <List>
        <ListItem>
          <ListItemText
            sx={{ color: '#898989', textDecoration: 'underline' }}
            secondary="Add Event"
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
        <FixedSizeList
          height={200}
          width={360}
          itemSize={38}
          itemCount={EventList.length}
          overscanCount={5}
        >
          {renderList}
        </FixedSizeList>

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
      <List className="bottom-buttons" disablePadding={true}>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="menu-button"
            size="medium"
            variant="contained"
            color="primary"
            onClick={handleAddEvent}
          >
            Add Event
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

export default AddEventRender
