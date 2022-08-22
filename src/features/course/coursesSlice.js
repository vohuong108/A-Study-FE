import { createSlice } from "@reduxjs/toolkit";
import { getAllCourseOfUser, saveCourse } from './coursesAction';

const coursesSlice = createSlice({
    name: 'userCourses',
    initialState: {
        courses: null,
        loading: false,
        loadingDel: false,
        loadingSave: false,
        error: null
    },
    reducers: {
        
    },
    extraReducers: {
        [getAllCourseOfUser.pending]: (state) => {
            state.loading = true;
        },
        [getAllCourseOfUser.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [getAllCourseOfUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.courses = action.payload;
        },
        [saveCourse.pending]: (state) => {
            state.loadingSave = true;
            state.error = null;
        },
        [saveCourse.rejected]: (state, action) => {
            state.error = action.error;
            state.loadingSave = false;
        },
        [saveCourse.fulfilled]: (state, action) => {
            state.loadingSave = false;
            state.courses.push(action.payload);
        },



        // [deleteCourseByID.pending]: (state) => {
        //     state.loadingDel = true;
        //     state.error = null;
        // },
        // [deleteCourseByID.rejected]: (state, action) => {
        //     state.error = action.error;
        //     state.loadingDel = false;
        // },
        // [deleteCourseByID.fulfilled]: (state, action) => {
        //     if(state?.courses?.length > 0) {
        //         state.courses = state?.courses?.filter(c => c.courseId != action.payload.courseId);
        //     }
            
        //     state.loadingDel = false;
        // },
        
        
    }
});


export const selectCourses = (stateStore) => stateStore.userCourses.courses;

export default coursesSlice.reducer;