import React from 'react'
import { Stack } from '@mui/material';
import { Content, SideLeft, SideRight } from './Home.style';
import Menu from '../../components/Menu';
import PostList from '../../components/PostList';
import InputPost from '../../components/InputPost';

function Home() {
  return (
    <Stack direction={'row'} gap={5}>
      <SideLeft>
        <Menu />
      </SideLeft>
      <Content>
        <InputPost />
        <PostList />
      </Content>
      <SideRight> jsdh sdfh sdfh k</SideRight>
    </Stack>
  )
}

export default Home
