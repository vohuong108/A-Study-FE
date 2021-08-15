import { createSlice } from "@reduxjs/toolkit"
import { getCourseByID, submitCourseChanges, getCourseOverview, getLearnCourseByID } from './courseAction'

const init = {
    idCourse: 1,
    name: '',
    weeks: []
}
const courseSlice = createSlice({
    name: 'currentCourse',
    initialState: {
        overview: null,
        course: init,
        loading: false,
        loadingSubmit: false,
        error: ''
    },
    reducers: {
        addNewWeek: (state) => {
            state.course.weeks.push({
                idWeek: state.course.weeks.length + 1,
                weekTitle: 'Please type title of week',
                lectures: []
            })
        },
        saveWeekChanges: (state, action) => {
            console.log('data in slice', action.payload)
            let index = state.course.weeks.findIndex(week => week.idWeek === action.payload.idWeek);
            if(index > -1) state.course.weeks[index] = action.payload;
        }
    },
    extraReducers: {
        [getCourseByID.pending]: (state) => {
            state.loading = true;
        },
        [getCourseByID.rejected]: (state, action) => {
            state.error = action.error;
            state.course = null;
            state.loading = false;
        },
        [getCourseByID.fulfilled]: (state, action) => {
            state.loading = false;
            state.course = action.payload;
        },
        [submitCourseChanges.pending]: (state) => {
            state.loadingSubmit = true;
        },
        [submitCourseChanges.rejected]: (state, action) => {
            state.error = action.error;
            state.loadingSubmit = false;
        },
        [submitCourseChanges.fulfilled]: (state, action) => {
            state.loadingSubmit = false;
            state.course = action.payload;
        },
        [getCourseOverview.pending]: (state) => {
            state.loading = true;
        },
        [getCourseOverview.rejected]: (state, action) => {
            state.error = action.error;
            state.overview = null;
            state.loading = false;
        },
        [getCourseOverview.fulfilled]: (state, action) => {
            state.loading = false;
            state.overview = action.payload;
        },
        [getLearnCourseByID.pending]: (state) => {
            state.loading = true;
        },
        [getLearnCourseByID.rejected]: (state, action) => {
            state.error = action.error;
            state.course = null;
            state.loading = false;
        },
        [getLearnCourseByID.fulfilled]: (state, action) => {
            state.loading = false;
            state.course = action.payload;
        },
        
    }
});


export const { addNewWeek, saveWeekChanges } = courseSlice.actions;
export const selectWeekByID = (stateStore, id) => stateStore.currentCourse.course?.weeks.find(week => week.idWeek == id);
export const selectLectureByID = (stateStore, idWeek, idLecture) => {
    let week = selectWeekByID(stateStore, idWeek);
    if(week) {
        return week.lectures.find(lecture => lecture.idLecture == idLecture)
    }
}
export default courseSlice.reducer;