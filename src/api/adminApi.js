import axios from 'axios';
import qs from 'query-string';
import { getToken } from '../utils/localStorageHandler';

const ADMIN_BASE_URL = `${process.env.REACT_APP_API_URL}/admin`

const adminApi = {
    getAllUser: async ({ params }) => {
        const url = `${ADMIN_BASE_URL}/users`;
        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            params: params,
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        });

        return response;
    },
    getAllCourse: async ({ params }) => {
        const url = `${ADMIN_BASE_URL}/courses`;
        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            params: params,
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        });

        return response;
    },
    changeStatusOfUser: async (data) => {
        const url = `${ADMIN_BASE_URL}/user/changestatus`;
        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            data: data
        });

        return response;
    },
    changeRoleOfUser: async (data) => {
        const url = `${ADMIN_BASE_URL}/user/changerole`;
        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            data: data
        });

        return response;
    },
    deleteCourse: async ({ courseId }) => {
        const url = `${ADMIN_BASE_URL}/course/${courseId}/delete`;
        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        });

        return response;
    },
}

export default adminApi;