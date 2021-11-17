import { createSlice } from "@reduxjs/toolkit"
import { getCourseByID, submitCourseChanges, 
    getCourseOverview, getLearnCourseByID, 
    renameWeek, addLecture, addQuiz, 
    addWeek, updateLecture, updateQuiz, deleteLecture } from './courseAction'

const init = {
    courseId: 1,
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
        [addLecture.pending]: (state) => {
            state.loading = true;
        },
        [addLecture.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [addLecture.fulfilled]: (state, action) => {
            state.loading = false;
            state?.course?.weeks?.forEach(week => {
                if(week?.weekId == action.payload?.weekId) {
                    week?.lectures.push(action.payload);
                }
            })
        },
        [addQuiz.pending]: (state) => {
            state.loading = true;
        },
        [addQuiz.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [addQuiz.fulfilled]: (state, action) => {
            state.loading = false;
            state?.course?.weeks?.forEach(week => {
                if(week?.weekId == action.payload?.weekId) {
                    week?.lectures.push(action.payload);
                }
            })

        },
        [addWeek.pending]: (state) => {
            state.loading = true;
        },
        [addWeek.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [addWeek.fulfilled]: (state, action) => {
            state.loading = false;
            state.course.weeks.push({
                weekId: action.payload.weekId,
                serialWeek: action.payload.serialWeek,
                name: action.payload.name,
                lectures: []
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
            let weekId = action.payload.weekId;

            state?.course?.weeks?.forEach(week => {
                if(week?.weekId === weekId) {
                    week.name = action.payload.name;
                }
            })
        },
        [updateLecture.pending]: (state) => {
            state.loading = true;
        },
        [updateLecture.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [updateLecture.fulfilled]: (state, action) => {
            let weekId = action.payload.weekId;
            let lectureId = action.payload.lectureId;

            state?.course?.weeks?.forEach(week => {
                if(week?.weekId === weekId) {
                    week?.lectures.forEach(lec => {
                        if(lec.lectureId === lectureId) {
                            lec.title = action.payload.title;
                            lec.lectureStatus = action.payload.lectureStatus;
                        }
                    })
                }
            })

            state.loading = false;
        },
        [updateQuiz.pending]: (state) => {
            state.loading = true;
        },
        [updateQuiz.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [updateQuiz.fulfilled]: (state, action) => {
            let weekId = action.payload.weekId;
            let lectureId = action.payload.lectureId;

            state?.course?.weeks?.forEach(week => {
                if(week?.weekId === weekId) {
                    week?.lectures.forEach(lec => {
                        if(lec.lectureId === lectureId) {
                            lec.title = action.payload.title;
                            lec.lectureStatus = action.payload.lectureStatus;
                        }
                    })
                }
            })
            state.loading = false;
        },
        [deleteLecture.pending]: (state) => {
            state.loading = true;
        },
        [deleteLecture.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteLecture.fulfilled]: (state, action) => {
            let weekId = action.payload.weekId;
            let lectureId = action.payload.lectureId;
            let weeks = state?.course?.weeks;

            for(let i = 0; i < weeks.length; i+=1) {
                if(weeks[i].weekId === weekId) {
                    console.log("find week in here: ", i);
                    let lectures = weeks[i].lectures;

                    for(let j = 0; j < lectures.length; j+=1) {
                        
                        if(lectures[j].lectureId === lectureId) {
                            console.log("find lecture in here: ", j);
                            state.course.weeks[i].lectures.splice(j, 1);
                            state.course.weeks[i].lectures = [...state.course.weeks[i].lectures];
                            break;
                        }
                    }

                    break;
                }
            }
            
            state.loading = false;
        },
    }
});


export const { saveWeekChanges } = courseSlice.actions;

export const selectWeekByID = (stateStore, id) => stateStore.currentCourse.course?.weeks.find(week => week.weekId == id);

export const selectLectureByID = (stateStore, weekId, lectureId, type) => {
    let week = selectWeekByID(stateStore, weekId);
    
    if(week) {
        if(!type) {
            return week.lectures.find(lecture => lecture.lectureId == lectureId && lecture.lectureType !== 'QUIZ')
        } else {
            return week.lectures.find(lecture => lecture.lectureId == lectureId && lecture.lectureType == type)
        }
    }
}
export const selectWeekBySerial = (stateStore, serial) => stateStore.currentCourse.course?.weeks.find(week => week.serialWeek == serial);
export default courseSlice.reducer;