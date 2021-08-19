import axios from 'axios'
import qs from 'query-string'

const baseUrl = 'https://61108d28c848c900171b3b61.mockapi.io'
const baseUrl2 = 'https://6113c916cba40600170c1c34.mockapi.io'
const baseUrl3 = 'https://6118c1939bcfb400171688a9.mockapi.io'
const baseUrl4 = 'https://611cd13f7d273a0017e2f42e.mockapi.io'

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
    addCourse: async (requestData) => {
        const url = `${baseUrl}/courses`
        const response = await axios({
            url: url,
            method: 'post',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`,
                "Content-Type": "application/json"
            },
            data: requestData.data
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
        return response.data;
    }, 
    submitExamineResults: async (requestData) => {
        const url = `${baseUrl3}/examine`;
        const response = await axios({
            url: url,
            method: 'post',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`,
                "Content-Type": "application/json"
            },
            data: requestData.data
        })
        return response.data;
    },
    searchCourse: async (requestData) => {
        const url = `${baseUrl3}/search`;
        const response = await axios({
            url: url,
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            },
            params: requestData.params,
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        })
        return response.data;
    },
    getCategory: async () => {
        const url = `${baseUrl3}/category`;
        const response = await axios({
            url: url,
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            },
        })
        return response.data;
    },
    changeInformation: async (requestData) => {
        const url = `${baseUrl3}/changeInfo`;
        const response = await axios({
            url: url,
            method: 'post',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`,
                "Content-Type": "application/json"
            },
            data: requestData.data
        })
        return response.data;
    },
    changePassword: async (requestData) => {
        const url = `${baseUrl3}/changeInfo`;
        const response = await axios({
            url: url,
            method: 'post',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`,
                "Content-Type": "application/json"
            },
            data: requestData.data
        })
        return response.data;
    },
    getSearchedCourseInfo: async (requestData) => {
        const url = `${baseUrl4}/searchedCourse/${requestData.idCourse}`;
        const response = await axios({
            url: url,
            method: 'get',
            headers: {
                "Authorization": `Bearer ${requestData?.access_token}`,
                "Content-Type": "application/json"
            }
        })
        return response.data;
    },
    enrollCourse: async (requestData) => {
        const url = `${baseUrl4}/searchedCourse/${requestData.idCourse}`;
        const response = await axios({
            url: url,
            method: 'put',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`,
                "Content-Type": "application/json"
            },
            data: requestData.data
        })
        return response.data;
    },
}

export default userApi;