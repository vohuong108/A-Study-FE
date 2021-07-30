import { createSlice } from "@reduxjs/toolkit"
import { getUserCourse } from './courseAction'

const courseSlice = createSlice({
    name: 'userCourse',
    initialState: {
        courses: null,
        loading: false,
        error: ''
    },
    reducers: {
        
    },
    extraReducers: {
        [getUserCourse.pending]: (state) => {
            state.loading = true;
        },
        [getUserCourse.rejected]: (state, action) => {
            state.error = action.error;
        },
        [getUserCourse.fulfilled]: (state, action) => {
            state.loading = false;
            if(action.payload.data.message === "Fetch data successful") {
                state.courses = action.payload.data.data;
            }
        }
        
    }
});


export const selectCourses = (stateStore) => stateStore.userCourse.courses;

export default courseSlice.reducer;