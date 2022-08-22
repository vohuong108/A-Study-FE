import { createSlice } from "@reduxjs/toolkit";
import { getCategory } from './commonAction';

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        category: null,
        loadingCategory: false,
        loading: false
    },
    extraReducers: {
        [getCategory.pending]: (state) => {
            state.loadingCategory = true;
        },
        [getCategory.rejected]: (state, action) => {
            state.error = action.error;
            state.loadingCategory = false;
        },
        [getCategory.fulfilled]: (state, action) => {
            state.loadingCategory = false;
            state.category = action.payload;
        }
    }
});

export default commonSlice.reducer;