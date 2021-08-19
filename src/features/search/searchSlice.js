import { createSlice } from "@reduxjs/toolkit"
import { searchCourse, enrollCourse, getSearchedCourseInfo } from './searchAction'

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        data: null,
        loading: false,
        error: null,
        courseInfo: null,
    },
    reducers: {
        
    },
    extraReducers: {
        [searchCourse.pending]: (state) => {
            state.loading = true;
        },
        [searchCourse.rejected]: (state, action) => {
            state.error = action.error;
            state.data = null;
            state.loading = false;
        },
        [searchCourse.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        [enrollCourse.pending]: (state) => {
            state.loading = true;
        },
        [enrollCourse.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [enrollCourse.fulfilled]: (state, action) => {
            state.loading = false;
            state.courseInfo = action.payload;
        },
        [getSearchedCourseInfo.pending]: (state) => {
            state.loading = true;
        },
        [getSearchedCourseInfo.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
            state.courseInfo = null;
        },
        [getSearchedCourseInfo.fulfilled]: (state, action) => {
            state.loading = false;
            state.courseInfo = action.payload;
        },
    }
});


export default searchSlice.reducer;