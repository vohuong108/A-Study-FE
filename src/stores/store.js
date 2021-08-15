import { configureStore } from "@reduxjs/toolkit"
import userSlice from "../features/authentication/userSlice"
import coursesSlice from "../features/course/coursesSlice"
import courseSlice from "../features/course/currentCourse/courseSlice"
import submitSlice from "../features/submit/submitSlice"
import quizSlice from "../features/quiz/quizSlice"

const store = configureStore({
    reducer: {
        user: userSlice,
        userCourses: coursesSlice,
        currentCourse: courseSlice,
        submit: submitSlice,
        quiz: quizSlice,
    }
})

export default store;