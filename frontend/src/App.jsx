import { useState } from 'react';
import {Container} from "react-bootstrap";
import {ToastContainer} from "react-toastify"
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return ( 
    <>
      <Header/>
      <ToastContainer position='bottom-right' />
      <Container className='my- 2'>
        <Outlet/>
      </Container>
    </>
  )
}

export default App
