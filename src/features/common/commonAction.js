import { createAsyncThunk } from "@reduxjs/toolkit";
import commonApi from '../../api/commonApi';

export const getCategory = createAsyncThunk(
    'common/getCategory',
    async () => {
        const categoryData = await commonApi.getCategory()
        return categoryData;
    }
)