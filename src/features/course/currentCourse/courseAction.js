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

export const addWeek = createAsyncThunk(
    'course/addWeek',
    async (requestData) => {
        const overview = await userApi.addWeek(requestData)
        return overview;
    }
)

export const renameWeek = createAsyncThunk(
    'course/renameWeek',
    async (requestData) => {
        const overview = await userApi.renameWeek(requestData)
        return overview;
    }
)

export const addLecture = createAsyncThunk(
    'course/addlecture',
    async (requestData) => { return await userApi.addLecture(requestData); }
)

export const addQuiz = createAsyncThunk(
    'course/addQuiz',
    async (requestData) => { return await userApi.addQuiz(requestData); }
)

export const updateLecture = createAsyncThunk(
    'course/updateLecture',
    async (requestData) => { return await userApi.updateLecture(requestData); }
)

export const updateQuiz = createAsyncThunk(
    'course/updateQuiz',
    async (requestData) => { return await userApi.updateQuiz(requestData); }
)

export const deleteLecture = createAsyncThunk(
    'course/deletelecture',
    async (requestData) => { return await userApi.deleteLecture(requestData); }
)