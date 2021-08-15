import userApi from '../../api/userApi'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCourses = createAsyncThunk(
    'course/getCourses',
    async (access_token) => {
        const coursesData = await userApi.getCourses(access_token)
        console.log("list courses: ", coursesData);
        return coursesData;
    }
)

export const deleteCourseByID = createAsyncThunk(
    'courses/deleteCourseByID',
    async (requestData) => {
        const result = await userApi.deleteCourseByID(requestData);
        return result;
    }
)