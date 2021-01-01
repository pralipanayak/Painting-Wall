import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import JumbotronComponent from '../../components/Jumbotron';
import SignupFormComponent from '../../components/SignupForm';
import tokenConfig from '../../config/tokenConfig';

const SignupPage = () => {
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
        <div>
            {isAuthenticated !== null ? (
                isAuthenticated ? (
                    <Redirect />
                ) : (
                    <div>
                        <JumbotronComponent
                            title="You are an amazing painter."
                            isSmall
                            noActionButton={true}
                        />

                        <SignupFormComponent />
                    </div>
                )
            ) : null}
        </div>
    );
};

export default SignupPage;
