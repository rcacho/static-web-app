import React from 'react'
import MenuButton from './MenuButton'

const StateMenuButton = (props: any) => {
  const handleClick = () => {
    if (props.state >= 0) {
      props.parentProp.updateState(props.state)
    }
  }

  return (
    <MenuButton icon={props.icon} handleClick={handleClick} text={props.text} />
  )
}

export default StateMenuButton
