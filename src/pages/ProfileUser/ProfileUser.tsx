import Stack from '@mui/material/Stack'
import React from 'react'
import { useParams } from 'react-router-dom'
import Menu from '../../components/Menu'
import { SideLeft } from '../Home/Home.style'
import ProfileUserContent from './ProfileUserContent'

function ProfileUser() {
  const { id } = useParams()
  return (
    <Stack direction={'row'} gap={5} mt="74px">
      <SideLeft>
        <Menu />
      </SideLeft>
      <ProfileUserContent id={id as string}/>
    </Stack>
  )
}

export default ProfileUser
