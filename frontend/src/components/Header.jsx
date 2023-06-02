
import { Navbar, Nav, Container, NavDropdown,} from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import {useNavigate} from 'react-router-dom'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logOutApiCall] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async ()=>{
    try {
      await logOutApiCall().unwrap()
    dispatch(logout());
    navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Navbar bg="dark" expand="lg" collapseOnSelect variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERN AUTH</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" href="/" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                 <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer>
                  <NavDropdown.Item onClick = {logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                  </LinkContainer>

                 </NavDropdown>
                
                </>
              ):(
                <>
                 <LinkContainer to="/login">
                <Nav.Link>
                  <FaSignInAlt /> Sign In
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>
                  <FaSignOutAlt />
                  sign Up
                </Nav.Link>
              </LinkContainer>
                </>
              )}
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
