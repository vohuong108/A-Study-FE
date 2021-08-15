import userApi from '../../api/userApi'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getQuizByID = createAsyncThunk(
    'quiz/getQuizByID',
    async (requestData) => {
        const result = await userApi.getQuizByID(requestData);
        return result;
    }
)

export const submitExamineResults = createAsyncThunk(
    'quiz/submitExamineResults',
    async (requestData) => {
        const result = await userApi.submitExamineResults(requestData);
        return result;
    }
)