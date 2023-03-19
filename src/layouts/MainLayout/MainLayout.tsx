import { Container } from '@mui/material';
import React, { ReactNode } from 'react'
import Footer from '../../components/Footer';
import Header from '../../components/Header/Header'

interface AuthLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: AuthLayoutProps) {
  return (
    <Container>
      <Header />
      { children }
      <Footer />
    </Container>
  )
}

export default MainLayout
