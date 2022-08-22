import quizApi from '../../api/quizApi';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOverviewQuizSubmit = createAsyncThunk(
    'submit/getOverviewQuizSubmit',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await quizApi.getOverviewQuizSubmit(arg);
            console.log("[getOverviewQuizSubmit action] ", response);

            return response.data;

        } catch (err) {
            console.log("[Error getOverviewQuizSubmit action] ", err.response);
            return rejectWithValue(err.response.data);
        }
    }
);

export const getQuizSubmit = createAsyncThunk(
    'submit/getQuizSubmit',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await quizApi.getQuizSubmit(arg);
            console.log("[getQuizSubmit action] ", response);

            return response.data;

        } catch (err) {
            console.log("[Error getQuizSubmit action] ", err.response);
            return rejectWithValue(err.response.data);
        }
    }
);