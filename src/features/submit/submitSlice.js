import { createSlice } from "@reduxjs/toolkit"
import { getSubmitByID } from './submitAction'

const submitSlice = createSlice({
    name: 'submit',
    initialState: {
        quiz: null,
        loading: false,
        error: null,
        submitNav: null,
    },
    reducers: {
        buildSubmitNav: (state, action) => {
            let idSub = action.payload.idSub;
            let submmission = state?.quiz?.submissions.find(sub => sub.idSub == idSub);

            state.submitNav = submmission?.content.reduce((acc, question) => {
                let index = question.choices.findIndex(choice => choice.answer);
                if(index > -1) acc[question.idQuestion] = true;
                else acc[question.idQuestion] = false;
                return acc;
            }, {});
        }
    },
    extraReducers: {
        [getSubmitByID.pending]: (state) => {
            state.loading = true;
        },
        [getSubmitByID.rejected]: (state, action) => {
            state.error = action.error;
            state.quiz = null;
            state.loading = false;
        },
        [getSubmitByID.fulfilled]: (state, action) => {
            state.loading = false;
            state.quiz = action.payload;
        },
    }
});

export const { buildSubmitNav } = submitSlice.actions;
export const selectSub = (stateStore, idSub) => stateStore.submit?.quiz?.submissions.find(sub => sub.idSub == idSub);

export default submitSlice.reducer;