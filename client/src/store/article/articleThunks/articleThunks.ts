import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import { AxiosError } from 'axios';
import { getArticleType, updatedArticleParams } from '../articleTypes/articleTypes';
import { setToast } from '../../toast/toastSlice/toastSlice';

export const getArticle = createAsyncThunk(
  'article/getArticle',
  async ({ id, view }: getArticleType, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`/articles/${id}`, { params: { view } });

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

export const updateArticle = createAsyncThunk(
  'article/updateArticle',
  async (
    { id, data }: updatedArticleParams,
    { rejectWithValue, dispatch },
  ) => {
    try {
      await axios.patch(`/articles/${id}`, data);
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(setToast({ type: 'error', content: 'Something going wrong' }));
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  },
);

export const deleteArticle = createAsyncThunk(
  'article/deleteArticle',
  async ({ id }: { id: string }, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`/articles/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(setToast({ type: 'error', content: 'Something going wrong' }));
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  },
);
