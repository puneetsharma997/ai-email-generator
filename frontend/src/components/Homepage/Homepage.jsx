import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_GENERATE_EMAIL } from '../../api/api-urls';
import api from '../../api/axios-instance';
import { useEmailGeneratorStore } from '../../store/store';
import { connectionErrorMessage } from '../../utils/constants';
import { sessionExpired } from '../../utils/helper';
import CustomToast from '../CustomToast/CustomToast';
import LeftContent from '../LeftContent/LeftContent';
import RightContent from '../RightContent/RightContent';

const Homepage = () => {

  const { setGeneratedEmail, setUsageDetails } = useEmailGeneratorStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [genEmailValues, setGenEmailValues] = useState({
    type: null,
    tone: 'professional',
    recipient: null,
    subject: null,
    details: null,
    length: 'short'
  });

  const [replyEmailValues, setReplyEmailValues] = useState({
    originalEmail: null,
    tone: 'professional',
    length: 'short',
    comments: null,
  });

  // function to generate email using AI (calling api)
  const generateEmail = async (mode = 'email') => {
    setIsLoading(true);
    try {
      let payload = {};

      if (mode === 'email') {
        payload = { ...genEmailValues, mode: 'email' }
      }
      else if (mode === 'reply') {
        payload = { ...replyEmailValues, mode: 'reply' }
      }

      const res = await api.post(API_GENERATE_EMAIL, payload);
      setGeneratedEmail(res?.data?.output);
      setUsageDetails(prev => ({
        ...(prev || {}),
        remaining: res?.data?.remaining,
      }));
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
      <ContentWrapper>

        {/* left content section */}
        <LeftContainer>
          <LeftContent
            genEmailValues={genEmailValues} setGenEmailValues={setGenEmailValues}
            replyEmailValues={replyEmailValues} setReplyEmailValues={setReplyEmailValues}
            isLoading={isLoading} generateEmail={generateEmail}
          />
        </LeftContainer>

        {/* right content section */}
        <RightContainer>
          <RightContent isLoading={isLoading} />
        </RightContainer>
      </ContentWrapper>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 4rem;
`
const ContentWrapper = styled.div`
  display: flex;

  @media (min-width: 0px) and (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }

`
const LeftContainer = styled.div`
  background-color: #fff;
  border-right: 1px solid var(--color-borders);
  width: 27%;
  padding-top: 1rem;

  @media (min-width: 1131px) and (max-width: 2000px) {
    width: 27%;
  }

  @media (min-width: 900px) and (max-width: 1130px) {
    width: 35%;
  }

  @media (min-width: 768px) and (max-width: 899px) {
    width: 45%;
  }

  @media (min-width: 0px) and (max-width: 767px) {
    width: 100%;
  }
`
const RightContainer = styled.div`
  background-color: transparent;
  width: 73%;
  padding-top: 1rem;
  height: 100%;

  @media (min-width: 1131px) and (max-width: 2000px) {
    width: 73%;
  }

  @media (min-width: 900px) and (max-width: 1130px) {
    width: 65%;
  }

  @media (min-width: 768px) and (max-width: 899px) {
    width: 55%;
  }

  @media (min-width: 0px) and (max-width: 767px) {
    width: 100%;
  }
`

export default Homepage;
