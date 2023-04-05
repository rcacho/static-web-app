import {
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  Button,
  Typography,
  Box,
  AccordionSummary,
  Accordion,
  AccordionDetails
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import MuiTheme from '@/styles/MuiTheme'
// @ts-ignore
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import DeleteEventPopUp from '@/components/menu/menuButtons/changeEvents/DeleteEventPopUp'
import { useAPIContext } from '@/store/APIContext'
import { useCalendarContext } from '@/store/CalendarContext'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

let EventList: (string | undefined)[] = []
let IdList: (number | null)[] = []
let CatList: (number | null)[] = []
let DescriptionList: (string | null)[] = []

// @ts-ignore
const ChangeDeleteEvent = (props: any) => {
  const { isAdmin } = useAPIContext()
  const { selectedDate } = useCalendarContext()
  const {
    events,
    catMap,
    setSelectedEvent,
    categories,
    changeEventId,
    eventId,
    updateCats
  } = useAPIContext()
  const [selected, setSelected] = useState(null)
  const [expanded, setExpanded] = useState<number | false>(false)
  const [eventsState, setEventsState] = useState(EventList)
  const [descriptionList, setDescriptionList] = useState(DescriptionList)

  useEffect(() => {
    EventList = []
    CatList = []
    IdList = []
    DescriptionList = []
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
            CatList.push(events[i].category_id)
            if (
              events[i].event_description === null ||
              events[i].event_description === ''
            ) {
              DescriptionList.push('No additional details.')
            } else {
              DescriptionList.push(events[i].event_description)
            }
          }
        }
      }
    }
    setDescriptionList(DescriptionList)
    setEventsState(EventList)
  }, [selected, categories, eventId, events, updateCats, catMap])

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

  function renderList() {
    const handleSelect = (index: any) => {
      setSelected(index)
      setSelectedEvent(CatList[index] as number) // basically category id of event
      changeEventId(IdList[index] as number)
    }

    const handleChange =
      (index: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? index : false)
        console.log(event.bubbles)
      }

    return eventsState.map((value, index) => {
      return (
        <ListItem
          key={index}
          component="div"
          disablePadding
          onClick={() => handleSelect(index)}
        >
          <Accordion
            expanded={index === expanded}
            onChange={handleChange(index)}
            sx={{ backgroundColor: index === expanded ? 'lightgrey' : 'white' }}
          >
            <AccordionSummary
              sx={{ width: '310px' }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>{value}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {descriptionList[index]}
                {``}{' '}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </ListItem>
      )
    })
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
            secondary={isAdmin ? 'Change / Delete Event' : 'Selected Event'}
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
          <ListItemText primary={`Selected date: ${selectedDate}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              eventsState.length === 0
                ? 'No events on this day.'
                : 'Please select event:'
            }
          />
        </ListItem>
        <List
          disablePadding={true}
          style={{
            overflow: 'auto',
            overflowY: 'scroll',
            height: '300px'
          }}
        >
          {renderList()}
        </List>
      </List>
      {isAdmin && (
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
            <EditEvent />
          </ListItem>
          <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
            <DeleteEventPopUp
              clickAway={props.clickAway}
              updateState={props.updateState}
              selected={selected}
            >
              Delete Event
            </DeleteEventPopUp>
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
      )}
    </ThemeProvider>
  )
}

export default ChangeDeleteEvent
