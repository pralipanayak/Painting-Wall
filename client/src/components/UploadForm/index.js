import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Alert, Container, Form } from 'react-bootstrap';
import RaisedButton from '../RaisedButton';
import tokenConfig from '../../config/tokenConfig';
import './styles.css';

const UploadFormComponent = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);

    const [error, setError] = useState(null);

    const handleTitle = (value) => {
        setTitle(value);
    };

    const handleDescription = (value) => {
        setDescription(value);
    };

    const handlePrice = (value) => {
        setPrice(value);
    };

    const handleImage = (value) => {
        setImage(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // axios
        try {
            let formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('image', image, image.name);

            await axios.post('/api/paintings/', formData, tokenConfig());

            alert('Your painting has been uploaded successfully.');

            setError(null);

            window.location.reload();
        } catch (error) {
            console.log(error.response.data);
            setError(
                error.response.data.detail
                    ? error.response.data.detail
                    : error.response.data.errors.image
                    ? error.response.data.errors.image[0]
                    : error.response.data.errors.price
                    ? error.response.data.errors.price[0]
                    : ''
            );
        }
    };

    return (
        <Container className="formComponent">
            <Form onSubmit={handleSubmit}>
                {error !== null ? (
                    <Alert variant="danger">{error}</Alert>
                ) : null}
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => handleTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => handleDescription(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => handlePrice(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    
                    <Form.File
                        name="upload"
                        id="upload"
                        placeholder="Upload your painting"
                        accept="image/png, image/jpeg"
                        onChange={(e) => handleImage(e.target.files[0])}
                        required
                    />
                </Form.Group>

                <RaisedButton
                    title="Upload"
                    isSecondary={true}
                    needIcon={false}
                    extraPadding={true}
                    type="submit"
                />
            </Form>
        </Container>
    );
};

export default UploadFormComponent;
