import axios from 'axios';
import { getToken } from '../utils/localStorageHandler';

const USER_BASE_URL = `${process.env.REACT_APP_API_URL}/user`

const userApi = {
    getUserProfile: async () => {
        let access_token = getToken("access_token");
        const url = `${USER_BASE_URL}`
        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });

        return response;
    },
    changeInformation: async (requestData) => {
        const url = `${USER_BASE_URL}/changeinfo`;
        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "PUT", 
            data: requestData,
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        });

        return response;
    },
    changePassword: async (requestData) => {
        const url = `${USER_BASE_URL}/changpass`;
        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            data: requestData
        })

        return response;
    }
}

export default userApi;