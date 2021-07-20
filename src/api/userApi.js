import axios from 'axios'

const userApi = {
    userLogin: async (data) => {
        // const url = 'http://dev.astudy.work:3000/login'
        // const url = ' http://localhost:3001'
        const url = "http://55aebec74b23.ngrok.io/login"
        const response = await axios.post(url, data);
        return response.data;
    },
    userRegisting: async (data) => {
        // const url = 'http://dev.astudy.work:3000/user/register'
        const url = "http://55aebec74b23.ngrok.io/register"
        const response = await axios.post(url, data);
        return response.data;
    },
    getUser: async (access_token) => {
        // const url = `http://dev.astudy.work:3000/profile`
        const url = "http://55aebec74b23.ngrok.io/profile"
        // const url = ' http://localhost:3001'
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        return response.data;
    }
}

export default userApi;