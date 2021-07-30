import userApi from '../../api/userApi'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserCourse = createAsyncThunk(
    'user/getUserCourse',
    async (access_token) => {
        console.log("requestData in asyn thunk getUserCourse: ", access_token);
        const coursesData = await userApi.getUserCourse(access_token)
        console.log("userData responese in getUserCourse thunk: ", coursesData);
        return coursesData;
    }
)