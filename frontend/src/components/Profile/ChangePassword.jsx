import { LockOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Input } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API_CHANGE_PASSWORD } from "../../api/api-urls";
import api from "../../api/axios-instance";
import LockIcon from '../../assets/lock-icon.png';
import { useEmailGeneratorStore } from "../../store/store";
import { connectionErrorMessage } from "../../utils/constants";
import { sessionExpired, validatePasswordMatch } from "../../utils/helper";
import CustomButton from "../CustomButton/CustomButton";
import CustomToast from "../CustomToast/CustomToast";
import { StyledCardHeader, StyledCardLabel } from "./ProfileCard";

const ChangePassword = () => {

  const navigate = useNavigate();
  const { resetStore } = useEmailGeneratorStore();

  const [isLoading, setIsLoading] = useState(false);
  const [securityInput, setSecurityInput] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  // onchange function for input fields
  const handleOnChangeFields = (type, value) => {
    setSecurityInput(prev => {
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

  // submit function for change password form
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await api.put(API_CHANGE_PASSWORD, securityInput);
      CustomToast({
        type: 'success',
        message: 'Password changed successfully. Please log in again for security purpose.',
      });

      setTimeout(() => {
        resetStore();    // reset zustand store
        navigate('/');
      }, 1500);
    }
    catch (error) {
      toast.dismiss();
      if (error?.code === 'ERR_NETWORK') {
        CustomToast({
          type: 'error',
          message: connectionErrorMessage,
          duration: 5000,
        });
      }
      else if (error?.response?.data?.status === 403) {
        sessionExpired(navigate);
      }
      else {
        CustomToast({
          type: 'error',
          message: error?.response?.data?.message,
          duration: 5000,
        });
      }
    }
    finally {
      setIsLoading(false);
    }
  }

  // change password
  const handleChangePassword = () => {
    // form validation
    const form = document.getElementById('changePasswordForm');
    if (!form.reportValidity()) return;

    if (securityInput.currentPassword === securityInput?.newPassword) {
      CustomToast({
        type: 'error', message: 'Current password and new password cannot be same.', duration: 5000,
      });
      return;
    }

    handleSubmit();
  }

  return (
    <form
      id="changePasswordForm"
      onSubmit={(e) => {
        e.preventDefault();
        handleChangePassword();
      }}
    >
      <Container style={{ color: 'var(--color-black-label) !important' }}>
        <StyledCardHeader>
          <img src={LockIcon} />
          <p>Security</p>
        </StyledCardHeader>

        <Content>
          <div>
            <StyledCardLabel>Current Password</StyledCardLabel>
            <StyledCardInputPassword
              required
              type='password'
              placeholder='Enter your current password'
              style={{ marginTop: '0.3rem' }}
              onChange={(e) => handleOnChangeFields('currentPassword', e?.target?.value)}
              value={securityInput?.currentPassword}
            />
          </div>

          <div>
            <StyledCardLabel>New Password</StyledCardLabel>
            <StyledCardInputPassword
              required
              type='password'
              placeholder='Enter new password'
              style={{ marginTop: '0.3rem' }}
              onChange={(e) => handleOnChangeFields('newPassword', e?.target?.value)}
              value={securityInput?.newPassword}
            />
          </div>

          <div>
            <StyledCardLabel>Confirm New Password</StyledCardLabel>
            <StyledCardInputPassword
              id="confirmPasswordInput"
              required
              type='password'
              placeholder='Confirm new password'
              style={{ marginTop: '0.3rem' }}
              onChange={(e) => handleOnChangeFields('confirmNewPassword', e?.target?.value)}
              value={securityInput?.confirmNewPassword}
            />
          </div>
        </Content>

        <ButtonContainer>
          <CustomButton label='Change Password' icon={<LockOutlined />} style={{ width: '100%', height: '2.5rem', borderRadius: '0.5rem' }} loading={isLoading} type='submit' />
        </ButtonContainer>
      </Container>
    </form>
  )
}

const Container = styled.div`
  width: 100%;  
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  gap: 1.3rem;
`

const StyledCardInputPassword = styled(Input.Password)`
  width: 100%;
  height: 2.6rem;

  &.ant-input-outlined:focus {
    border-color: var(--color-primary-purple-hover) !important;
    box-shadow: 0 0 0 2px var(--color-tabs-hover) !important;
  }

  &.ant-input-outlined:hover {
    border-color: var(--color-primary-purple-hover) !important;
  }
`

const ButtonContainer = styled.div`
  width: 100%;
  margin: 1.5rem 0rem 0.2rem 0rem;
`

export default ChangePassword;
