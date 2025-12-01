import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmailGeneratorStore } from '../../store/store';
import { supabase } from '../../supabase/supabaseClient';
import CustomToast from '../CustomToast/CustomToast';
import Loader from '../Loader/Loader';

const GoogleSuccess = () => {

  const navigate = useNavigate();
  const { setUserDetails, setAccessToken } = useEmailGeneratorStore();

  // function to handle google redirect and set access token
  const handleGoogleRedirect = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (session) {
        // extract names
        const fullName = session?.user?.identities?.[0]?.identity_data?.full_name || '';

        const [first_name = '', last_name = ''] = fullName.split(' ');

        const userDetailsObj = {
          first_name: first_name,
          last_name: last_name,
          email: session?.user?.email,
        }
        setAccessToken(session?.access_token);
        setUserDetails(userDetailsObj);

        CustomToast({
          type: 'success',
          message: 'Logged in successfully',
        });
        navigate("/", { replace: true });
      }
      else {
        navigate('/', { replace: true });
      }
    }
    catch (error) {
      CustomToast({
        type: 'error',
        message: error?.message,
      });

      navigate('/', { replace: true });
    }
  }

  useEffect(() => {
    handleGoogleRedirect();
  }, []);

  return (
    <>
      <Loader style={{ height: '100vh' }} />
    </>
  )
}

export default GoogleSuccess;
