import { createSlice } from "@reduxjs/toolkit"
import { login, registing, getUserByToken } from './asyncThunkAction'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userObj: null,
        access_token: null,
        loading: false,
        loggedIn: false,
        registed: false,
        verifyAcc: false,
        error: ''
    },
    reducers: {
        logOut: (state) => {
            state.userObj = null;
            state.loggedIn = false;
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.loading = true;
        },
        [login.rejected]: (state, action) => {
            state.error = action.error;
        },
        [login.fulfilled]: (state, action) => {
            state.access_token = action.payload.access_token;
            state.loading = false;
            state.loggedIn = true;
        },
        [getUserByToken.pending]: (state) => {
            state.loading = true;
        },
        [getUserByToken.rejected]: (state, action) => {
            state.error = action.error;
        },
        [getUserByToken.fulfilled]: (state, action) => {
            state.userObj = action.payload.profile;
            state.loading = false;
            state.loggedIn = true;
        },
        [registing.pending]: (state) => {
            state.loading = true;
        },
        [registing.rejected]: (state, action) => {
            state.error = action.error;
        },
        [registing.fulfilled]: (state, action) => {
            state.loading = false;
            if(action.payload.message === "Register successful") state.registed = true;
        }
    }
});

export const { logOut } = userSlice.actions;
export const selectUser = (stateStore) => stateStore.user.userObj;

export default userSlice.reducer;