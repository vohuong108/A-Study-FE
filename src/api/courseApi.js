import axios from 'axios';
import qs from 'query-string';
import { getToken } from '../utils/localStorageHandler';

const COURSE_BASE_URL = `${process.env.REACT_APP_API_URL}/course`;
const SEARCH_BASE_URL = `${process.env.REACT_APP_API_URL}/search`;

const courseApi = {
    getAllCourseOfUser: async () => {
        const url = `${COURSE_BASE_URL}/user/courses`;
        const access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });

        return response;
    },
    saveCourse: async (requestData) => {
        const url = `${COURSE_BASE_URL}/save`;
        const access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            data: requestData
        });

        return response;
    },
    getCourseByID: async (requestData) => {
        const url = `${COURSE_BASE_URL}/${requestData.courseId}`;
        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        return response;
    },
    createWeek: async (requestData) => {
        const url = `${COURSE_BASE_URL}/${requestData.courseId}/week/save`;
        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            data: requestData.data
        })

        return response;
    },
    deleteCourseByID: async ({courseId}) => {
        const url = `${COURSE_BASE_URL}/${courseId}/delete`;
        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })

        return response;
    },
    renameWeek: async (requestData) => {
        const url = `${COURSE_BASE_URL}/${requestData.courseId}/week/${requestData.weekId}/rename`;
        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            data: { name: requestData.name }
        })

        return response;
    },
    createLectureContent: async (requestData) => {
        const url =
            `${COURSE_BASE_URL}/${requestData.courseId}`
            + `/week/${requestData.weekId}`
            + `/lecture/save`;

        let access_token = getToken("access_token");

        let formData = new FormData();
        formData.append("file", requestData.content);
        formData.append("name", requestData.name);
        formData.append("contentOrder", requestData.contentOrder);
        formData.append("contentType", requestData.contentType);
        formData.append("contentStatus", requestData.contentStatus);

        const response = await axios({
            url: url,
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": 'multipart/form-data'
            },
            data: formData
        })

        return response;
    },
    deleteWeekContent: async ({ courseId, weekId, contentId }) => {
        const url = `${COURSE_BASE_URL}/${courseId}/week/${weekId}/content/${contentId}/delete`;

        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })

        return response;
    },
    updateLectureContent: async (requestData) => {
        const url =
            `${COURSE_BASE_URL}/${requestData.courseId}`
            + `/week/${requestData.weekId}`
            + `/lecture/${requestData.contentId}/update`;

        let access_token = getToken("access_token");

        let formData = new FormData();

        if (requestData.content) {
            formData.append("file", requestData.content);
        }

        formData.append("name", requestData.name);
        formData.append("contentOrder", requestData.contentOrder);
        formData.append("contentType", requestData.contentType);
        formData.append("contentStatus", requestData.contentStatus);

        const response = await axios({
            url: url,
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "multipart/form-data"
            },
            data: formData
        })

        return response;
    },
    getLectureContentUrl: async ({ courseId, weekId, contentId }) => {
        const url = `${COURSE_BASE_URL}/${courseId}/week/${weekId}/lecture/${contentId}`;

        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })

        return response;
    },

    createQuizContent: async ({courseId, weekId, data}) => {
        const url =
            `${COURSE_BASE_URL}/${courseId}`
            + `/week/${weekId}`
            + `/quiz/save`;

        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": 'application/json'
            },
            data: data
        })

        return response;
    },
    getQuizContentEdit: async ({courseId, weekId, quizId}) => {
        const url =
            `${COURSE_BASE_URL}/${courseId}`
            + `/week/${weekId}`
            + `/quiz/${quizId}`;

        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })

        return response;
    },
    getQuizOverview: async ({courseId, weekId, quizId}) => {
        const url =
            `${COURSE_BASE_URL}/${courseId}`
            + `/week/${weekId}`
            + `/quiz/${quizId}/overview`;

        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })

        return response;
    },
    updateQuizContent: async (requestData) => {
        const url =
            `${COURSE_BASE_URL}/${requestData.courseId}`
            + `/week/${requestData.weekId}`
            + `/quiz/${requestData.quizId}/update`;

        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            data: requestData.data
        })

        return response;
    },


    getCourseInfo: async ({ courseId }) => {
        const url = `${SEARCH_BASE_URL}/course/${courseId}`;

        let access_token = getToken("access_token");

        let headers = access_token ? {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json"
        } : {
            "Content-Type": "application/json"
        }

        const response = await axios({
            url: url,
            method: "GET",
            headers: headers
        })

        return response;
    },
    enrollCourse: async ({ courseId }) => {
        const url = `${COURSE_BASE_URL}/${courseId}/enroll`;
        let access_token = getToken("access_token");

        const response = await axios({
            url: url,
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        })

        return response;
    },
    searchCourse: async ({ params }) => {
        const url = `${SEARCH_BASE_URL}`;

        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            params: params,
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        });

        return response;
    },
}

export default courseApi;