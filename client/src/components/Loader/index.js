import React from 'react';
import { Spinner } from 'react-bootstrap';
import './styles.css';

const Loader = () => {
    return (
        <div id="loader">
            <Spinner animation="border" role="status" variant="warning">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loader;
