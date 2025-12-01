import styled from "@emotion/styled";
import { Input } from "antd";
import { useState } from "react";
import { validatePasswordMatch } from "../../utils/helper";
import CustomButton from "../CustomButton/CustomButton";

const Signup = ({ handleSubmit, isLoading }) => {

  const [signupValues, setSignupValues] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });

  // onchange function for input fields
  const handleOnChangeFields = (type, value) => {
    setSignupValues(prev => {
      const updated = { ...prev, [type]: value };

      // validate password and confirm password is matching or not
      validatePasswordMatch(updated);

      return updated;
    });
  };

  // sign up function
  const handleSignup = () => {
    // form validation
    const form = document.getElementById('loginForm');
    if (!form.reportValidity()) return;

    handleSubmit('signup', signupValues);
  }

  return (
    <form
      id='loginForm'
      onSubmit={(e) => {
        e.preventDefault();
        handleSignup();
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
              value={signupValues?.email}
            />
          </div>

          <div>
            <StyledLabel>Password</StyledLabel>
            <StyledInputPassWord
              required
              type='password'
              placeholder='Password'
              onChange={(e) => handleOnChangeFields('password', e?.target?.value)}
              value={signupValues?.password}
            />
          </div>

          <div>
            <StyledLabel>Confirm Password</StyledLabel>
            <StyledInputPassWord
              id="confirmPasswordInput"
              required
              type='password'
              placeholder='Confirm Password'
              onChange={(e) => handleOnChangeFields('confirmPassword', e?.target?.value)}
              value={signupValues?.confirmPassword}
            />
          </div>
        </div>

        <div>
          <StyledP>We'll send you a confirmation link via email to confirm your account.</StyledP>
        </div>

        <div style={{ margin: '1.2rem 0.3rem 1.5rem 0.3rem' }}>
          <CustomButton
            style={{ width: '100%', height: '2.7rem', fontSize: '1rem', borderRadius: '0.4rem' }}
            label='Sign Up Free' loading={isLoading} type='submit'
          />
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
const StyledInput = styled(Input)`
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
const StyledP = styled.p`
  margin: 0.6rem 0.3rem 0rem 0.3rem;
  color: var(--color-grey-label);
  font-size: 0.75rem;
`

export default Signup;
