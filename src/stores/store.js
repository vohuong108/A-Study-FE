import { configureStore } from "@reduxjs/toolkit"
import userSlice from "../features/authentication/userSlice"
import courseSlice from "../features/course/courseSlice"
import editCourseSlice from "../features/course/editCourse/editCourseSlice"
const store = configureStore({
    reducer: {
        user: userSlice,
        userCourse: courseSlice,
        editingCourse: editCourseSlice
    }
})

export default store;