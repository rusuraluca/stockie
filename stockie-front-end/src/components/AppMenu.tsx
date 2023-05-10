import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import EventBus from "../common/EventBus";
import * as AuthService from "../services/auth.service";


export const AppMenu = () => {
    const [currentUser, setCurrentUser] = useState<string | undefined>(AuthService.getCurrentUser());
    const [currentUserId, setCurrentUserId] = useState<string | undefined>(AuthService.getCurrentUserId());
    const [currentUserRole, setCurrentUserRole] = useState<string | undefined>(AuthService.getCurrentUserRole());

    useEffect(() => {
        EventBus.on("logout", logOut);
        return () => {
            EventBus.remove("logout", logOut);
        };
    }, []);

    useEffect(() => {
        setCurrentUser(AuthService.getCurrentUser());
        setCurrentUserId(AuthService.getCurrentUserId());
        setCurrentUserRole(AuthService.getCurrentUserRole());
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
        setCurrentUserId(undefined);
        setCurrentUserRole(undefined);
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/"><b>Stockie</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
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
                    {currentUser && currentUserRole !== "admin" && (
                        <Nav className="justify-content-end">
                            <Nav.Link href={`/users/${currentUserId}/details`}>Profile</Nav.Link>
                            <Nav.Link href="/login" onClick={logOut}>Log out</Nav.Link>
                        </Nav>
                    )}
                    {currentUser && currentUserRole === "admin" && (
                        <Nav className="justify-content-end">
                            <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item href={`/users/${currentUserId}/details`}>About me</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={`/manage_users`}>Manage Users</NavDropdown.Item>
                                <NavDropdown.Item href={`/scripting`}>Scripting tool</NavDropdown.Item>
                                <NavDropdown.Item href={`/admin_setting`}>Change pagination</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/login" onClick={logOut}>Log out</Nav.Link>
                        </Nav>
                    )}
                    {!currentUser && (
                        <Nav className="justify-content-end">
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
);};
