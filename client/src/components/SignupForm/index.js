import React, { useState } from 'react';
import { Alert, Container, Form } from 'react-bootstrap';
import RaisedButton from '../RaisedButton';
import axios from 'axios';

const SignupFormComponent = () => {
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);

    const handleFirstName = (value) => {
        setFirst_name(value);
    };

    const handleLastName = (value) => {
        setLast_name(value);
    };

    const handleUsername = (value) => {
        setUsername(value);
    };

    const handleEmail = (value) => {
        setEmail(value);
    };

    const handlePassword = (value) => {
        setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataToSubmit = {
                first_name,
                last_name,
                username,
                email,
                password,
            };

            const response = await axios.post('/api/auth/signup', dataToSubmit);

            localStorage.setItem('token', response.data.data.token);

            setError(null);

            window.location.href = '/';
        } catch (error) {
            setError(error.response.data.errors.username[0]);
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
                        placeholder="First Name"
                        value={first_name}
                        onChange={(e) => handleFirstName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        value={last_name}
                        onChange={(e) => handleLastName(e.target.value)}
                        required
                    />
                </Form.Group>
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
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => handleEmail(e.target.value)}
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
                    title="Signup"
                    isSecondary={true}
                    needIcon={false}
                    extraPadding={true}
                    type="submit"
                />
            </Form>
        </Container>
    );
};

export default SignupFormComponent;
