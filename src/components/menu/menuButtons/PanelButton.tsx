import { Button, ListItem } from '@mui/material'

interface PanelButtonProps {
  children?: any
  onClick: () => void
  disabled?: boolean
}

const PanelButton = (props: PanelButtonProps) => {
  const { children, onClick, disabled } = props
  return (
    <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        disabled={disabled ?? false}
        className="menu-button"
        size="medium"
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        {children}
      </Button>
    </ListItem>
  )
}

export default PanelButton
