import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import JumbotronComponent from '../../components/Jumbotron';
import { useParams } from 'react-router';
import PaintingComponent from '../../components/Painting';
import axios from 'axios';
import tokenConfig from '../../config/tokenConfig';
import Loader from '../../components/Loader';
import RequestFormComponent from '../../components/RequestForm';

const PaintingPage = () => {
    const [painting, setPainting] = useState(null);
    const [error, setError] = useState(null);

    let { painting_id } = useParams();

    const getPainting = async () => {
        try {
            const response = await axios.get(
                `/api/paintings/${painting_id}`
            );

            setPainting(response.data.data);
        } catch (error) {
            alert(
                error.response.data.details
                    ? error.response.data.details
                    : error.response.data.errors
            );
            setError(
                error.response.data.details
                    ? error.response.data.details
                    : error.response.data.errors
            );
            window.location.href = '/';
        }
    };

    useEffect(() => {
        getPainting();
    }, []);

    return (
        <Container className="mt-112">
            {painting !== null ? (
                <Row>
                    <Col md="7">
                        <div>
                            <PaintingComponent painting={painting} />
                        </div>
                    </Col>
                    <Col md="5">
                        <RequestFormComponent paintingId={painting.id} />
                    </Col>
                </Row>
            ) : (
                <Loader />
            )}
        </Container>
    );
};

export default PaintingPage;
