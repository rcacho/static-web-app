import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ThemeProvider,
  Button,
  Typography,
  Box
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import MuiTheme from '@/styles/MuiTheme'
// @ts-ignore
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import DeleteEventPopUp from '@/components/menu/menuButtons/changeEvents/DeleteEventPopUp'
import { useAPIContext } from '@/store/APIContext'
import { useCalendarContext } from '@/store/CalendarContext'

let EventList: (string | undefined)[] = []
let IdList: (number | null)[] = []

// @ts-ignore
const ChangeDeleteEvent = (props: any) => {
  const { selectedDate } = useCalendarContext()
  const { events, catMap, setSelectedEvent } = useAPIContext()
  const [selected, setSelected] = useState(null)
  const [size, setSize] = useState(0)

  useEffect(() => {
    EventList = []
    for (let i = 0; i < events.length; i++) {
      if (selectedDate) {
        let testDate = new Date(
          +selectedDate.substring(6, 10),
          +selectedDate.substring(0, 2),
          +selectedDate.substring(3, 5)
        )
        // ok so like program thinks this is a date object
        // but when console log typeof events[i].event_date, it says string
        // so like idk
        let eDate = new Date(
          +(events[i].event_date as unknown as string).substring(0, 4),
          +(events[i].event_date as unknown as string).substring(5, 7),
          +(events[i].event_date as unknown as string).substring(8, 10)
        )
        if (+eDate === +testDate) {
          if (catMap.get(events[i].category_id) !== undefined) {
            EventList.push(catMap.get(events[i].category_id))
            IdList.push(events[i].event_id)
          }
        }
      }
      setSize(EventList.length)
    }
  }, [selected])

  // format date

  function EditEvent() {
    if (selected === null) {
      return (
        <Button
          className="menu-button"
          size="medium"
          variant="contained"
          color="primary"
          disabled
        >
          Edit Event
        </Button>
      )
    } else {
      return (
        <Button
          className="menu-button"
          size="medium"
          variant="contained"
          color="primary"
          onClick={() => {
            props.updateState(1.6)
          }}
        >
          Edit Event
        </Button>
      )
    }
  }

  // render list for the scroll function
  function renderList(props: ListChildComponentProps) {
    const { index, style } = props
    const handleSelect = () => {
      setSelected(index)
      setSelectedEvent(IdList[index] as number)
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
          <ListItemText primary={`${EventList[index]}`} />
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
            secondary="Change / Delete Event"
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
          <ListItemText primary={`Selected date: ${selectedDate}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Please select category:" />
        </ListItem>
        <FixedSizeList
          height={200}
          width={360}
          itemSize={38}
          itemCount={size}
          overscanCount={5}
        >
          {renderList}
        </FixedSizeList>
      </List>
      <List
        className="bottom-buttons-cat"
        disablePadding={true}
        sx={{
          position: 'absolute',
          margin: 'auto',
          bottom: '0',
          width: '100%',
          height: '26%'
        }}
      >
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="menu-button"
            size="medium"
            variant="contained"
            color="primary"
            onClick={() => {
              props.updateState(1)
            }}
          >
            Add New Event
          </Button>
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <EditEvent></EditEvent>
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <DeleteEventPopUp selected={selected}>Delete Event</DeleteEventPopUp>
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

export default ChangeDeleteEvent
