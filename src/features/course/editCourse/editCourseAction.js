import userApi from '../../../api/userApi'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCourseByID = createAsyncThunk(
    'course/getCourseByID',
    async (access_token) => {
        const courseData = await userApi.getCourseByID(access_token)
        console.log("userData responese in getCourseByID thunk: ", courseData);
        return courseData;
    }
)