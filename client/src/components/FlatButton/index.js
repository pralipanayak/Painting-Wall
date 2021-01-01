import React from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';

const FlatButton = ({ title, href }) => {
    return <Button className="flatBtn">{title}</Button>;
};

export default FlatButton;
