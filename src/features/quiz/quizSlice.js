import { createSlice } from "@reduxjs/toolkit";
import { doQuiz, scoringQuiz } from './quizAction';

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        quiz: null,
        loading: false,
        error: null,
        quizNav: null,
        isSubmit: false,
    },
    reducers: {
        marked: (state, action) => {
            state.quizNav[action.payload.indexQ] = action.payload.markType;
        },
    },
    extraReducers: {
        [doQuiz.pending]: (state) => {
            state.loading = true;
        },
        [doQuiz.rejected]: (state, action) => {
            state.error = action.error;
            state.quiz = null;
            state.quizNav = null
            state.loading = false;
            
        },
        [doQuiz.fulfilled]: (state, action) => {
            state.loading = false;
            state.quiz = action.payload;
            state.isSubmit = false;

            state.quizNav = state?.quiz?.questions.reduce((acc, _, curIndex) => {
                acc[curIndex] = false;
                return acc;
            }, {});
            
        },
        [scoringQuiz.pending]: (state) => {
            state.loading = true;
            state.isSubmit = true;
        },
        [scoringQuiz.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
            
        },
        [scoringQuiz.fulfilled]: (state, action) => {
            
        },
    }
});

export const { marked, buildNav, buildStartTime } = quizSlice.actions;

export default quizSlice.reducer;