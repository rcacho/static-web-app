import { PopupType } from '../../../Popup'

function showPopup(popupType: PopupType, name: string, action: string) {
  switch (popupType) {
    case PopupType.Success:
      alert(`Category ${name} ${action} successfully.`)
      break
    case PopupType.DuplicateName:
      alert(
        `The name "${name}" is already in use by another category. Please try another name.`
      )
      break
    case PopupType.Duplicate:
      alert(
        'Colour and symbol combination already in use. Please try a unique combination.'
      )
      break
    default:
  }
}

export default showPopup
