import { createAsyncThunk } from "@reduxjs/toolkit";
import courseApi from '../../api/courseApi';

export const searchCourse = createAsyncThunk(
    'search/searchCourse',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await courseApi.searchCourse(arg);
            console.log("[searchCourse action] ", response);

            return response.data;

        } catch (err) {
            console.log("[Error searchCourse action] ", err.response);
            return rejectWithValue(err.response.data);
        }
    }
)


export const getCourseInfo = createAsyncThunk(
    'search/getCourseInfo',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await courseApi.getCourseInfo(arg);
            console.log("[getCourseInfo action] ", response);

            return response.data;

        } catch (err) {
            console.log("[Error getCourseInfo action] ", err.response);
            return rejectWithValue(err.response.data);
        }
    }
);

export const enrollCourse = createAsyncThunk(
    'search/enrollCourse',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await courseApi.enrollCourse(arg);
            console.log("[enrollCourse action] ", response);

            return response.data;

        } catch (err) {
            console.log("[Error enrollCourse action] ", err.response);
            return rejectWithValue(err.response.data);
        }
    }
);