export interface User {
  fullName: string;
  email: string;
}

export interface Article {
  _id: string;
  title: string;
  description: string;
  image?: string;
  viewsCount: number;
  user: User;
  creator?: string;
}

export type InitialState = {
  articles: Article[];
  currentPage: number;
  totalPages: number;
  totalArticles: number;
  loading: boolean;
  error: string | unknown;
  filters: {
    query: string;
    sortField: string;
    sortOrder: string;
  };
};

export type AddArticles = {
  title: string;
  description: string;
  image?: string;
};

export type GetMyArticles = {
  search?: string;
  page?: number;
  limit?: number;
};

export type GetAllArticles = {
  search?: string;
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: string;
};
