import { Link, useLocation } from "react-router-dom";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export const AppMenu = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/"><b>Stockie</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-left">
                        <Nav.Link href="/users">Users</Nav.Link>
                        <Nav.Link href="/portfolios">Portfolios</Nav.Link>
                        <Nav.Link href="/stocks">Stocks</Nav.Link>
                        <Nav.Link href="/companies">Companies</Nav.Link>
                        <NavDropdown title="Reports" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/stocks-portfolios-count">Stocks Portfolios Count</NavDropdown.Item>
                            <NavDropdown.Item href="/portfolios-stocks-count">Portfolios Stocks Count</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/stocks-list">Stocks list</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
);
};
