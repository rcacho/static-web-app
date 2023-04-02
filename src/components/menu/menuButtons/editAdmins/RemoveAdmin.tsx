import React, { useState } from 'react'
import { ListItem, ListItemButton, ListItemText } from '@mui/material'
// @ts-ignore
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import RemoveAdminButton from '@/components/menu/menuButtons/editAdmins/RemoveAdminButton'
import RightMenuPanel, { Header, RightMenuPanelBottom } from '../RightMenuPanel'

const RemoveAdmin = (props: any) => {
  const [selected, setSelected] = useState(null)
  const FakeAdminList = [
    'aa',
    'bb',
    'cc',
    'dd',
    'ee',
    'ff',
    'gg',
    'hh',
    'ii',
    'jj'
  ]
  //function to handle Back button
  const handleBackClick = () => {
    props.updateState(3)
    setSelected(null)
  }

  function renderList(props: ListChildComponentProps) {
    const { index, style } = props

    const handleSelect = () => {
      setSelected(index)
    }
    return (
      <ListItem
        style={style}
        key={index}
        component="div"
        disablePadding
        onClick={handleSelect}
      >
        <ListItemButton sx={{ pl: 5, pt: 0 }} selected={selected === index}>
          <ListItemText primary={`Admin ${FakeAdminList[index]}`} />
        </ListItemButton>
      </ListItem>
    )
  }

  return (
    <>
      <RightMenuPanel title={'Remove Admin'} handleBackClick={handleBackClick}>
        <Header text="Please select admin to remove:" />
        <FixedSizeList
          height={200}
          width={360}
          itemSize={38}
          itemCount={FakeAdminList.length}
          overscanCount={5}
        >
          {renderList}
        </FixedSizeList>
      </RightMenuPanel>
      <RightMenuPanelBottom handleCancelClick={handleBackClick}>
        <RemoveAdminButton selected={selected} />
      </RightMenuPanelBottom>
    </>
  )
}

export default RemoveAdmin
