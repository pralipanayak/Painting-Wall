import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import JumbotronComponent from '../../components/Jumbotron';
import PaintingsComponent from '../../components/Paintings';
import tokenConfig from '../../config/tokenConfig';

const MyWallPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [uid, setUid] = useState(null);

    const checkUser = async () => {
        try {
            const response = await axios.get('/api/auth/user', tokenConfig());
            // console.log(response.data.data.user.id);
            setUid(response.data.data.user.id);
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
                            title="Let's World know your skills"
                            subtitle="When you want to make the main color pure and bright, don’t just keep adding bright colors on it. Just make the colors around the spot darker and dull. It will give the scene dramatical effects. I think the life is the same."
                        />

                        <PaintingsComponent uid={uid} />
                    </div>
                )
            ) : null}
        </div>
    );
};

export default MyWallPage;
