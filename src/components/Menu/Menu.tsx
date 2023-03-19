import React from 'react'
import { MenuList } from '@mui/material'
import { menuSidebar } from '../../constants/constants'
import NavLinkMenuItem from './NavLinkMenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'

const ListItemTextCustom = styled(ListItemText)(() => ({
  fontWeight: '700 !important'
}))

function Menu() {
  return (
    <MenuList>
      {
        menuSidebar.map((item, index) => (
          <NavLinkMenuItem to={item.path} key={index}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemTextCustom sx={{ fontWeight: 700}}>{item.title}</ListItemTextCustom>
          </NavLinkMenuItem>
        ))
      }
    </MenuList>
  )
}

export default Menu
