import { CloseOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useState } from 'react';
import { resetPassword } from '../../supabase/authentication';
import { authErrorMessages } from '../../utils/constants';
import CustomButton from '../CustomButton/CustomButton';
import CustomToast from '../CustomToast/CustomToast';
import { StyledCloseIcon } from './Auth';
import { StyledInput } from './Login';

const ForgotPassword = ({ setShowModal, setIsForgotPassword }) => {

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // function to send reset password link
  const handleSendResetLink = async () => {
    setIsLoading(true);
    try {
      const { error } = await resetPassword(email);
      if (error) {
        CustomToast({ type: 'error', message: error?.message, duration: 5000 });
      }
      else {
        CustomToast({ type: 'success', message: 'A password-reset link has been sent to your email. Please check your inbox.', duration: 5000 });
        setShowModal(false);
      }
    }
    catch (error) {
      CustomToast({ type: 'error', message: authErrorMessages[error?.code] || error?.message, duration: 5000 });
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendResetLink();
      }}
    >
      <HeadingContainer>
        <Heading>Reset Password</Heading>
        <StyledCloseIcon onClick={() => setShowModal(false)}>
          <CloseOutlined style={{ color: 'var(--color-grey-label)', fontSize: '0.77rem' }} />
        </StyledCloseIcon>
      </HeadingContainer>

      <EmailWrapper>
        <StyledInput
          required
          type='email'
          placeholder='Your email address'
          onChange={(e) => setEmail(e?.target?.value)}
          value={email}
        />
      </EmailWrapper>

      <div style={{ margin: '1.6rem 0.3rem 1rem 0.3rem' }}>
        <CustomButton
          style={{ width: '100%', height: '2.7rem', fontSize: '1rem', borderRadius: '0.4rem' }}
          label='Send Reset Link' loading={isLoading} type='submit'
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1.1rem 0rem 1.1rem 0rem' }}>
        <GoBackLink onClick={() => setIsForgotPassword(false)}>← Back to Login</GoBackLink>
      </div>
    </form>
  )
}

export const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid var(--color-borders);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
`
export const Heading = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-primary-purple);
`
const EmailWrapper = styled.div`
  margin-top: 2rem;
`
const GoBackLink = styled.p`
  margin: 0.6rem 1rem 0rem 1rem;
  color: var(--color-secondary-grey-label);
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: 600;
`

export default ForgotPassword;
