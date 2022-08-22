import courseApi from '../../../api/courseApi';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCourseByID = createAsyncThunk(
    'course/getCourseByID',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await courseApi.getCourseByID(arg);
            console.log("[getCourseByID action] ", response);

            return response.data;
        } catch (err) {
            console.log("[Error getCourseByID action] ", err.response);
            return rejectWithValue(err.response.data);
        }
        
    }
)

export const createWeek = createAsyncThunk(
    'course/createWeek',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await courseApi.createWeek(arg);
            console.log("[createWeek action] ", response);

            return response.data;

        } catch (err) {
            console.log("[Error createWeek action] ", err.response);
            return rejectWithValue(err.response.data);
        }
    }
)

export const deleteCourseByID = createAsyncThunk(
    'course/deleteCourseByID',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await courseApi.deleteCourseByID(arg);
            console.log("[deleteCourseByID action] ", response);

            return {message: response.data, statusCode: response.status};

        } catch (err) {
            console.log("[Error deleteCourseByID action] ", err.response);
            return rejectWithValue(err.response.data);
        }
    }
)

export const renameWeek = createAsyncThunk(
    'course/renameWeek',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await courseApi.renameWeek(arg);
            console.log("[renameWeek action] ", response);

            return response.data;

        } catch (err) {
            console.log("[Error renameWeek action] ", err.response);
            return rejectWithValue(err.response.data);
        }
    }
)

export const createLectureContent = createAsyncThunk(
    'course/createLectureContent',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await courseApi.createLectureContent(arg);
            console.log("[createLectureContent action] ", response);

            return response.data;

        } catch (err) {
            console.log("[Error createLectureContent action] ", err);
            return rejectWithValue(err.response.data);
        }
    }
)

export const deleteWeekContent = createAsyncThunk(
    'course/deleteWeekContent',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await courseApi.deleteWeekContent(arg);
            console.log("[deleteWeekContent action] ", response);

            return {arg, statusCode: response.status, data: response.data};

        } catch (err) {
            console.log("[Error deleteWeekContent action] ", err);
            return rejectWithValue(err.response.data);
        }
    }
)

export const updateLectureContent = createAsyncThunk(
    'course/updateLectureContent',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await courseApi.updateLectureContent(arg);
            console.log("[updateLectureContent action] ", response);

            return response.data;

        } catch (err) {
            console.log("[Error updateLectureContent action] ", err);
            return rejectWithValue(err.response.data);
        }
    }
)

export const createQuizContent = createAsyncThunk(
    'course/createQuizContent',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await courseApi.createQuizContent(arg);
            console.log("[createQuizContent action] ", response);

            return response.data;

        } catch (err) {
            console.log("[Error createQuizContent action] ", err);
            return rejectWithValue(err.response.data);
        }
    }
)

export const updateQuizContent = createAsyncThunk(
    'course/updateQuizContent',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await courseApi.updateQuizContent(arg);
            console.log("[updateQuizContent action] ", response);

            return {prevQuizId: arg.quizId, data: response.data};

        } catch (err) {
            console.log("[Error updateQuizContent action] ", err);
            return rejectWithValue(err.response.data);
        }
    }
)



export const getCourseOverview = createAsyncThunk(
    'course/getCourseOverview',
    async (requestData) => {
        const overview = await courseApi.getCourseOverview(requestData)
        return overview;
    }
)

export const getLearnCourseByID = createAsyncThunk(
    'course/getLearnCourseByID',
    async (requestData) => {
        const overview = await courseApi.getLearnCourseByID(requestData)
        return overview;
    }
)

