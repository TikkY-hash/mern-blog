import { RootState } from "../..";

export const getArticleSelector = (state : RootState) => state.article.article;
export const getArticleLoading = (state : RootState) => state.article.loading;
export const getArticleError = (state : RootState) => state.article.error;