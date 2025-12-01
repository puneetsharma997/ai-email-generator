import { HomeOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Avatar, Dropdown } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEmailGeneratorStore } from '../../store/store';
import { logoutUser } from '../../supabase/authentication';
import { handleGoToHomepage } from '../../utils/helper';
import CustomToast from '../CustomToast/CustomToast';

const ProfileDropdown = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { resetStore } = useEmailGeneratorStore();

  // function to navigate to profile route
  const handleGoToProfile = () => {
    navigate('/profile');
  }

  // function to logout user
  const handleLogout = async () => {
    try {
      await logoutUser();

      // reset zustand store
      resetStore();

      CustomToast({ type: 'success', message: 'Logged out successfully' });
      navigate('/');
    }
    catch (error) {
      CustomToast({ type: 'error', message: error?.message });
    }
  }

  // profile menu dropdown items
  const dropdownItems = [

    // conditionally adding "Profile Setting" item
    ...(location?.pathname === '/' ?
      [
        {
          key: 'profileSetting',
          label: (
            <StyledDropdownContent onClick={handleGoToProfile}>
              <SettingOutlined />
              <p>Profile Settings</p>
            </StyledDropdownContent>
          ),
        },
        {
          type: 'divider'
        }
      ]
      :
      []
    ),

    // conditionally adding "Back to App" item
    ...(location?.pathname === '/profile' ?
      [
        {
          key: 'goToHome',
          label: (
            <StyledDropdownContent onClick={() => handleGoToHomepage(navigate)}>
              <HomeOutlined />
              <p>Back to App</p>
            </StyledDropdownContent>
          )
        },
        {
          type: 'divider'
        }
      ]
      :
      []
    ),

    {
      key: 'logout',
      label: (
        <StyledDropdownContent onClick={handleLogout}>
          <LogoutOutlined />
          <p>Logout</p>
        </StyledDropdownContent>
      ),
    },
  ]

  return (
    <Container>
      <Dropdown
        trigger='click' arrow
        menu={{ items: dropdownItems, className: 'profile-menu' }}
        styles={{ root: { minWidth: '11rem', }, item: { fontSize: '0.9rem', fontWeight: 500 } }}
      >
        <StyledAvatar
          size={38}
          icon={<UserOutlined />}
        />
      </Dropdown>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`
const StyledAvatar = styled(Avatar)`
  background: var(--color-primary-gradient);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`
const StyledDropdownContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.1rem 0rem;

  >p {
    margin: 0;
  }
`

export default ProfileDropdown;
