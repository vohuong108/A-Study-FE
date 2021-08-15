import userApi from '../../api/userApi'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSubmitByID = createAsyncThunk(
    'submit/getSubmitByID',
    async (requestData) => {
        const result = await userApi.getSubmitByID(requestData);
        return result;
    }
)