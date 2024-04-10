import { createSlice } from '@reduxjs/toolkit';
import { getArticle } from '../articleThunks/articleThunks';
import { InitialState } from '../articleTypes/articleTypes';

const initialState: InitialState = {
  article: {
    description: '',
    title: '',
    _id: '',
    user: {
      email: '',
      fullName: '',
    },
    viewsCount: 0,
    image: '',
  },
  loading: false,
  error: null,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    updateArticleField(state, action) {
      const { field, value } = action.payload;
      if (state.article) {
        state.article = { ...state.article, [field]: value };
      }
    },
    resetArticle(state) {
      state.article = {
        description: '',
        title: '',
        _id: '',
        user: {
          email: '',
          fullName: '',
        },
        viewsCount: 0,
        image: '',
      };
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateArticleField, resetArticle } = articleSlice.actions;
export default articleSlice.reducer;
