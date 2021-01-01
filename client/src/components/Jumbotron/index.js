import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Jumbotron, Row } from 'react-bootstrap';
import RaisedButton from '../RaisedButton';
import './styles.css';
import tokenConfig from '../../config/tokenConfig';

const JumbotronComponent = ({ title, subtitle, isSmall, noActionButton }) => {
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
        <Jumbotron
            id="jumbotron"
            style={isSmall ? { height: '250px' } : { height: '600px' }}
        >
            <Container>
                <div>
                    <h1 className="heading">{title}</h1>

                    {subtitle ? (
                        <p className="paragraph mt-2">{subtitle}</p>
                    ) : null}

                    {!noActionButton ? (
                        <div>
                            {isAuthenticated !== null ? (
                                isAuthenticated ? (
                                    <div className="mt-4">
                                        <RaisedButton
                                            title="Upload Paintings"
                                            href="/upload"
                                        />
                                    </div>
                                ) : (
                                    <div className="mt-4">
                                        <RaisedButton
                                            title="Share your Paintings"
                                            href="/signup"
                                        />
                                    </div>
                                )
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </Container>
        </Jumbotron>
    );
};

export default JumbotronComponent;
