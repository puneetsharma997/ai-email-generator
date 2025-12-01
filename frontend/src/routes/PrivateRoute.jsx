import { Navigate, Outlet } from 'react-router-dom';
import { useEmailGeneratorStore } from '../store/store';

const PrivateRoute = () => {
  const { accessToken } = useEmailGeneratorStore();

  if (accessToken === null) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
