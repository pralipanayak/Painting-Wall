import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import RaisedButton from '../RaisedButton';
import './styles.css';

const RequestFormComponent = ({ paintingId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [error, setError] = useState(null);

    const handleName = (value) => {
        setName(value);
    };

    const handleEmail = (value) => {
        setEmail(value);
    };

    const handlePhone = (value) => {
        setPhone(value);
    };

    const handleAddess = (value) => {
        setAddress(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataToSubmit = {
                name,
                email,
                phone,
                address,
            };

            await axios.post(`/api/paintings/${paintingId}`, dataToSubmit);

            alert('Your request has been sent to our painter successfully.');

            setError(null);

            window.location.reload();
        } catch (error) {
            console.log(error.response.data);
            alert(
                error.response.data.detail
                    ? error.response.data.detail
                    : 'Something Went Wrong'
            );
            setError(
                error.response.data.detail
                    ? error.response.data.detail
                    : 'Something Went Wrong'
            );
        }
    };

    return (
        <div id="requestForm">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => handleName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => handleEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Your Phone Number"
                        value={phone}
                        onChange={(e) => handlePhone(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Your Address"
                        value={address}
                        onChange={(e) => handleAddess(e.target.value)}
                        required
                    />
                </Form.Group>

                <div className="text-center">
                    <RaisedButton
                        title="request"
                        isSecondary
                        needIcon={false}
                        type="submit"
                    />
                </div>
            </Form>
        </div>
    );
};

export default RequestFormComponent;
