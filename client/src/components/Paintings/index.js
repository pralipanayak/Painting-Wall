import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, CardColumns } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import BG3 from '../../assets/bg3.jpg';
import tokenConfig from '../../config/tokenConfig';
import PaintingCard from '../PaintingCard';
import Loader from '../Loader';

const PaintingsComponent = ({ uid }) => {
    const [allPaintings, setAllPaintings] = useState(null);
    const [error, setError] = useState(null);

    const getPaintings = async () => {
        try {
            let response = null;
            if (uid) {
                response = await axios.get(
                    `/api/paintings/?user=${uid}`,
                    tokenConfig()
                );
            } else {
                response = await axios.get('/api/paintings/');
            }

            setAllPaintings(response.data.data.paintings);
        } catch (error) {
            setError(error.response.data.details);
        }
    };

    useEffect(() => {
        getPaintings();
    }, []);

    return (
        <Container>
            {allPaintings !== null ? (
                <Row>
                    {allPaintings.length > 0 ? (
                        allPaintings.map((painting, i) => (
                            <Col md={4} key={i}>
                                <PaintingCard painting={painting} />
                            </Col>
                        ))
                    ) : (
                        <h4>No paintings available</h4>
                    )}
                </Row>
            ) : error !== null ? (
                <h4>{error}</h4>
            ) : (
                <Loader />
            )}
        </Container>
    );
};

export default PaintingsComponent;
