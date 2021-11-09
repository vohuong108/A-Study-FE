import { createSlice } from "@reduxjs/toolkit"
import { login, registing, getUserByToken, getCategory, changeInformation, changePassword } from './userAction'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userObj: null,
        access_token: null,
        category: null,
        loadingCategory: false,
        loadingChangePass: false,
        loadingChangeInfo: false,
        loading: false,
        loggedIn: false,
        registed: false,
        verifyAcc: false,
        error: '',
        errorChangePass: '',
        errorChangeInfo: '',
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
            state.loading = false;
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
            state.loading = false;
        },
        [getUserByToken.fulfilled]: (state, action) => {
            state.userObj = action.payload;
            state.loading = false;
            state.loggedIn = true;
        },
        [registing.pending]: (state) => {
            state.loading = true;
        },
        [registing.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [registing.fulfilled]: (state, action) => {
            state.loading = false;
            // if(action.payload.message === "Register successful") state.registed = true;
            state.registed = true;
        },
        [getCategory.pending]: (state) => {
            state.loadingCategory = true;
        },
        [getCategory.rejected]: (state, action) => {
            state.error = action.error;
            state.loadingCategory = false;
        },
        [getCategory.fulfilled]: (state, action) => {
            state.loadingCategory = false;
            state.category = action.payload;
        },
        [changeInformation.pending]: (state) => {
            state.loadingChangeInfo = true;
        },
        [changeInformation.rejected]: (state, action) => {
            state.errorChangeInfo = action.error;
            state.loadingChangeInfo = false;
        },
        [changeInformation.fulfilled]: (state, action) => {
            state.loadingChangeInfo = false;
            state.userObj = action.payload;
        },
        [changePassword.pending]: (state) => {
            state.loadingChangePass = true;
        },
        [changePassword.rejected]: (state, action) => {
            state.errorChangePass = action.error;
            state.loadingChangePass = false;
        },
        [changePassword.fulfilled]: (state, action) => {
            state.loadingChangePass = false;
        },
    }
});

export const { logOut } = userSlice.actions;
export const selectUser = (stateStore) => stateStore.user.userObj;

export default userSlice.reducer;