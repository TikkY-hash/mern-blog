import { RootState } from '../..';

export const getArticlesSelector = (state: RootState) => state.articles.articles;
export const getArticlesCurrentPage = (state: RootState) =>
  state.articles.currentPage;
export const getArticlesTotalPages = (state: RootState) => state.articles.totalPages;
export const getArticlesCount = (state: RootState) =>
  state.articles.totalArticles;
export const getArticlesLoading = (state: RootState) => state.articles.loading;
export const getArticlesError = (state: RootState) => state.articles.error;
export const getArticlesFilters = (state: RootState) => state.articles.filters;
