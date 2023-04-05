import React from 'react'
import MenuButton from '../../MenuButton'
import Print from '@mui/icons-material/Print'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useAPIContext } from '@/store/APIContext'
import { ButtonlessPopup } from '../Popup'

const PrintButton = () => {
  const [open, setOpen] = React.useState(false)
  const { categories } = useAPIContext()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function PrintButton() {
    return (
      <MenuButton
        handleClick={handlePrint}
        icon={Print}
        text={'Print Calendar'}
      />
    )
  }

  const handlePrint = () => {
    handleClickOpen()
    const cal = document.getElementById('Calendar')
    const legend = document.getElementById('Legend')
    const tb = document.getElementById('TopBar')

    const pdfWidth = 297
    const pdfHeight = 207
    const legendWindowHeight = categories.length * 90

    console.log(legend)
    if (cal != null && legend != null && tb != null) {
      html2canvas(cal, {
        logging: true,
        useCORS: true,
        windowWidth: 1600,
        windowHeight: 1000
      })
        .then((calCanv) => {
          const calWidth = pdfWidth - 40
          const calHeight = (calCanv.height * calWidth) / calCanv.width
          const calData = calCanv.toDataURL('img/png')
          console.log(calData)

          html2canvas(legend, {
            logging: true,
            useCORS: true,
            windowHeight: legendWindowHeight
          }).then((legCanv) => {
            const legendWidth = 35
            let legendHeight = (legCanv.height * legendWidth) / legCanv.width
            const legendData = legCanv.toDataURL('img/png')

            if (legendHeight > pdfHeight) {
              legendHeight = pdfHeight
            }

            console.log(legCanv)

            html2canvas(tb, { logging: true, useCORS: true }).then((tbCanv) => {
              const tbHeight = 15
              const tbWidth = (tbCanv.width * tbHeight) / tbCanv.height
              const tbData = tbCanv.toDataURL('img/png')

              console.log(tbData)

              const pdf = new jsPDF('l', 'mm', 'a4')

              pdf.addImage('/img/logo.png', 2, 2, 20, tbHeight)
              pdf.addImage(
                legendData,
                'PNG',
                2,
                tbHeight + 2,
                legendWidth,
                legendHeight
              )
              pdf.addImage(tbData, 'PNG', 22, 2, tbWidth, tbHeight)
              pdf.addImage(
                calData,
                'PNG',
                legendWidth + 2,
                tbHeight + 2,
                calWidth,
                calHeight
              )

              pdf.save('MasterCalendar.pdf')

              handleClose()
            })
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <>
      <PrintButton />
      <ButtonlessPopup
        open={open}
        onClose={handleClose}
        title={'Print Calendar'}
        body={'PDF Download in Progress. Please Wait!'}
      />
    </>
  )
}

export default PrintButton
