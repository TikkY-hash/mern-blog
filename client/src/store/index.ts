import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice/authSlice';
import articlesReducer from './articles/articlesSlice/articlesSlice';
import articleReducer from './article/articleSlice/articleSlice';
import toastReducer from './toast/toastSlice/toastSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesReducer,
    article: articleReducer,
    toast: toastReducer,
  },
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
