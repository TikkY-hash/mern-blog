import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from '../toastTypes/toastTypes';

const initialState: InitialState = {
  type: '',
  isShow: false,
  content: '',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast(state, action) {
      state.type = action.payload.type;
      state.isShow = true;
      state.content = action.payload.content;
    },
    resetToast(state) {
      state.type = '';
      state.isShow = false;
      state.content = '';
    },
  },
});

export const { resetToast, setToast } = toastSlice.actions;

export default toastSlice.reducer;
