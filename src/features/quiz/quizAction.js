import quizApi from "../../api/quizApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const doQuiz = createAsyncThunk(
    'quiz/doQuiz',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await quizApi.doQuiz(arg);
            console.log("[doQuiz action] ", response);

            return response.data;

        } catch (err) {
            console.log("[Error doQuiz action] ", err.response);
            return rejectWithValue(err.response.data);
        }
    }
);

export const scoringQuiz = createAsyncThunk(
    'quiz/scoringQuiz',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await quizApi.scoringQuiz(arg);
            console.log("[scoringQuiz action] ", response);

            return response.data;

        } catch (err) {
            console.log("[Error scoringQuiz action] ", err.response);
            return rejectWithValue(err.response.data);
        }
    }
);