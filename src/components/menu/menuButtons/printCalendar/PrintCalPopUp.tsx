import React from 'react'
import MenuButton from '../../MenuButton'
import Print from '@mui/icons-material/Print'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import * as htmlToImage from 'html-to-image'

const PrintCalPopUp = (props: any) => {
  function PrintButton() {
    return (
      <MenuButton handleClick={handlePrint} icon={Print} text={'Print Calendar'} />
    )
  }

  const handlePrint = () => {

    const cal = document.getElementById("Calendar")
    const legend = document.getElementById("Legend")
    const tb = document.getElementById("TopBar")

    const pdfWidth = 297
    const pdfHeight = 210

    
    if (cal != null && legend != null && tb != null) {
      let legCanv = document.createElement('canvas')
      legCanv.width = legend.scrollWidth
      legCanv.height = legend.scrollHeight

      html2canvas(cal, { logging: true, useCORS: true, windowWidth: 1415, windowHeight: 880 }).then((calCanv) => {
        const calWidth = (pdfWidth ) *0.9
        const calHeight = (calCanv.height * calWidth / calCanv.width) 
        const calData = calCanv.toDataURL('img/png');

        html2canvas(legend, {logging: true, useCORS: true, windowHeight: 3000 }).then((legCanv) => {

          const legendWidth = 30
          const legendHeight = legCanv.height * legendWidth / legCanv.width
          const legendData = legCanv.toDataURL('img/png');
          
          console.log(legCanv)

          html2canvas(tb, { logging: true, useCORS: true }).then((tbCanv) => {
            const tbHeight = 15
            const tbWidth = tbCanv.width * tbHeight / tbCanv.height
            const tbData = tbCanv.toDataURL('img/png')

            const pdf = new jsPDF('l', 'mm', 'a4')

            pdf.addImage(legendData, 'PNG', 0, tbHeight, legendWidth, legendHeight)
            pdf.addImage(tbData, 'PNG', 30, 0, tbWidth, tbHeight)
            pdf.addImage(calData, 'PNG', legendWidth - 5, tbHeight, calWidth, calHeight)

            pdf.save("MasterCalendar.pdf")
          })
        })
      })
    }
  }

  return (
    <PrintButton />
  )
}

export default PrintCalPopUp