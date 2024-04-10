export type InitialState = {
  token: string | null;
  loading: boolean;
  error: null | unknown;
};

export type Register = {
  email: string;
  password: string;
  fullName: string;
};

export type Login = {
  email: string;
  password: string;
};
