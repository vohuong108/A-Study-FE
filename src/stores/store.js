import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import coursesSlice from "../features/course/coursesSlice";
import courseSlice from "../features/course/currentCourse/courseSlice";
import submitSlice from "../features/submit/submitSlice";
import quizSlice from "../features/quiz/quizSlice";
import searchSlice from "../features/search/searchSlice";
import commonSlice from "../features/common/commonSlice";

import tokenMiddleware from "./middlewares/tokenMiddleware";

const store = configureStore({
    reducer: {
        user: userSlice,
        userCourses: coursesSlice,
        currentCourse: courseSlice,
        submit: submitSlice,
        quiz: quizSlice,
        search: searchSlice,
        common: commonSlice
    },
    middleware: (getDefaultMiddleware) => [tokenMiddleware].concat(
        getDefaultMiddleware({serializableCheck: false})
    )
        
    // getDefaultMiddleware().concat(tokenMiddleware),
});

export default store;