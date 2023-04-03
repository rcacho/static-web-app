import React from 'react'
import MenuButton from '../../MenuButton'
import Print from '@mui/icons-material/Print'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { APIManager } from '@/utils/APIManager'

const PrintCalPopUp = () => {
  const [open, setOpen] = React.useState(false)

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

    if (cal != null && legend != null && tb != null) {
      let legCanv = document.createElement('canvas')
      legCanv.width = legend.scrollWidth
      legCanv.height = legend.scrollHeight

      APIManager.getInstance()
        .then((instance) => instance.getCategory())
        .then((data) => {
          let categoryList = Array.from(data.result)
          let legendWindowHeight = categoryList.length * 75

          html2canvas(cal, {
            logging: true,
            useCORS: true,
            windowWidth: 1415,
            windowHeight: 880
          })
            .then((calCanv) => {
              const calWidth = pdfWidth - 30
              const calHeight = (calCanv.height * calWidth) / calCanv.width
              const calData = calCanv.toDataURL('img/png')

              html2canvas(legend, {
                logging: true,
                useCORS: true,
                windowHeight: legendWindowHeight
              }).then((legCanv) => {
                const legendWidth = 30
                const legendHeight = pdfHeight //(legCanv.height * legendWidth) / pdfWidth
                const legendData = legCanv.toDataURL('img/png')

                console.log(legCanv)

                html2canvas(tb, { logging: true, useCORS: true }).then(
                  (tbCanv) => {
                    const tbHeight = 15
                    const tbWidth = (tbCanv.width * tbHeight) / tbCanv.height
                    const tbData = tbCanv.toDataURL('img/png')

                    const pdf = new jsPDF('l', 'mm', 'a4')

                    pdf.addImage('/img/logo.png', 0, 0, 20, tbHeight)
                    pdf.addImage(
                      legendData,
                      'PNG',
                      0,
                      tbHeight,
                      legendWidth,
                      legendHeight
                    )
                    pdf.addImage(tbData, 'PNG', 20, 0, tbWidth, tbHeight)
                    pdf.addImage(
                      calData,
                      'PNG',
                      legendWidth,
                      tbHeight,
                      calWidth,
                      calHeight
                    )

                    pdf.save('MasterCalendar.pdf')

                    handleClose()
                  }
                )
              })
            })
            .catch((err) => {
              console.log(err)
            })
        })
    }
  }

  return (
    <>
      <PrintButton />
      <Dialog
        sx={{
          '& .MuiDialog-container': {
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '90vh'
          }
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Print Calendar'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            PDF Download in Progress. Please Wait!
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PrintCalPopUp
