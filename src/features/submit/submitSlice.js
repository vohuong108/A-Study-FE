import { createSlice } from "@reduxjs/toolkit";
import { getOverviewQuizSubmit, getQuizSubmit } from './submitAction';

const submitSlice = createSlice({
    name: 'submit',
    initialState: {
        overviewSubmit: null,
        loading: false,
        error: null,
        quizSubmit: null,
        submitNav: null,
    },
    reducers: {
    },
    extraReducers: {
        [getOverviewQuizSubmit.pending]: (state) => {
            state.loading = true;
        },
        [getOverviewQuizSubmit.rejected]: (state, action) => {
            state.error = action.error;
            state.overviewSubmit = null;
            state.loading = false;
        },
        [getOverviewQuizSubmit.fulfilled]: (state, action) => {
            state.loading = false;
            state.overviewSubmit = action.payload;
        },

        [getQuizSubmit.pending]: (state) => {
            state.loading = true;
        },
        [getQuizSubmit.rejected]: (state, action) => {
            state.error = action.error;
            state.quizSubmit = null;
            state.submitNav = null;
            state.loading = false;
        },
        [getQuizSubmit.fulfilled]: (state, action) => {
            state.loading = false;
            state.quizSubmit = action.payload;

            state.submitNav = state.quizSubmit.questions.reduce((acc, question) => {
                let count = question.options.reduce((acc_count, curV) => {
                    if(curV.isSelect === true) acc_count += 1;
                    return acc_count;
                }, 0);

                acc[question.questionOrder] = (count > 0);
                return acc;
            }, {});
        },
    }
});


export default submitSlice.reducer;