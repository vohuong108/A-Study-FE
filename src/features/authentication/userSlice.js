import { createSlice } from "@reduxjs/toolkit"
import { login, registing, getUserByToken } from './asyncThunkAction'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userObj: null,
        loading: false,
        loggedIn: false,
        registed: false,
        verifyAcc: false,
        error: ''
    },
    reducers: {
        logOut: (state) => {
            state.userObj = null;
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
            state.loading = false;
            state.userObj = action.payload.data;
        },
        [getUserByToken.pending]: (state) => {
            state.loading = true;
        },
        [getUserByToken.rejected]: (state, action) => {
            state.error = action.error;
        },
        [getUserByToken.fulfilled]: (state, action) => {
            state.loading = false;
            state.userObj = action.payload.data;
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