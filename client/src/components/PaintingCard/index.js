import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import './styles.css';
import TextTruncate from 'react-text-truncate';
import RaisedButton from '../RaisedButton';
import FlatButton from '../FlatButton';
import axios from 'axios';
import tokenConfig from '../../config/tokenConfig';
import { SERVER_URL } from '../../utils/constrants';

const PaintingCard = ({
    painting,
    showDescription = false,
    disableClick = false,
}) => {
    const [uploadedDate, setUploadedDate] = useState('');
    const [ownerName, setOwnerName] = useState(null);
    const [error, setError] = useState(null);

    const getOwner = async () => {
        try {
            const response = await axios.get(`/api/users/${painting.owner}`);
            setOwnerName(response.data.data.username);
        } catch (error) {
            setError(error.response.data.details);
        }
    };

    const retriveDate = () => {
        const datetimestamp = new Date(painting.createdAt);
        // console.log(datetimestamp.);
        const day = datetimestamp.getDate();
        const month = datetimestamp.getMonth();
        const year = datetimestamp.getFullYear();

        setUploadedDate(`${day}/${month}/${year}`);
    };

    useEffect(() => {
        retriveDate();
        getOwner();
    }, []);

    const handleCardClick = () => {
        // console.log(painting);
        window.location.href = `/paintings/${painting.id}`;
    };

    return (
        <Card onClick={!disableClick ? handleCardClick : null}>
            <div className="imgContainer">
                <Card.Img
                    variant="top"
                    src={`${SERVER_URL}${painting.image}`}
                />
                <div className="price">
                    <p>₹{painting.price}</p>
                </div>
            </div>
            <Card.Body>
                <div>
                    <p>{uploadedDate}</p>
                    <h4 className="heading">
                        <TextTruncate
                            line={1}
                            element="span"
                            truncateText="…"
                            text={painting.title}
                        />
                    </h4>

                    {ownerName !== null && error === null ? (
                        <p>By {ownerName}</p>
                    ) : error !== null ? (
                        <p>By Unknown</p>
                    ) : null}

                    {showDescription ? (
                        <p className="mt-3 description">
                            {painting.description}
                        </p>
                    ) : null}
                </div>
            </Card.Body>
        </Card>
    );
};

export default PaintingCard;
