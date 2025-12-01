import styled from "@emotion/styled";
import { Button, Popconfirm } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_DELETE_USER } from "../../api/api-urls";
import api from "../../api/axios-instance";
import WarningIcon from '../../assets/warning-icon.png';
import { useEmailGeneratorStore } from "../../store/store";
import { connectionErrorMessage } from "../../utils/constants";
import { sessionExpired } from "../../utils/helper";
import CustomToast from "../CustomToast/CustomToast";
import { StyledCardHeader } from "./ProfileCard";

const DeleteAccount = () => {

  const navigate = useNavigate();
  const { resetStore } = useEmailGeneratorStore();
  const [isLoading, setIsLoading] = useState(false);

  // function to delete user
  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      await api.delete(API_DELETE_USER);
      CustomToast({
        type: 'success',
        message: 'Account deleted successfully.',
      });

      setTimeout(() => {
        resetStore();    // reset zustand store
        navigate('/');
      }, 1500);
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
    finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <StyledCardHeader style={{ gap: '0.5rem' }}>
        <img src={WarningIcon} style={{ width: '1.2rem', height: '1.2rem' }} />
        <p style={{ color: 'var(--color-error)', fontSize: '1.03rem', fontWeight: 700 }}>Danger Zone</p>
      </StyledCardHeader>

      <CautionText>This action cannot be undone. Once you delete your account, all your data will be permanently removed. Please proceed with caution.</CautionText>

      <ButtonContainer>
        <Popconfirm
          title='Delete Account'
          description='Are you sure to delete your account?'
          onConfirm={handleDeleteUser}
          okText='Yes'
          cancelText='No'
          okButtonProps={{
            styles: { root: { backgroundColor: 'var(--color-primary-purple)', color: '#fff' } },
          }}
          cancelButtonProps={{
            styles: { root: { backgroundColor: '#fff', color: 'var(--color-primary-purple)', border: '1px solid var(--color-primary-purple)' } },
          }}
        >
          <StyledButton loading={isLoading} style={{ pointerEvents: isLoading ? 'none' : 'auto' }}>
            Delete Account
          </StyledButton>
        </Popconfirm>
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  background-color: #ef44440d;
  border: 1px solid var(--color-error);
  padding: 1.3rem 1.5rem;
  border-radius: 0.6rem;
  margin-top: 1rem;
`

const CautionText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-black-label);
  margin: 1rem 10rem 0rem 0rem;
  line-height: 1.5;
`

const ButtonContainer = styled.div`
  width: 100%;
  margin: 1rem 0rem 0.2rem 0rem;
`

const StyledButton = styled(Button)`
  background: var(--color-error);
  height: 2.5rem;
  font-size: 0.93rem;
  border: none !important;
  color: #fff !important;

  &:hover {
    background: #d9363e !important;
    border: none !important;
    color: #fff !important;
  }
`

export default DeleteAccount;
