import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import { AxiosError } from 'axios';
import { Login, Register } from '../authTypes/authTypes';
import { setToast } from '../../toast/toastSlice/toastSlice';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: Login, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(setToast({ type: 'error', content: 'Something going wrong' }));
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: Register, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(setToast({ type: 'error', content: 'Something going wrong' }));
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  },
);
