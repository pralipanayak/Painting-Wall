import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import JumbotronComponent from '../../components/Jumbotron';
import UploadFormComponent from '../../components/UploadForm';
import tokenConfig from '../../config/tokenConfig';

const CreatePostPage = () => {
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
                !isAuthenticated ? (
                    <Redirect to="/login" />
                ) : (
                    <div>
                        <JumbotronComponent
                            title="Let's World see your work"
                            isSmall
                            noActionButton
                        />
                        <UploadFormComponent />
                    </div>
                )
            ) : null}
        </div>
    );
};

export default CreatePostPage;
