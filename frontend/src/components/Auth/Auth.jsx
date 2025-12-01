import { CloseOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button, Modal, Segmented } from 'antd';
import { useState } from 'react';
import GoogleIcon from '../../assets/google.svg';
import { useEmailGeneratorStore } from '../../store/store';
import { loginUser, loginUserWithGoogle, signupUser } from '../../supabase/authentication';
import { authErrorMessages } from '../../utils/constants';
import CustomToast from '../CustomToast/CustomToast';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Signup from './Signup';

const Auth = ({ showModal, setShowModal }) => {

  const [tabValue, setTabValue] = useState('Login');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setAccessToken, setUserDetails } = useEmailGeneratorStore();

  // on click function for forgot password
  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  }

  // on click function for login or sign up
  const handleSubmit = async (method, valueObj) => {
    setIsLoading(true);

    // for login tab
    if (method === 'login') {
      try {
        const { user, session } = await loginUser(valueObj?.email, valueObj?.password);

        // setting zustand store
        const accessToken = session.access_token;
        const userDetails = {
          email: user?.email,
        }
        setAccessToken(accessToken);
        setUserDetails(userDetails);
        CustomToast({ type: 'success', message: 'Logged in successfully' });
        setShowModal(false);
      }
      catch (error) {
        CustomToast({ type: 'error', message: authErrorMessages[error?.code] || error?.message, duration: 5000 });
      }
      finally {
        setIsLoading(false);
      }
    }

    // for sign up tab
    else if (method === 'signup') {
      try {
        await signupUser(valueObj?.email, valueObj?.password);

        CustomToast({ type: 'success', message: 'Success! Click the link in your email to confirm your account.', duration: 5000 });
        setShowModal(false);
      }
      catch (error) {
        CustomToast({ type: 'error', message: authErrorMessages[error?.code] || error?.message, duration: 5000 });
      }
      finally {
        setIsLoading(false);
      }
    }
  }

  // on click function for login or sign up using Google
  const handleContinueWithGoogle = async () => {
    await loginUserWithGoogle();
  }

  return (
    <>
      <StyledModal
        open={showModal}
        onCancel={() => setShowModal(false)}
        maskClosable={true}
        keyboard
        footer={null}
        closable={false}
        centered
        destroyOnHidden
      >

        {!isForgotPassword ?
          <>
            <TabContainer>
              <StyledSegmented
                value={tabValue}
                onChange={setTabValue}
                options={['Login', 'Sign Up',]}
              />

              <StyledCloseIcon onClick={() => setShowModal(false)}>
                <CloseOutlined style={{ color: 'var(--color-grey-label)', fontSize: '0.77rem' }} />
              </StyledCloseIcon>
            </TabContainer>

            {/* Tabs content section */}
            {tabValue === 'Login' ?
              <Login handleForgotPassword={handleForgotPassword} handleSubmit={handleSubmit} isLoading={isLoading} />
              :
              <Signup handleSubmit={handleSubmit} isLoading={isLoading} />
            }

            {/* OR section */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '0rem 0.3rem' }}>
              <div style={{ width: '100%', borderBottom: '1px solid var(--color-borders)' }} />
              <Text>OR</Text>
              <div style={{ width: '100%', borderBottom: '1px solid var(--color-borders)' }} />
            </div>

            {/* Continue with google Button section */}
            <div style={{ margin: '1.4rem 0.3rem 0.6rem 0.3rem' }}>
              <StyledButton onClick={handleContinueWithGoogle}>
                <img src={GoogleIcon} style={{ marginRight: '0.2rem' }} />
                Continue with Google
              </StyledButton>
            </div>
          </>
          :
          <ForgotPassword setShowModal={setShowModal} setIsForgotPassword={setIsForgotPassword} />
        }

      </StyledModal>
    </>
  )
}

const StyledModal = styled(Modal)`
  .ant-modal {
    width: 27rem;
    border-radius: 0.6rem !important;
  }
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid var(--color-borders);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
`
const StyledSegmented = styled(Segmented)`
  width: 11rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-gradient);

  .ant-segmented-group {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-segmented-item {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.86rem;
    font-weight: 500;
    color: #fff;

    &:hover {
      color: #fff !important;
    }
  }

  .ant-segmented-item-selected {
    color: var(--color-primary-purple);
    font-weight: 500;
    background: var(--color-background);

    &:hover {
      color: var(--color-primary-purple) !important;
    }
  }

  .ant-segmented-item-label {
    margin-bottom: 0.2rem;
  }

  .ant-segmented-thumb {
    transition: all 0.24s ease-in-out !important;
    background: #C8D6FF !important;
  }
`
const Text = styled.p`
  margin: 0rem 1rem;
  color: var(--color-grey-label);
  font-size: 0.85rem;
`
const StyledButton = styled(Button)`
  width: 100%;
  height: 2.7rem;
  font-size: 0.96rem;
  color: var(--color-grey-label);
  border-radius: 0.4rem;
  border: 1px solid #ddd;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.09) !important;

  &:hover {
    border: 1px solid #ddd !important;
    color: var(--color-grey-label) !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16) !important;
  }
`
export const StyledCloseIcon = styled.div`
  padding: 0.3rem 0.6rem;
  border-radius: 0.6rem;
  cursor: pointer;

  background: var(--color-primary-gradient-hover);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.15);
  }
`

export default Auth
