import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loader from './components/Loader';

const Root = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const checkUser = async () => {
        try {
            await axios.get('/api/auth/user');
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <div>
            {isAuthenticated !== null ? (
                isAuthenticated ? (
                    <Redirect to="/paintings" />
                ) : (
                    <Redirect to="/login" />
                )
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default Root;
