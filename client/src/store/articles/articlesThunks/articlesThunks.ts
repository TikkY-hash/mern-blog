import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import { AxiosError } from 'axios';
import {
  AddArticles,
  GetAllArticles,
  GetMyArticles,
} from '../articlesTypes/articlesTypes';
import { setToast } from '../../toast/toastSlice/toastSlice';

export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async (params: GetAllArticles, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get('/articles', { params });

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

export const getMyArticles = createAsyncThunk(
  'articles/getMyArticles',
  async (params: GetMyArticles, { rejectWithValue , dispatch}) => {
    try {
      const response = await axios.get('/articles/my', {
        params,
      });

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

export const addArticles = createAsyncThunk(
  'articles/addArticles',
  async (params: AddArticles, { rejectWithValue, dispatch }) => {
    try {
      await axios.post('/articles', params);
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(setToast({ type: 'error', content: 'Something going wrong' }));
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  },
);

export const uploadImage = createAsyncThunk(
  'uploadImage',
  async (formData: FormData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
