import React from 'react'
import * as ics from 'ics'
import { APIManager } from '@/utils/APIManager'
import { Event } from '@/interfaces/Event'
import { Category } from '@/interfaces/Category'
import MenuButton from '@/components/menu/MenuButton'
import Export from '@mui/icons-material/IosShare'
import { ButtonPopup } from '../Popup'

const ExportButton = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickIcs = () => {
    let EventList: Array<Event> = []
    let CategoryList: Array<Category> = []
    let ICSEvents: Array<ics.EventAttributes> = []

    APIManager.getInstance()
      .then((instance) => instance.getCategory())
      .then((data) => {
        CategoryList = Array.from(data.result)
      })
      .then(() => APIManager.getInstance())
      .then((instance) => instance.getEvent())
      .then((data) => {
        EventList = Array.from(data.result)
        EventList.forEach((event) => {
          //because apparently date != date
          let date = event.event_date.toString().split('-')
          let year: number = Number(date[0])
          let month: number = Number(date[1])
          let day: number = Number(date[2].split('T')[0])

          //if description is null it is undefined
          let description: string | undefined
          if (event.event_description === null) {
            description = undefined
          } else {
            description = event.event_description
          }

          CategoryList.forEach((category) => {
            if (event.category_id == category.category_id) {
              let icsEvent: ics.EventAttributes = {
                title: category.category_name,
                start: [year, month, day],
                duration: { days: 1 },
                description: description
              }
              console.log(icsEvent)
              ICSEvents.push(icsEvent)
            }
          })
        })
      })
      .then(() => {
        const filename = 'events.ics'

        //TODO: return useful info
        if (ICSEvents.length === 0) return

        const { error, value } = ics.createEvents(ICSEvents)

        if (error) {
          //TODO: error handling??
          console.log(error)
          return
        }
        if (value !== undefined) {
          const file = new File([value], filename, { type: 'plain/text' })

          const url = URL.createObjectURL(file)

          const anchor = document.createElement('a')
          anchor.href = url
          anchor.download = filename

          document.body.appendChild(anchor)
          anchor.click()
          document.body.removeChild(anchor)

          URL.revokeObjectURL(url)
        }
      })
      .catch((err) => {
        console.log(err)
      })

    handleClose()
  }

  function ExportButton() {
    return (
      <MenuButton
        handleClick={handleClickOpen}
        icon={Export}
        text={'Export Calendar'}
      />
    )
  }

  return (
    <>
      <ExportButton />
      <ButtonPopup
        open={open}
        onClose={handleClose}
        title={'Export Calendar'}
        body={'Click below to download the events in .ICS format.'}
        buttonLabel={'Download'}
        buttonClick={handleClickIcs}
      />
    </>
  )
}

export default ExportButton
