import { createSlice } from "@reduxjs/toolkit"
import { getQuizContent, getQuizById, submitExamineResults } from './quizAction'

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
            let indexQ = action.payload.indexQ;
            state.quizNav[indexQ] = true;
        },
        buildNav: (state) => {
            state.quizNav = state?.quiz?.questions.reduce((acc, _, curIndex) => {
                acc[curIndex] = false;
                return acc;
            }, {});
            
        },
        buildStartTime: (state) => {
            state.startTime = (new Date()).toISOString();
        }
    },
    extraReducers: {
        [getQuizContent.pending]: (state) => {
            state.loading = true;
        },
        [getQuizContent.rejected]: (state, action) => {
            state.error = action.error;
            state.quiz = null;
            state.quizNav = null
            state.loading = false;
            
        },
        [getQuizContent.fulfilled]: (state, action) => {
            state.loading = false;
            state.quiz = action.payload;
            
        },
        [getQuizById.pending]: (state) => {
            state.loading = true;
        },
        [getQuizById.rejected]: (state, action) => {
            state.error = action.error;
            state.quiz = null;
            state.quizNav = null
            state.loading = false;
            
        },
        [getQuizById.fulfilled]: (state, action) => {
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