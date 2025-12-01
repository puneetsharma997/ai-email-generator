import styled from '@emotion/styled';
import { Button } from 'antd';
import SubscriptionIcon from '../../assets/credit-card-icon.png';
import { StyledCardHeader } from './ProfileCard';

const Subscription = () => {
  return (
    <Container style={{ color: 'var(--color-black-label) !important' }}>
      <StyledCardHeader iconMargin='0.1rem 0rem 0rem 0rem'>
        <img src={SubscriptionIcon} />
        <p>Subscription</p>
      </StyledCardHeader>

      <Content>
        <StyledP>Current Plan</StyledP>
        <StyledText>Free</StyledText>
      </Content>

      <Description>
        Upgrade to Pro for unlimited email generation, fast AI responses and priority support.
      </Description>

      <ButtonContainer>
        <StyledBadge><p>Coming Soon</p></StyledBadge>
        <DisabledButton>Upgrade to Pro</DisabledButton>
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;  
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--color-primary-gradient-hover);
  padding: 0.8rem 0.8rem;
  border-radius: 0.6rem;
  margin-top: 1.5rem;
`

const StyledP = styled.p`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--color-secondary-grey-label);
`

const StyledText = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-label);
`

const Description = styled.p`
  margin: 1rem 0rem 0rem 0rem;
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--color-grey-label);
  line-height: 1.5;
`

const ButtonContainer = styled.div`
  width: 100%;
  position: relative;
  margin-top: 1.5rem;
  pointer-events: none;
`

const StyledBadge = styled.div`
  position: absolute;
  top: -10px;
  right: -0.6rem;
  background: #e9984bff;
  color: #fff;
  padding: 0.25rem 0.75rem 0.3rem 0.75rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  z-index: 2;
  >p {
    margin: 0rem;
  }
`

const DisabledButton = styled(Button)`
  width: 100%;
  height: 2.5rem;
  border-radius: 0.8rem !important;
  background: #e3e5e9 !important;
  border: none !important;
  color: var(--color-grey-label) !important;
  font-size: 0.9rem;
  font-weight: 500;

  &:hover,
  &:focus,
  &:active {
    background: #e3e5e9 !important;
    color: var(--color-grey-label) !important;
    border: none !important;
    box-shadow: none !important;
  }
`

export default Subscription;
