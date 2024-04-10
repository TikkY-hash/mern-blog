import { AlertColor } from '@mui/material';

export type InitialState = {
  type: AlertColor | '';
  isShow: boolean;
  content: string;
};
