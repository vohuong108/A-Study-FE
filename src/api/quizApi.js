import axios from 'axios';
import { getToken } from '../utils/localStorageHandler';

const QUIZ_BASE_URL = `${process.env.REACT_APP_API_URL}/quiz`

const quizApi = {
    doQuiz: async ({ quizId }) => {
        const url = `${QUIZ_BASE_URL}/${quizId}/do`;
    
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
    scoringQuiz: async ({ quizId, data }) => {
        const url = `${QUIZ_BASE_URL}/${quizId}/scoring`;
    
        let access_token = getToken("access_token");
    
        const response = await axios({
            url: url,
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`
            },
            data: data
        })
    
        return response;
    },
    getOverviewQuizSubmit: async ({ quizId }) => {
        const url = `${QUIZ_BASE_URL}/${quizId}/submits`;
    
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
    getQuizSubmit: async ({ quizId, submitId }) => {
        const url = `${QUIZ_BASE_URL}/${quizId}/review/${submitId}`;
    
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
}

export default quizApi;