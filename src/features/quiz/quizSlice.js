import { createSlice } from "@reduxjs/toolkit"
import { getQuizByID, submitExamineResults } from './quizAction'

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        quiz: null,
        loading: false,
        error: null,
        quizNav: null,
        startTime: null,
    },
    reducers: {
        marked: (state, action) => {
            let idQuestion = action.payload.idQuestion;
            state.quizNav[idQuestion] = true;
        },
        buildNav: (state) => {
            state.quizNav = state?.quiz?.content.reduce((acc, question) => {
                acc[question.idQuestion] = false;
                return acc;
            }, {});
            
        },
        buildStartTime: (state) => {
            state.startTime = (new Date()).toISOString();
        }
    },
    extraReducers: {
        [getQuizByID.pending]: (state) => {
            state.loading = true;
        },
        [getQuizByID.rejected]: (state, action) => {
            state.error = action.error;
            state.quiz = null;
            state.quizNav = null
            state.loading = false;
            
        },
        [getQuizByID.fulfilled]: (state, action) => {
            state.loading = false;
            state.quiz = action.payload;
            
        },
        [submitExamineResults.pending]: (state) => {
            state.loading = true;
        },
        [submitExamineResults.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [submitExamineResults.fulfilled]: (state, action) => {
            state.loading = false;
        },
    }
});

export const { marked, buildNav, buildStartTime } = quizSlice.actions;

export default quizSlice.reducer;