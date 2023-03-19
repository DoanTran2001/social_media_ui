import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const menuSidebar = [
  {
    icon: (<HomeOutlinedIcon />),
    title: 'Trang chủ',
    path: '/'
  },
  {
    icon: <AccountCircleOutlinedIcon />,
    title: 'Tài khoản',
    path: '/tai-khoan-cua-toi'
  },
  {
    icon: <SettingsOutlinedIcon />,
    title: 'Cài đặt',
    path: '/cai-dat'
  }
]