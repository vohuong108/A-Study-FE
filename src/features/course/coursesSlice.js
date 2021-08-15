import { createSlice } from "@reduxjs/toolkit"
import { getCourses, deleteCourseByID } from './coursesAction'

const coursesSlice = createSlice({
    name: 'userCourses',
    initialState: {
        courses: null,
        loading: false,
        loadingDel: false,
        error: null
    },
    reducers: {
        
    },
    extraReducers: {
        [getCourses.pending]: (state) => {
            state.loading = true;
        },
        [getCourses.rejected]: (state, action) => {
            state.error = action.error;
        },
        [getCourses.fulfilled]: (state, action) => {
            state.loading = false;
            state.courses = action.payload.data;
        },
        [deleteCourseByID.pending]: (state) => {
            state.loadingDel = true;
            state.error = null;
        },
        [deleteCourseByID.rejected]: (state, action) => {
            state.error = action.error;
            state.loadingDel = false;
        },
        [deleteCourseByID.fulfilled]: (state, action) => {
            state.loadingDel = false;
            state.courses = action.payload.data;
        }
        
    }
});


export const selectCourses = (stateStore) => stateStore.userCourses.courses;

export default coursesSlice.reducer;