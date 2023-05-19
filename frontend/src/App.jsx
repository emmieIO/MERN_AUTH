import { useState } from 'react';
import {Container} from "react-bootstrap"
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function App() {
 

  return ( 
    <>
      <Header/>
      <Container className='my- 2'>
        <Outlet/>
      </Container>
    </>
  )
}

export default App