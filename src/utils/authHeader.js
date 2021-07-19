import axios from 'axios';

export default authHeader = (token = null) => {
    if (token) {
        axios.defaults.headers.common.authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common.authorization;
    }
};