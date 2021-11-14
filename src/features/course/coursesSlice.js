import { createSlice } from "@reduxjs/toolkit"
import { getCourses, deleteCourseByID, addCourse } from './coursesAction'

const coursesSlice = createSlice({
    name: 'userCourses',
    initialState: {
        courses: null,
        loading: false,
        loadingDel: false,
        loadingAdd: false,
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
            state.loading = false;
        },
        [getCourses.fulfilled]: (state, action) => {
            state.loading = false;
            state.courses = action.payload;
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
            if(state?.courses?.length > 0) {
                state.courses = state?.courses?.filter(c => c.courseId != action.payload.courseId);
            }
            
            state.loadingDel = false;
        },
        [addCourse.pending]: (state) => {
            state.loadingAdd = true;
            state.error = null;
        },
        [addCourse.rejected]: (state, action) => {
            state.error = action.error;
            state.loadingAdd = false;
        },
        [addCourse.fulfilled]: (state, action) => {
            state.loadingAdd = false;
            state.courses.push(action.payload);
        }
        
    }
});


export const selectCourses = (stateStore) => stateStore.userCourses.courses;

export default coursesSlice.reducer;