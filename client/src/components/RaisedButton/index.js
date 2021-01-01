import {
    faArrowRight,
    faCaretRight,
    faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';

const RaisedButton = ({
    title,
    href,
    isSecondary,
    type,
    needIcon = true,
    extraPadding = false,
}) => {
    return (
        <div>
            <Button
                className={`raisedBtn ${isSecondary ? 'secondary' : ''}`}
                href={href}
                type={type}
                style={
                    extraPadding
                        ? { paddingLeft: '60px', paddingRight: '60px' }
                        : { paddingLeft: '28px', paddingRight: '28px' }
                }
            >
                {title}
                {needIcon ? (
                    <FontAwesomeIcon
                        icon={faLongArrowAltRight}
                        className="ml-2"
                    />
                ) : null}
            </Button>
        </div>
    );
};

export default RaisedButton;
