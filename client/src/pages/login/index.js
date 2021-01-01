import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Jumbotron } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import JumbotronComponent from '../../components/Jumbotron';
import LoginFormComponent from '../../components/LoginForm';
import RaisedButton from '../../components/RaisedButton';
import tokenConfig from '../../config/tokenConfig';

const LoginPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const checkUser = async () => {
        try {
            await axios.get('/api/auth/user', tokenConfig());
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <div>
            {isAuthenticated !== null ? (
                isAuthenticated ? (
                    <Redirect />
                ) : (
                    <div>
                        <JumbotronComponent
                            title="Nice to meet you again."
                            isSmall
                            noActionButton={true}
                        />

                        <LoginFormComponent />
                    </div>
                )
            ) : null}
            {/* <h4 className="heading">Login Page</h4> */}
        </div>
    );
};

export default LoginPage;
