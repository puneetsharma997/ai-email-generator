import styled from "@emotion/styled";
import { Input, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../supabase/authentication";
import { validatePasswordMatch } from "../../utils/helper";
import CustomButton from "../CustomButton/CustomButton";
import CustomToast from "../CustomToast/CustomToast";
import { Heading, HeadingContainer } from "./ForgotPassword";

const ResetPassword = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [resetPassValues, setResetPassValues] = useState({
    newPassword: null,
    confirmNewPassword: null,
  });

  // onchange function for input fields
  const handleOnChangeFields = (type, value) => {
    setResetPassValues(prev => {
      const updated = { ...prev, [type]: value };

      const values = {
        password: updated?.newPassword,
        confirmPassword: updated?.confirmNewPassword,
      }

      // validate password and confirm password is matching or not
      validatePasswordMatch(values);

      return updated;
    });
  };

  // handle submit function
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { error } = await updatePassword(resetPassValues?.newPassword);
      if (error) {
        CustomToast({ type: 'error', message: error?.message, duration: 5000 });
      }
      else {
        CustomToast({ type: 'success', message: 'Password updated successfully. Please use your new credentials to log in.', duration: 5000 });
        navigate('/', { replace: true });
      }
    }
    catch (error) {
      CustomToast({ type: 'error', message: error?.message, duration: 5000 });
    }
    finally {
      setIsLoading(false);
    }
  }

  // function to update the new password
  const handleResetPassword = () => {
    // form validation
    const form = document.getElementById('resetPasswordForm');
    if (!form.reportValidity()) return;

    handleSubmit();
  }

  return (
    <StyledModal
      open={true}
      maskClosable={true}
      keyboard
      footer={null}
      closable={false}
      centered
      destroyOnHidden
    >
      <form
        id='resetPasswordForm'
        onSubmit={(e) => {
          e.preventDefault();
          handleResetPassword();
        }}
      >
        <HeadingContainer>
          <Heading>Create New Password</Heading>
        </HeadingContainer>

        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem', margin: '0rem 0.3rem' }}>
            <div>
              <StyledLabel>Password</StyledLabel>
              <StyledInputPassWord
                required
                type='password'
                placeholder='Password'
                onChange={(e) => handleOnChangeFields('newPassword', e?.target?.value)}
                value={resetPassValues?.newPassword}
              />
            </div>

            <div>
              <StyledLabel>Confirm Password</StyledLabel>
              <StyledInputPassWord
                id="confirmPasswordInput"
                required
                type='password'
                placeholder='Confirm Password'
                onChange={(e) => handleOnChangeFields('confirmNewPassword', e?.target?.value)}
                value={resetPassValues?.confirmNewPassword}
              />
            </div>
          </div>

          <div style={{ margin: '1.2rem 0.3rem 1.5rem 0.3rem' }}>
            <CustomButton
              style={{ width: '100%', height: '2.7rem', fontSize: '1rem', borderRadius: '0.4rem' }}
              label='Reset Password' loading={isLoading} type='submit'
            />
          </div>

        </Container>
      </form>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  .ant-modal {
    width: 27rem;
    border-radius: 0.6rem !important;
  }
`;
const Container = styled.div`
  width: 100%;
`
const StyledLabel = styled.p`
  margin: 0rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-grey-label);
`
const StyledInputPassWord = styled(Input.Password)`
  width: 100%;
  height: 2.6rem;
  margin-top: 0.2rem;

  &.ant-input-outlined:focus {
    border-color: var(--color-primary-purple-hover) !important;
    box-shadow: 0 0 0 2px var(--color-tabs-hover) !important;
  }

  &.ant-input-outlined:hover {
    border-color: var(--color-primary-purple-hover) !important;
  }
`

export default ResetPassword;
