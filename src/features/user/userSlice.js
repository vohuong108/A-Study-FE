import { createSlice } from "@reduxjs/toolkit";
import { setToken, removeToken } from "../../utils/localStorageHandler";
import {
    login, 
    signup,
    getUserProfile, 
    changeInformation, 
    changePassword 
} from './userAction';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userObj: null,
        freshTokenPromise: null,
        loadingChangePass: false,
        loadingChangeInfo: false,
        loading: false,
        error: '',
        errorChangePass: '',
        errorChangeInfo: '',
    },
    reducers: {
        logOut: (state) => {
            state.userObj = null;
            removeToken("access_token");
            removeToken("refresh_token");
        },
        setStateFreshToken: (state, arg) => {
            if(arg.payload.type === "LOADING") {
                state.freshTokenPromise = arg.payload.promiseEntity;
            } else {
                state.freshTokenPromise = null;
            }
            
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
            state.loading = false;
            state.loggedIn = true;
            setToken(action.payload.access_token, "access_token");
            setToken(action.payload.refresh_token, "refresh_token");
        },
        [signup.pending]: (state) => {
            state.loading = true;
        },
        [signup.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [signup.fulfilled]: (state, action) => {
            state.loading = false;
            state.registed = true;
        },

        [getUserProfile.pending]: (state) => {
            state.loading = true;
        },
        [getUserProfile.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [getUserProfile.fulfilled]: (state, action) => {
            state.userObj = action.payload;
            state.loading = false;
            state.loggedIn = true;
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
            state.userObj.profile = action.payload;
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

export const { logOut, setStateFreshToken } = userSlice.actions;

export default userSlice.reducer;