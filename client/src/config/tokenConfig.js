export default () => {
    // Get token from local storage
    const token = localStorage.getItem('token');

    // Headers
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    // if token then add to header
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};
