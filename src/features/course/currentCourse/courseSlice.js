import { createSlice } from "@reduxjs/toolkit";
import { 
    getCourseByID, 
    deleteCourseByID,
    createWeek,
    renameWeek, 
    createLectureContent,
    deleteWeekContent,
    updateLectureContent,
    createQuizContent,
    updateQuizContent
} from './courseAction';

const init = {
    id: null,
    name: '',
    weeks: []
}
const courseSlice = createSlice({
    name: 'currentCourse',
    initialState: {
        course: init,
        loading: false,
        loadingSubmit: false,
        error: ''
    },
    reducers: {
        
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
        [deleteCourseByID.pending]: (state) => {
            state.loading = true;
        },
        [deleteCourseByID.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteCourseByID.fulfilled]: (state, action) => {
            state.loading = false;
            if(action.payload.statusCode === 200) {
                state.course = null;
            }
            
        },

        [createWeek.pending]: (state) => {
            state.loading = true;
        },
        [createWeek.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [createWeek.fulfilled]: (state, action) => {
            state.loading = false;
            state.course.weeks.push({
                id: action.payload.id,
                weekOrder: action.payload.weekOrder,
                name: action.payload.name,
                contents: []
            })
        },
        [renameWeek.pending]: (state) => {
            state.loading = true;
        },
        [renameWeek.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [renameWeek.fulfilled]: (state, action) => {
            state.loading = false;
            console.log(action.payload);
            
            let weekId = action.payload.id;
            let weekIndex = state?.course?.weeks?.findIndex(i => i.id === weekId);

            if(weekIndex !== -1) {
                state.course.weeks[weekIndex].name = action.payload.name
            }
        },


        [createLectureContent.pending]: (state) => {
            state.loading = true;
        },
        [createLectureContent.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [createLectureContent.fulfilled]: (state, action) => {
            state.loading = false;

            let {weekId, ...lecture} = action.payload; 
            let weekIndex = state?.course?.weeks?.findIndex(i => i.id === weekId);

            if(weekIndex !== -1) {
                state.course.weeks[weekIndex].contents.push(lecture)
                
            }
        },
        [deleteWeekContent.pending]: (state) => {
            state.loading = true;
        },
        [deleteWeekContent.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteWeekContent.fulfilled]: (state, action) => {
            state.loading = false;

            let weekIndex = state?.course?.weeks?.findIndex(i => i.id === action.payload.arg.weekId);

            if(weekIndex !== -1) {
                let contentIndex = state?.course?.weeks[weekIndex].contents.findIndex(
                    i => i.id === action.payload.arg.contentId
                );

                if(contentIndex !== -1) {
                    state?.course?.weeks[weekIndex].contents.splice(contentIndex, 1);
                }

                
            } 
        },
        [updateLectureContent.pending]: (state) => {
            state.loading = true;
        },
        [updateLectureContent.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [updateLectureContent.fulfilled]: (state, action) => {
            state.loading = false;
            console.log(action);

            let {weekId, ...updatedLecture} = action.payload;
            let weekIndex = state?.course?.weeks?.findIndex(i => i.id === weekId);

            if(weekIndex !== -1) {
                let contentIndex = state.course.weeks[weekIndex].contents.findIndex(
                    i => i.id === action.payload.id
                );

                if(contentIndex !== -1) {
                    state.course.weeks[weekIndex].contents[contentIndex] = updatedLecture;
                } else {
                    console.log(`Not found contentId: ${action.payload.id}`)
                } 

            } else {
                console.log(`Not found weekId: ${weekId}`)
            } 
        },

        [createQuizContent.pending]: (state) => {
            state.loading = true;
        },
        [createQuizContent.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [createQuizContent.fulfilled]: (state, action) => {
            state.loading = false;

            let {weekId, ...quizContent} = action.payload; 
            let weekIndex = state?.course?.weeks?.findIndex(i => i.id === weekId);

            if(weekIndex !== -1) {
                state.course.weeks[weekIndex].contents.push(quizContent)
                
            }
        },
        [updateQuizContent.pending]: (state) => {
            state.loading = true;
        },
        [updateQuizContent.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [updateQuizContent.fulfilled]: (state, action) => {
            state.loading = false;

            let {weekId, ...quizContent} = action.payload.data; 
            let weekIndex = state?.course?.weeks?.findIndex(i => i.id === weekId);

            if(weekIndex !== -1) {
                let prevQuizIndex = state.course.weeks[weekIndex].contents.findIndex(
                    i => i.id === action.payload.prevQuizId
                );

                if(prevQuizIndex !== -1) {
                    state.course.weeks[weekIndex].contents.splice(prevQuizIndex, 1);

                }
                state.course.weeks[weekIndex].contents.push(quizContent)
                
            }
        },
    }
});


export const { saveWeekChanges } = courseSlice.actions;

export const selectWeekByID = (stateStore, id) => stateStore.currentCourse.course?.weeks.find(week => parseInt(week.id) === parseInt(id));

export const selectContentByID = (stateStore, weekId, contentId, type) => {
    let week = selectWeekByID(stateStore, weekId);
    
    if(week) {
        if(!type) {
            return week.contents.find(content => parseInt(content.id) === parseInt(contentId) && content.contentType !== 'QUIZ');
        } else {
            return week.contents.find(content => parseInt(content.id) === parseInt(contentId) && content.contentType === type);
        }
    }
}
export const selectWeekByWeekOrder = (stateStore, serial) => stateStore.currentCourse.course?.weeks.find(week => parseInt(week.weekOrder) === parseInt(serial));
export default courseSlice.reducer;