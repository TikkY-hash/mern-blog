import { Navigate, Outlet } from 'react-router-dom';
import { authTokenSelector } from '../../store/auth/authSelectors/authSelectors';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  const token = useSelector(authTokenSelector);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
