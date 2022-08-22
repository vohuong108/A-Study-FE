import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from '../../api/userApi';
import authApi from '../../api/authApi';

export const login = createAsyncThunk(
    'user/login',
    async (requestData) => {
        const res = await authApi.loginApi(requestData);
        return res;
    }
)

export const signup = createAsyncThunk(
    'user/signup',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await authApi.signUpApi(arg);
            console.log("[signup action]: ", response);
            return response.data;

        } catch (err) {
            console.log("[ERROR signup action]: ", err.response);
            return rejectWithValue(err.response.data);
        }
    }
)

export const getUserProfile = createAsyncThunk(
    'user/getUserProfile',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await userApi.getUserProfile();
            console.log("[getUserProfile action]: ", response);
            return response.data;

        } catch (err) {
            console.log("[ERROR getUserProfile action]: ", err.response);
            return rejectWithValue(err.response.data);
        }
    }
)

export const changeInformation = createAsyncThunk(
    'user/changeInfo',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await userApi.changeInformation(arg);
            console.log("[changeInformation action]: ", response);
            return response.data;
        } catch (err) {
            console.log("[ERROR changeInformation action]: ", err.response);
            return rejectWithValue(err.response.data);
        }
    }
)

export const changePassword = createAsyncThunk(
    'user/changePass',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await userApi.changePassword(arg);
            console.log("[changePassword action]: ", response);
            return response.data;
        } catch (err) {
            console.log("[ERROR changePassword action]: ", err.response);
            return rejectWithValue(err.response.data);
        }
    }
)