import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/authentication/userSlice"
import courseSlice from "../features/course/courseSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        userCourse: courseSlice
    }
})

export default store;