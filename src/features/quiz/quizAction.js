import userApi from '../../api/userApi'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const submitExamineResults = createAsyncThunk(
    'quiz/submitExamineResults',
    async (requestData) => {
        const result = await userApi.submitExamineResults(requestData);
        return result;
    }
)

export const getQuizContent = createAsyncThunk(
    'quiz/getQuizContent',
    async (requestData) => {
        const result = await userApi.getQuizContent(requestData);
        return result;
    }
)

export const getQuizById = createAsyncThunk(
    'quiz/getQuizById',
    async (requestData) => {
        const result = await userApi.getQuizById(requestData);
        return result;
    }
)