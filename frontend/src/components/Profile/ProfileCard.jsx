import { SaveOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_GET_USER, API_UPDATE_USER } from "../../api/api-urls";
import api from "../../api/axios-instance";
import ProfileIcon from '../../assets/profile-icon.png';
import { useEmailGeneratorStore } from "../../store/store";
import { sessionExpired } from "../../utils/helper";
import CustomButton from "../CustomButton/CustomButton";
import CustomToast from "../CustomToast/CustomToast";

const ProfileCard = () => {

  const navigate = useNavigate();
  const { accessToken, setUserDetails } = useEmailGeneratorStore();
  const [isLoading, setIsLoading] = useState(false);
  const [profileInput, setProfileInput] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  // function to get user details
  const getUserDetails = async () => {
    try {
      const res = await api.get(API_GET_USER);
      const userDetailsObj = {
        first_name: res?.data?.user?.first_name,
        last_name: res?.data?.user?.last_name,
        email: res?.data?.user?.email,
      }
      setUserDetails(userDetailsObj);
      setProfileInput(userDetailsObj);
    }
    catch (error) {
      if (error?.response?.data?.status === 403) {
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

    const fetchUsers = async () => {
      getUserDetails();
    }
    fetchUsers();
  }, []);

  // function to update user details (i.e - first or last name) (calling api)
  const updateUserDetails = async () => {
    setIsLoading(true);
    try {
      const payload = {
        first_name: profileInput?.first_name,
        last_name: profileInput?.last_name,
      }
      await api.put(API_UPDATE_USER, payload);
      getUserDetails();

      CustomToast({
        type: 'success',
        message: 'Profile updated successfully.'
      });
    }
    catch (error) {
      if (error?.response?.data?.status === 403) {
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateUserDetails();
      }}
    >
      <Container style={{ color: 'var(--color-black-label) !important' }}>
        <StyledCardHeader>
          <img src={ProfileIcon} />
          <p>Profile</p>
        </StyledCardHeader>

        <Content>
          <div>
            <StyledCardLabel>First Name</StyledCardLabel>
            <StyledCardInput
              placeholder='Enter your first name'
              style={{ marginTop: '0.3rem' }}
              onChange={(e) => {
                setProfileInput((prev) => ({
                  ...prev,
                  first_name: e?.target?.value,
                }))
              }}
              value={profileInput?.first_name}
            />
          </div>

          <div>
            <StyledCardLabel>Last Name</StyledCardLabel>
            <StyledCardInput
              placeholder='Enter your last name'
              style={{ marginTop: '0.3rem' }}
              onChange={(e) => {
                setProfileInput((prev) => ({
                  ...prev,
                  last_name: e?.target?.value,
                }))
              }}
              value={profileInput?.last_name}
            />
          </div>

          <div>
            <StyledCardLabel>Email</StyledCardLabel>
            <StyledCardInput
              placeholder='Enter your email'
              style={{ marginTop: '0.3rem' }}
              disabled
              value={profileInput?.email}
            />
          </div>
        </Content>

        <ButtonContainer>
          <CustomButton label='Save Profile' icon={<SaveOutlined />} style={{ width: '100%', height: '2.5rem', borderRadius: '0.5rem' }} loading={isLoading} type='submit' />
        </ButtonContainer>
      </Container>
    </form>
  )
}

const Container = styled.div`
  width: 100%;  
`
export const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  >img {
    width: 1.2rem;
    height: 1.2rem;
    margin: ${(props) => (props.iconMargin ? props.iconMargin : "0rem")};
  }

  >p {
    margin: 0rem;
    font-size: 1.2rem;
    font-weight: 500;
  }
`
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  gap: 1.3rem;
`
export const StyledCardLabel = styled.p`
  margin: 0rem;
  font-size: 0.9rem;
  font-weight: 500;
`
export const StyledCardInput = styled(Input)`
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

export default ProfileCard;
