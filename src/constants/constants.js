import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export const menuSidebar = [
  {
    icon: (<HomeOutlinedIcon />),
    title: 'Trang chủ',
    path: '/',
    locale: 'home'
  },
  {
    icon: <AccountCircleOutlinedIcon />,
    title: 'Tài khoản',
    path: '/tai-khoan-cua-toi',
    locale: 'my account'
  },
  {
    icon: <Diversity3Icon />,
    title: 'Bạn bè',
    path: '/friends/suggestions',
    locale: 'friend'
  },
  {
    icon: <BookmarkIcon />,
    title: 'Lưu',
    path: '/saved?key=all',
    locale: 'save'
  }
]