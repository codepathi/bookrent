import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/userContext";
import { useLogout } from '../hooks/useLogout';

const NavbarMain = () => {
  const AuthContexts = useContext(AuthContext);
  const { user } = AuthContexts;

  const {logout} = useLogout();

  const handleLogout = () => {
    logout();
  }

  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">{user ? `Welcome, ${user}`: 'Coderush-books'} </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMain;