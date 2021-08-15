import axios from 'axios'
const baseUrl = 'https://61108d28c848c900171b3b61.mockapi.io'
const baseUrl2 = 'https://6113c916cba40600170c1c34.mockapi.io'
const baseUrl3 = 'https://6118c1939bcfb400171688a9.mockapi.io/'

const userApi = {
    userLogin: async (data) => {
        const url = `${baseUrl}/login`
        const response = await axios.post(url, data);
        return response.data;
    },
    userRegisting: async (data) => {
        const url = `${baseUrl}/register`
        const response = await axios.post(url, data);
        return response.data;
    },
    getUser: async (access_token) => {
        const url = `${baseUrl}/profile`
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        return response.data;
    },
    getCourses: async (access_token) => {
        const url = `${baseUrl}/courses`
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        return response.data;
    },
    getCourseByID: async (requestData) => {
        const url = `${baseUrl}/course/${requestData.idCourse}`
        // const url = "http://localhost:3001/course/1"
        const response = await axios({
            url: url,
            method: 'get',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`
            }
        });
        
        return response.data;
    },
    putCourse: async (requestData) => {
        const url = `${baseUrl}/course/1`
        // const url = "http://localhost:3001/course/1"

        // const url = `${baseUrl}/course/${requestData.data.idCourse}`
        // let formData = new FormData();
        // formData.append('courseData', requestData.data)

        // const response = await axios({
        //     method: 'put',
        //     url: url,
        //     data: formData,
        //     headers: {
        //         "Authorization": `Bearer ${requestData.access_token}`,
        //         "Content-Type": "multipart/form-data"
        //     }
        // });

        const response = await axios.put(url, requestData.data);
        return response.data;
    },
    getCourseOverview: async (requestData) => {
        const url = `${baseUrl2}/overview/1`;
        const response = await axios({
            url: url,
            method: "get",
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`
            }
        })

        return response.data;
    },
    deleteCourseByID: async (requestData) => {
        const url = `${baseUrl}/courses/${requestData.idCourse}`
        const response = await axios({
            url: url,
            method: "delete",
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`
            }
        })

        return response.data;
    },
    getLearnCourseByID: async (requestData) => {
        const url = `${baseUrl2}/learn/1`;
        const response = await axios({
            url: url,
            method: "get",
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`
            }
        })

        return response.data;
    },
    getSubmitByID: async (requestData) => {
        const url = `${baseUrl2}/submit/1`;
        const response = await axios({
            url: url,
            method: "get",
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`
            }
        })

        return response.data;
    },
    getQuizByID: async (requestData) => {
        const url = `${baseUrl2}/quiz/1`;
        const response = await axios({
            url: url,
            method: "get",
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`
            }
        })
        console.log("res: ", response.data)
        return response.data;
    }, 
    submitExamineResults: async (requestData) => {
        const url = `${baseUrl3}/examine`;
        const response = await axios({
            url: url,
            method: 'post',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`
            },
            data: requestData.data
        })
    } 
}

export default userApi;