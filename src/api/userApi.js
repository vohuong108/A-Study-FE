import axios from 'axios'
const baseUrl = 'https://583911db0736.ap.ngrok.io'
const userApi = {
    userLogin: async (data) => {
        const url = `${baseUrl}/login`
        // const url = ' http://localhost:3001/user'
        const response = await axios.post(url, data);
        return response.data;
    },
    userRegisting: async (data) => {
        const url = `${baseUrl}/register`
        // const url = ' http://localhost:3001/user'
        const response = await axios.post(url, data);
        return response.data;
    },
    getUser: async (access_token) => {
        const url = `${baseUrl}/profile`
        // const url = ' http://localhost:3001/user'
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        return response.data;
    }
}

export default userApi;