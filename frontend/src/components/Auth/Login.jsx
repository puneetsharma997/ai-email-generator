import styled from '@emotion/styled';
import { Input } from 'antd';
import { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';

const Login = ({ handleForgotPassword, handleSubmit, isLoading }) => {

  const [loginValues, setLoginValues] = useState({
    email: null,
    password: null,
  });

  // onchange function for input fields
  const handleOnChangeFields = (type, value) => {
    setLoginValues((prev) => ({
      ...prev,
      [type]: value,
    }))
  };

  // login function
  const handleLogin = () => {
    // form validation
    const form = document.getElementById("loginForm");
    if (!form.reportValidity()) return;

    handleSubmit('login', loginValues);
  }

  return (
    <form
      id="loginForm"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <Container>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem', margin: '0rem 0.3rem' }}>
          <div>
            <StyledLabel>Email Address</StyledLabel>
            <StyledInput
              required
              type='email'
              placeholder='Your email address'
              onChange={(e) => handleOnChangeFields('email', e?.target?.value)}
              value={loginValues?.email}
            />
          </div>

          <div>
            <StyledLabel>Password</StyledLabel>
            <StyledInputPassWord
              required
              placeholder='Password'
              onChange={(e) => handleOnChangeFields('password', e?.target?.value)}
              value={loginValues?.password}
            />
          </div>
        </div>

        <div style={{ margin: '1.6rem 0.3rem 1rem 0.3rem' }}>
          <CustomButton
            style={{ width: '100%', height: '2.7rem', fontSize: '1rem', borderRadius: '0.4rem' }}
            label='Login' loading={isLoading} type='submit'
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1.1rem 0rem 1.1rem 0rem' }}>
          <ForgotPassText onClick={handleForgotPassword}>Forgot Password?</ForgotPassText>
        </div>
      </Container>
    </form>
  )
}

const Container = styled.div`
  width: 100%;
`
const StyledLabel = styled.p`
  margin: 0rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-grey-label);
`
export const StyledInput = styled(Input)`
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
const ForgotPassText = styled.p`
  margin: 0rem 1rem;
  color: var(--color-primary-purple);
  font-size: 0.9rem;
  cursor: pointer;
`

export default Login;