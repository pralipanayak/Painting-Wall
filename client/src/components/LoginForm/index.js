import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Alert, Container, Form } from 'react-bootstrap';
import RaisedButton from '../RaisedButton';
import tokenConfig from '../../config/tokenConfig';
import { Redirect } from 'react-router-dom';

const LoginFormComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);

    const handleUsername = (value) => {
        setUsername(value);
    };

    const handlePassword = (value) => {
        setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // axios
        try {
            const dataToSubmit = {
                username,
                password,
            };

            const response = await axios.post('/api/auth/login', dataToSubmit);

            localStorage.setItem('token', response.data.data.token);

            setError(null);

            window.location.href = '/';
        } catch (error) {
            setError(
                error.response.data.errors.username
                    ? error.response.data.errors.username[0]
                    : error.response.data.errors.password
                    ? error.response.data.errors.password[0]
                    : error.response.data.errors.non_field_errors
                    ? error.response.data.errors.non_field_errors[0]
                    : ''
            );
        }
    };

    return (
        <Container className="formComponent">
            <Form onSubmit={handleSubmit}>
                {/* <div className="formHeader">
                    <h3 className="">Lets login....</h3>
                </div> */}
                {error !== null ? (
                    <Alert variant="danger">{error}</Alert>
                ) : null}
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => handleUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => handlePassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <RaisedButton
                    title="Login"
                    isSecondary={true}
                    needIcon={false}
                    extraPadding={true}
                    type="submit"
                />
            </Form>
        </Container>
    );
};

export default LoginFormComponent;
