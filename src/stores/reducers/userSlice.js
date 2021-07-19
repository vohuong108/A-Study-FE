import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from '../../api/userApi'

export const getUser = createAsyncThunk(
    'user/getUser',
    async (requestOptions) => {
        console.log("requestOptions in asyn thunk: ", requestOptions);
        const userData = await userApi.getUser(requestOptions)
        return userData;
    }
)

export const addUser = createAsyncThunk(
    'user/addUser',
    async (requestOptions) => {
        console.log("requestOptions in asyn thunk: ", requestOptions);
        const userData = await userApi.addUser(requestOptions)
        return userData;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: ''
    },
    reducers: {
    },
    extraReducers: {
        [getUser.pending]: (state) => {
            state.loading = true;
        },
        [getUser.rejected]: (state, action) => {
            state.error = action.error;
        },
        [getUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        }
    }
});

export const selectUser = (state) => state.user.user;

export default userSlice.reducers;