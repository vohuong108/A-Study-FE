import axios from 'axios';
import { getToken } from '../utils/localStorageHandler';

const AUTH_BASE_URL = `${process.env.REACT_APP_API_URL}/auth`


const authApi = {
    loginApi: async (data) => {
        const url = `${AUTH_BASE_URL}/login`
        const response = await axios.post(url, data);
        console.log("Response loginApi: ", response);
        
        return response.data.data;
    },
    signUpApi: async (data) => {
        const url = `${AUTH_BASE_URL}/signup`
        const response = await axios.post(url, data);
        return response;
    },
    refreshAccessToken: async () => {
        const url = `${AUTH_BASE_URL}/token/refresh`;
        let access_token = getToken("refresh_token");
        
        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        return response;
    }
}

export default authApi;