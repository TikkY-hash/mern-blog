import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from '../articlesTypes/articlesTypes';
import { getArticles, getMyArticles } from '../articlesThunks/articlesThunks';

const initialState: InitialState = {
  articles: [],
  currentPage: 1,
  totalPages: 1,
  totalArticles: 0,
  loading: false,
  error: null,
  filters: {
    query: '',
    sortField: '',
    sortOrder: '',
  },
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    updateFilters(state, action) {
      state.filters = action.payload;
    },
    resetArticles: (state) => {
      state.articles = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.totalArticles = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getArticles.fulfilled,
        (state, action) => {
          state.loading = false;

          if (action.payload.currentPage === 1) {
            state.articles = action.payload.articles;
          } else {
            state.articles = state.articles.concat(action.payload.articles);
          }

          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
          state.totalArticles = action.payload.totalArticles;
        },
      )
      .addCase(getArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getMyArticles.fulfilled,
        (state, action) => {
          state.loading = false;

          if (action.payload.currentPage === 1) {
            state.articles = action.payload.articles;
          } else {
            state.articles = state.articles.concat(action.payload.articles);
          }

          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
          state.totalArticles = action.payload.totalArticles;
        },
      )
      .addCase(getMyArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateFilters, resetArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
