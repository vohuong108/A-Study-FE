import { createSlice } from "@reduxjs/toolkit"
import { getCourseByID } from './editCourseAction'

const init = {
    name: 'Machine Learning',
    weeks: [
        {
            idWeek: 1,
            weekTitle: 'Linear Regression',
            lectures: [
            {
                idLecture: 0,
                type: 'video',
                name: 'Introduce to the Linear Regression',
                status: 'publish',
                content: 'https://www.youtube.com/watch?v=nMQf09lJ3u0&pp=sAQA',

            }, {
                idLecture: 1,
                type: 'reading',
                name: 'Introduce to the Linear Regression',
                status: 'publish',
                content: '<p>test reading</p>',
            }, {
                idLecture: 2,
                type: 'quiz',
                name: 'Linear Regression Quiz',
                status: 'publish',
                dueDate: 'wed 04 08 2021 9 54 pm',
                time: 3600,
                content: [
                {
                    idQuestion: 0,
                    point: 3,
                    question: 'what are you doing here',
                    choices: [
                    {
                        key: 'A',
                        choice: 'coding',
                        answer: true,
                    }, {
                        key: 'B',
                        choice: 'reading book',
                        answer: false,
                    }
                    ]
                    
                }, {
                    idQuestion: 1,
                    point: 5,
                    question: 'what do you do for living',
                    choices: [
                    {
                        key: 'A',
                        choice: 'rapper',
                        answer: true,
                    }, {
                        key: 'B',
                        choice: 'doctor',
                        answer: false,
                    }, {
                        key: 'C',
                        choice: 'police',
                        answer: true,
                    }
                    ]
                }
                ]
            }
            ]
        }
    ]
}
const editCourseSlice = createSlice({
    name: 'editingCourse',
    initialState: {
        course: init,
        loading: false,
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
        },
        [getCourseByID.fulfilled]: (state, action) => {
            state.loading = false;
            state.course = action.payload.data;
        }
        
    }
});


export const selectEditingCourse = (stateStore) => stateStore.editingCourse.course;
export const selectWeekByID = (stateStore, id) => stateStore.editingCourse.course.weeks.find(week => week.idWeek === id);
export default editCourseSlice.reducer;