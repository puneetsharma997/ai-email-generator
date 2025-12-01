import { UserAddOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_GET_EMAIL_USAGE } from '../../api/api-urls';
import api from '../../api/axios-instance';
import Logo from '../../assets/logo.png';
import { useEmailGeneratorStore } from '../../store/store';
import { connectionErrorMessage } from '../../utils/constants';
import { handleGoToHomepage, sessionExpired } from '../../utils/helper';
import Auth from '../Auth/Auth';
import CustomButton from '../CustomButton/CustomButton';
import CustomToast from '../CustomToast/CustomToast';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const navigate = useNavigate();
  const { accessToken, setUsageDetails } = useEmailGeneratorStore();

  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  }

  // function to get email usage (calling api)
  const getEmailUsage = async () => {
    try {
      const res = await api.get(API_GET_EMAIL_USAGE);
      setUsageDetails(res?.data);
    }
    catch (error) {
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
  }
  // initial render
  useEffect(() => {
    if (!accessToken) return;
    getEmailUsage();
  }, [accessToken]);

  return (
    <StyledNav>

      {/* Show Login or Sign up modal if user is not logged in and try to generate email */}
      {showModal && <Auth showModal={showModal} setShowModal={setShowModal} />}

      <StyledLeftContainer onClick={() => handleGoToHomepage(navigate)}>
        <img src={Logo} />
        <p>AI Email Generator</p>
      </StyledLeftContainer>

      <StyledRightContainer>
        {!accessToken ?
          <CustomButton
            label='Get Started'
            icon={<UserAddOutlined />}
            onClick={handleClick}
            style={{ width: '100%', height: '100%' }}
          />
          :
          <ProfileDropdown />
        }
      </StyledRightContainer>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  background-color: #fff;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-borders);
`

const StyledLeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1.5rem;
  cursor: pointer;

  @media (min-width: 100px) and (max-width: 349px) {
    margin-left: 1rem;
  }

  > img {
    width: 2.2rem;
    height: 2.2rem;
    @media (min-width: 100px) and (max-width: 600px) {
      display: none;
    }
  }

  > p {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 600;
    background: var(--color-primary-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;

    @media (min-width: 350px) and (max-width: 450px) {
      font-size: 1.3rem;
    }
    @media (min-width: 100px) and (max-width: 349px) {
      font-size: 1rem;
    }
  }
`

const StyledRightContainer = styled.div`
  padding-right: 2rem;
  width: 8.5rem;
  height: 2.5rem;

  @media (min-width: 350px) and (max-width: 450px) {
    width: 7rem;
    height: 2.3rem;
  }
  @media (min-width: 100px) and (max-width: 349px) {
    width: 6.6rem;
    height: 2.1rem;
  }
`

export default Navbar;
