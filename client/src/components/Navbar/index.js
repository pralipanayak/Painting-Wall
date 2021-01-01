import React, { useState, useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './styles.css';
import axios from 'axios';
import tokenConfig from '../../config/tokenConfig';
import { withRouter } from 'react-router-dom';

const NavbarComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [firstName, setFirstName] = useState(null);

    const checkUser = async () => {
        try {
            const response = await axios.get('/api/auth/user', tokenConfig());
            setIsAuthenticated(true);
            setFirstName(response.data.data.user.username.split(' ')[0]);
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    const handleLogout = () => {
        localStorage.clear();

        window.location.href = '/';
    };

    return (
        <Navbar collapseOnSelect expand="lg" id="navbar" fixed="top">
            <Navbar.Brand href="/" className="heading">
                Painting Wall
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {isAuthenticated !== null ? (
                    isAuthenticated ? (
                        <Nav className="ml-auto">
                            {firstName !== null ? (
                                <Nav.Link href="#!">
                                    Hello, {firstName}
                                </Nav.Link>
                            ) : null}

                            <Nav.Link href="/myWall">My Wall</Nav.Link>
                            <Nav.Link href="/upload">Create a post</Nav.Link>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav className="ml-auto">
                            {!props.location.pathname.includes('login') ? (
                                <Nav.Link href="/login">Login</Nav.Link>
                            ) : null}
                            {!props.location.pathname.includes('signup') ? (
                                <Nav.Link href="/signup">Signup</Nav.Link>
                            ) : null}
                        </Nav>
                    )
                ) : null}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default withRouter(NavbarComponent);
