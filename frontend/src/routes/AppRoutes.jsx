import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader.jsx';
import Navbar from '../components/Navbar/Navbar.jsx';
import { checkEmailConfirmed } from '../utils/helper.js';
import PrivateRoute from './PrivateRoute.jsx';

const Homepage = lazy(() => import('../components/Homepage/Homepage.jsx'));
const Profile = lazy(() => import('../components/Profile/Profile.jsx'));
const GoogleSuccess = lazy(() => import('../components/Auth/GoogleSuccess.jsx'));
const ResetPassword = lazy(() => import('../components/Auth/ResetPassword.jsx'));

const AppRoutes = () => {

  const navigate = useNavigate();

  useEffect(() => {
    checkEmailConfirmed(navigate);
  }, []);

  return (
    <Suspense fallback={<Loader style={{ height: '100vh' }} />}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/success" element={<GoogleSuccess />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
