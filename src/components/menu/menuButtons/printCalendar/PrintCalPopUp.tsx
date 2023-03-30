import { Button } from '@mui/material'
import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import MenuButton from '../../MenuButton'
import Print from '@mui/icons-material/Print'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const PrintCalPopUp = (props: any) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function PrintButton() {
    return (
      <MenuButton handleClick={handlePrint} icon={Print} text={'Print Calendar'} />
    )
  }

  const handlePrint = () => {
    const input = document.getElementById("PDFRender")
    if (input != null) {
      html2canvas(input, { logging: true, useCORS: true }).then((canvas) => {
        const imgWidth = 208
        const imgHeight = canvas.height * imgWidth / canvas.width
        const imgData = canvas.toDataURL('img/png');

        const pdf = new jsPDF('l', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
        pdf.save("calendar.pdf")
      })
    }
  };


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
            Please choose pdf to export the calendar for printing:
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel</Button>
          <Button onClick={handlePrint} autoFocus>
            .pdf
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PrintCalPopUp