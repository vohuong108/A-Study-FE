import userApi from '../../../api/userApi'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCourseByID = createAsyncThunk(
    'course/getCourseByID',
    async (requestData) => {
        const courseData = await userApi.getCourseByID(requestData)
        return courseData;
    }
)

export const submitCourseChanges = createAsyncThunk(
    'course/submitCourseChanges',
    async (requestData) => {
        console.log("data in submit:", requestData)
        const courseData = await userApi.putCourse(requestData)
        return courseData;
    }
)

export const getCourseOverview = createAsyncThunk(
    'course/getCourseOverview',
    async (requestData) => {
        const overview = await userApi.getCourseOverview(requestData)
        return overview;
    }
)

export const getLearnCourseByID = createAsyncThunk(
    'course/getLearnCourseByID',
    async (requestData) => {
        const overview = await userApi.getLearnCourseByID(requestData)
        return overview;
    }
)
