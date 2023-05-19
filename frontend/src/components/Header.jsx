import React from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap'
import {FaSignInAlt,FaSignOutAlt} from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
    return (
        <>
          <Navbar bg="dark" expand='lg' collapseOnSelect variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>MERN AUTH</Navbar.Brand>
                </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav' href="/"/>
             
                <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className="ms-auto">
                <LinkContainer to="/login">
                <Nav.Link>
                <FaSignInAlt/> Sign In</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                <Nav.Link><FaSignOutAlt/>sign Up</Nav.Link>
                </LinkContainer>
              </Nav>
                </Navbar.Collapse>
            </Container>
          </Navbar>
         
        </>
      );
}

export default Header