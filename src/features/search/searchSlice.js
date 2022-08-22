import { createSlice } from "@reduxjs/toolkit"
import { searchCourse, enrollCourse, getCourseInfo } from './searchAction'

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchData: null,
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
            state.searchData = null;
            state.loading = false;
        },
        [searchCourse.fulfilled]: (state, action) => {
            state.loading = false;
            state.searchData = action.payload;
        },
        [enrollCourse.pending]: (state) => {
            state.loading = true;
        },
        [enrollCourse.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
            state.courseInfo.isAccess = false;
        },
        [enrollCourse.fulfilled]: (state, action) => {
            state.loading = false;
            state.courseInfo.isAccess = true;
        },
        [getCourseInfo.pending]: (state) => {
            state.loading = true;
        },
        [getCourseInfo.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
            state.courseInfo = null;
        },
        [getCourseInfo.fulfilled]: (state, action) => {
            state.loading = false;
            state.courseInfo = action.payload;
        },
    }
});


export default searchSlice.reducer;