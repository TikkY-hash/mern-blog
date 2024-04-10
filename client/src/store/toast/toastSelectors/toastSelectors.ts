import { RootState } from '../..';

export const getToastTypeSelector = (state: RootState) =>
  state.toast.type;
export const getToastContentSelector = (state: RootState) =>
  state.toast.content;
export const getToastVisibility = (state : RootState) => state.toast.isShow
