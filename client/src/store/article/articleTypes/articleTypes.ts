import { Article } from '../../articles/articlesTypes/articlesTypes';

export type InitialState = {
  article: Article;
  loading: boolean;
  error: string | unknown;
};

export type getArticleType = {
  id: string | undefined;
  view?: boolean;
};

export type updatedData = {
  title: string;
  description: string;
  image?: string;
};

export type updatedArticleParams = {
  id: string;
  data: updatedData;
};
