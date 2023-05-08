import Stack from '@mui/material/Stack'
import { SideLeft } from '../Home/Home.style'
import Menu from '../../components/Menu'
import ProfileContent from './ProfileContent'

function Profile() {
  return (
    <Stack direction={'row'} gap={5} mt="74px">
      <SideLeft>
        <Menu />
      </SideLeft>
      <ProfileContent />
    </Stack>
  )
}

export default Profile
