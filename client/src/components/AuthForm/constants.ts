import * as Yup from 'yup';

export const validationSchema = (isSignUp: boolean) => {
  let passwordValidation = Yup.string().required('Password is required');

  if (isSignUp) {
    passwordValidation = passwordValidation
      .min(5, 'Password must contain at least 5 characters')
      .matches(
        /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[a-z\d@$!%*#?&]{5,}$/i,
        'Password must contain at least one letter, one digit, and one special character',
      );
  }

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: passwordValidation,
    fullName: isSignUp
      ? Yup.string()
          .required('Full Name is required')
          .min(3, 'Full name must be at least 3 characters long')
      : Yup.string().nullable(),
  });

  return schema;
};
