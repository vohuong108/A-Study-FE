import courseApi from '../../api/courseApi';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCourseOfUser = createAsyncThunk(
    'course/getAllCourseOfUser',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await courseApi.getAllCourseOfUser();
            console.log("[getAllCourseOfUser action] ", response);
            return response.data;

        } catch (err) {
            console.log("[Error getAllCourseOfUser action] ", err.response);
            return rejectWithValue(err.response.data);
        }
    }
)

export const saveCourse = createAsyncThunk(
    'courses/saveCourse',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await courseApi.saveCourse(arg);
            console.log("[saveCourse action] ", response);
            return response.data;
        } catch (err) {
            console.log("[Error saveCourse action] ", err.response);
            return rejectWithValue(err.response.data);
        }
        
    }
)