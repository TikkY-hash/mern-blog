import { RootState } from '../..';

export const authTokenSelector = (state: RootState) => state.auth.token;
export const authErrorSelector = (state: RootState) => state.auth.error;
