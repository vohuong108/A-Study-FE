import userApi from '../../api/userApi'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    'user/login',
    async (requestData) => {
        console.log("requestData in asyn thunk login: ", requestData);
        const res = await userApi.userLogin(requestData);
        return res.data.access_token;
    }
)

export const registing = createAsyncThunk(
    'user/registing',
    async (requestData) => {
        console.log("requestData in asyn thunk registing: ", requestData);
        const userData = await userApi.userRegisting(requestData)
        console.log("userData responese in thunk registing:", userData);
        return userData;
    }
)

export const getUserByToken = createAsyncThunk(
    'user/getUser',
    async (requestData) => {
        console.log("requestData in asyn thunk getUserByToken: ", requestData);
        const userData = await userApi.getUser(requestData)
        console.log("userData responese in get thunk: ", userData);
        return userData;
    }
)