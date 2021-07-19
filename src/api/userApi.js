import axios from 'axios'

const userApi = {
    getUser: async (requestOptions) => {
        const response = await axios(requestOptions);
        return response.data;
    },
    addUser: async (requestOptions) => {
        const response = await axios(requestOptions);
        return response.data;
    },
}

export default userApi;