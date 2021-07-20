import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from '../../api/userApi'

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
        console.log("res in registing:", userData);
        return userData;
    }
)

export const getUserByToken = createAsyncThunk(
    'user/getUser',
    async (requestData) => {
        const userData = await userApi.getUser(requestData)
        console.log("userData responese in get thunk: ", userData);
        return userData;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userObj: null,
        loading: false,
        error: ''
    },
    reducers: {
        logOut: (state) => {
            state.userObj = null;
        }
    },
    extraReducers: {
        [getUserByToken.pending]: (state) => {
            state.loading = true;
        },
        [getUserByToken.rejected]: (state, action) => {
            state.error = action.error;
        },
        [getUserByToken.fulfilled]: (state, action) => {
            state.loading = false;
            state.userObj = action.payload.data;
        }
    }
});

export const { logOut } = userSlice.actions;
export const selectUser = (stateStore) => stateStore.user.userObj;

export default userSlice.reducer;