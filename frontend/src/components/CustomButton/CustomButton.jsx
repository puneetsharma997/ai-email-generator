import styled from '@emotion/styled';
import { Button } from 'antd';

const CustomButton = ({ label, icon = null, onClick = () => { }, style, disabled = false, loading = false, children, type = 'button' }) => {

  // on click function for button
  const handleClick = (e) => {
    if (disabled) {
      return;
    }
    onClick(e);
  }

  return (
    <StyledButton
      disabled={disabled}
      style={{ ...style }}
      onClick={(e) => handleClick(e)}
      loading={loading}
      htmlType={type}
    >
      {icon}
      {label}
      {children}
    </StyledButton>
  )
}

const StyledButton = styled(Button)`
  display: flex; 
  align-items: center; 
  justify-content: center;
  color: #fff !important;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 0.6rem;
  border: none !important;
  box-shadow: 0 4px 9px -3px var(--color-primary-purple-hover) !important;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  position: relative;
  overflow: hidden;

  transition: background-color 0.25s ease-in-out !important;

  background: ${({ disabled }) =>
    disabled
      ? `var(--color-primary-gradient-disabled) !important`
      : `var(--color-primary-gradient) !important`
  };

  // FOR SHINING EFFECT
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -120%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.45),
      transparent
    );
    transition: all 0.6s ease-in-out;
  }

  &:hover {
    color: #fff !important;
    background: ${({ disabled }) =>
    disabled
      ? `var(--color-primary-gradient-disabled) !important`
      : `var(--color-primary-gradient) !important`
  };
  }

  // FOR SHINING EFFECT
  &:hover::after {
    left: 120%;
  }

  @media (min-width: 100px) and (max-width: 450px) {
    .anticon {
      display: none !important;
    }
  }
`

export default CustomButton
