import axios from 'axios';
const COMMON_BASE_URL = `${process.env.REACT_APP_API_URL}/common`

const commonApi = {
    getCategory: async () => {
        const url = `${COMMON_BASE_URL}/categories`;
        
        let headers = {"Content-Type": "application/json"}
      
        let result = await axios(url, {
            method : "GET",
            mode: 'cors',
            headers: headers
        })

        return result.data.data;
    },
}

export default commonApi;