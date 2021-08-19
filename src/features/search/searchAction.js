import userApi from '../../api/userApi'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const searchCourse = createAsyncThunk(
    'search/searchCourse',
    async (requestData) => {
        const result = await userApi.searchCourse(requestData);
        return result;
    }
)


export const getSearchedCourseInfo = createAsyncThunk(
    'search/getSearchedCourseInfo',
    async (requestData) => {
        const result = await userApi.getSearchedCourseInfo(requestData);
        return result;
    }
)

export const enrollCourse = createAsyncThunk(
    'search/enrollCourse',
    async (requestData) => {
        const result = await userApi.enrollCourse(requestData);
        return result;
    }
)