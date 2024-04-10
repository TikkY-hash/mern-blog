import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import {
  getToastTypeSelector,
  getToastContentSelector,
  getToastVisibility,
} from '../../store/toast/toastSelectors/toastSelectors';
import { resetToast } from '../../store/toast/toastSlice/toastSlice';

const Toast = () => {
  const dispatch = useAppDispatch();

  const type = useSelector(getToastTypeSelector);
  const toastContent = useSelector(getToastContentSelector);
  const isShow = useSelector(getToastVisibility);

  const handleClose = () => dispatch(resetToast());

  const severity = type === "" ? "info" : type;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isShow}
      autoHideDuration={3000}
      onClose={handleClose}
      message="This Snackbar will be dismissed in 5 seconds."
    >
      <Alert severity={severity}>{toastContent}</Alert>
    </Snackbar>
  );
};

export default Toast;
