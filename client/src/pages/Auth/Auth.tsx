import { useState } from 'react';
import AuthForm from '../../components/AuthForm';
import { useFormik } from 'formik';
import { validationSchema } from '../../components/AuthForm/constants';
import { FormValues } from './types';
import { useAppDispatch } from '../../store';
import { login, register } from '../../store/auth/authThunks/authThunks';
import { useSelector } from 'react-redux';
import {
  authErrorSelector,
  authTokenSelector,
} from '../../store/auth/authSelectors/authSelectors';
import { Navigate } from 'react-router-dom';
import { clearError } from '../../store/auth/authSlice/authSlice';

const Auth = () => {
  const dispatch = useAppDispatch();
  const token = useSelector(authTokenSelector);
  const authError = useSelector(authErrorSelector) as { error: string };

  const [isSignUp, setIsSignUp] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
      fullName: '',
    },
    validationSchema: validationSchema(isSignUp),
    onSubmit: (values) => {
      if (!isSignUp) {
        return dispatch(
          login({ email: values.email, password: values.password }),
        );
      }

      dispatch(
        register({
          email: values.email,
          password: values.password,
          fullName: values.fullName || '',
        }),
      );
    },
  });

  const handleSignInClick = () => {
    setIsSignUp(!isSignUp);
    dispatch(clearError());
    formik.resetForm();
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <AuthForm
      formik={formik}
      handleSignInClick={handleSignInClick}
      isSignUp={isSignUp}
      error={authError?.error}
    />
  );
};

export default Auth;
