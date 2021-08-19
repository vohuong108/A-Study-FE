import userApi from '../../api/userApi'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    'user/login',
    async (requestData) => {
        const res = await userApi.userLogin(requestData);
        return res;
    }
)

export const registing = createAsyncThunk(
    'user/registing',
    async (requestData) => {
        const userData = await userApi.userRegisting(requestData)
        return userData;
    }
)

export const getUserByToken = createAsyncThunk(
    'user/getUser',
    async (requestData) => {
        const userData = await userApi.getUser(requestData)
        return userData;
    }
)

export const getCategory = createAsyncThunk(
    'user/getCategory',
    async () => {
        const userData = await userApi.getCategory()
        return userData;
    }
)

export const changeInformation = createAsyncThunk(
    'user/changeInfo',
    async (requestData) => {
        const userData = await userApi.changeInformation(requestData)
        return userData;
    }
)

export const changePassword = createAsyncThunk(
    'user/changePass',
    async (requestData) => {
        const userData = await userApi.changePassword(requestData)
        return userData;
    }
)