import { PopupType, SuccessPopup, ErrorPopup } from '../../../Popup'

interface CategoryPopupProps {
  popupType: PopupType
  name: string
  open: boolean
  onClose: () => void
  action: string
}

const CategoryPopup = (props: CategoryPopupProps) => {
  const { popupType, name, action, open, onClose } = props
  const renderPopup = () => {
    switch (popupType) {
      case PopupType.Success:
        return (
          <SuccessPopup
            open={open}
            onClose={onClose}
            body={`Category ${name} ${action} successfully.`}
          />
        )
      case PopupType.DuplicateName:
        return (
          <ErrorPopup
            open={open}
            onClose={onClose}
            body={`The name "${name}" is already in use by another category.
            Please try another name.`}
          />
        )
      case PopupType.Duplicate:
        return (
          <ErrorPopup
            open={open}
            onClose={onClose}
            body={
              'Colour and symbol combination already in use. Please try a unique combination.'
            }
          />
        )
      default:
        return <></>
    }
  }

  return <>{renderPopup()}</>
}

export default CategoryPopup
