import axios from 'axios'
import qs from 'query-string'

const baseUrl = 'https://61108d28c848c900171b3b61.mockapi.io'
const baseUrl2 = 'https://6113c916cba40600170c1c34.mockapi.io'
const baseUrl3 = 'https://6118c1939bcfb400171688a9.mockapi.io'
const baseUrl4 = 'https://611cd13f7d273a0017e2f42e.mockapi.io'
const final_base = "http://localhost:8888/api"

const userApi = {
    userLogin: async (data) => {
        const url = `${final_base}/login`
        const response = await axios.post(url, data);
        return response.data;
    },
    userRegisting: async (data) => {
        // const url = `${baseUrl}/register`
        const url = `${final_base}/signup`
        const response = await axios.post(url, data);
        return response.data;
    },
    getUser: async (access_token) => {
        const url = `${final_base}/user/profile`
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        return response.data;
    },
    getCourses: async (access_token) => {
        const url = `${final_base}/courses`
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });

        return response.data;
    },
    getCourseByID: async (requestData) => {
        const url = `${final_base}/course/${requestData.courseId}`
        console.log("res in get course by id: ", requestData);
        const response = await axios({
            url: url,
            method: 'get',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`
            }
        });
        console.log("res in get edit course", response);
        return response.data;
    },
    addCourse: async (requestData) => {
        const url = `${final_base}/course/createcourse`
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
        const url = `${final_base}/course/delete/${requestData.courseId}`
        console.log("request delete course: ", requestData);
        const response = await axios({
            url: url,
            method: "delete",
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`
            }
        })
        console.log("response delete course: ", response);
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
        const url = `${final_base}/user/changeinfo`;
        const response = await axios({
            url: url,
            method: 'post',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`,
                "Content-Type": "application/json"
            },
            data: requestData.data
        })

        console.log("res in api change info", response)
        return response.data;
    },
    changePassword: async (requestData) => {
        const url = `${final_base}/user/resetpass`;

        console.log("reset pass data", requestData);

        const response = await axios({
            url: url,
            method: 'post',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`,
                "Content-Type": "application/json"
            },
            data: requestData.data
        })

        console.log("res in reset pass", response);
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
    addWeek: async (requestData) => {
        const url = `${final_base}/week/createweek`;
        console.log("request in create week: ", requestData);
        const response = await axios({
            url: url,
            method: 'post',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`,
                "Content-Type": "application/json"
            },
            data: requestData.data
        })
        console.log("response in create week: ", response);
        return response.data;
    },
    renameWeek: async (requestData) => {
        const url = `${final_base}/week/rename`;
        console.log("request rename week: ", requestData);
        const response = await axios({
            url: url,
            method: 'put',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`,
                "Content-Type": "application/json"
            },
            data: requestData.data
        })
        console.log("res in rename week", response);
        return response.data;
    },
    addLecture: async (requestData) => {
        const url = `${final_base}/week/createlecture`;
        console.log("request create lecture", requestData);

        let formData = new FormData();
        formData.append("file", requestData.data.content);
        formData.append("weekId", requestData.data.weekId);
        formData.append("indexLecture", requestData.data.indexLecture);
        formData.append("title", requestData.data.title);
        formData.append("lectureType", requestData.data.lectureType);
        formData.append("lectureStatus", requestData.data.lectureStatus);

        const response = await axios({
            url: url,
            method: 'post',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`,
                "Content-Type": 'multipart/form-data'
            },
            data: formData
        })
        console.log("response in create lecture", response);
        return response.data;
    },
    addQuiz: async (requestData) => {
        const url = `${final_base}/week/createquiz`;
        console.log("request create quiz", requestData.data);

        const response = await axios({
            url: url,
            method: 'post',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`,
                "Content-Type": "application/json"
            },
            data: requestData.data
        })
        console.log("res in create quiz", response);
        return response.data;
    },
    updateLecture: async (requestData) => {
        const url = `${final_base}/week/updatelecture`;
        console.log("request update lecture", requestData.data);
        let formData = new FormData();
        formData.append("file", requestData.data.content);
        formData.append("title", requestData.data.title);
        formData.append("lectureStatus", requestData.data.lectureStatus);
        formData.append("lectureId", requestData.data.lectureId);
        formData.append("weekId", requestData.data.weekId);

        const response = await axios({
            url: url,
            method: 'put',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`,
                "Content-Type": "application/json"
            },
            data: formData
        })
        console.log("response update lecture", response);
        return response.data;
    },
    updateQuiz: async (requestData) => {
        const url = `${final_base}/week/updatequiz`;
        console.log("request update quiz", requestData.data);

        const response = await axios({
            url: url,
            method: 'put',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`,
                "Content-Type": "application/json"
            },
            data: requestData.data
        })
        console.log("res in update quiz", response);
        return response.data;
    },
    deleteLecture: async (requestData) => {
        const url = `${final_base}/week/${requestData.weekId}/lecture/${requestData.lectureType.toLowerCase()}/${requestData.lectureId}`;
        console.log("request delete lecture", requestData);

        const response = await axios({
            url: url,
            method: 'delete',
            headers: {
                "Authorization": `Bearer ${requestData.access_token}`,
                "Content-Type": "application/json"
            }
        })
        console.log("res in delete lecture", response);
        return response.data;
    },
}

export default userApi;