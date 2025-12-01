import styled from "@emotion/styled";
import { useEmailGeneratorStore } from "../../store/store";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import ProfileCard from "./ProfileCard";
import StatsCard from "./StatsCard";
import Subscription from "./Subscription";

const Profile = () => {

  const { usageDetails } = useEmailGeneratorStore();

  return (
    <Container>
      {/* heading section */}
      <HeadingWrapper>
        <Heading>Account Settings</Heading>
        <SubHeading>Manage your account and preferences</SubHeading>
      </HeadingWrapper>

      <Content>
        {/* stats card section */}
        <StatsContainer>
          <StatsCard title={usageDetails?.usedToday || 0} subTitle='Emails Generated' titleStyle={{ fontSize: '2rem' }} />
          <StatsCard title={usageDetails?.remaining || 0} subTitle='Emails Pending' titleStyle={{ fontSize: '2rem' }} />
          <StatsCard title={'Free'} subTitle='Current Plan' />
        </StatsContainer>

        <ProfileSubContainer>
          {/* profile card section */}
          <StyledCard>
            <ProfileCard />
          </StyledCard>

          {/* subscription card section */}
          <StyledCard>
            <Subscription />
          </StyledCard>
        </ProfileSubContainer>

        {/* security card section */}
        <SecurityContainer>
          <StyledCard>
            <ChangePassword />
          </StyledCard>
        </SecurityContainer>

        {/* Delete account section */}
        <DeleteAccount />

      </Content>
    </Container>
  )
}

const Container = styled.div`
  max-width: 56rem;
  margin: 0 auto 2rem auto;
  margin-top: 5rem;
  width: 100%;
`
const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  margin-top: 7rem;
`
const Heading = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary-purple);
  margin: 0rem;
`
const SubHeading = styled.p`
  margin: 0.3rem 0rem 0rem 0rem;
  font-size: 0.98rem;
  font-weight: 400;
  color: var(--color-secondary-grey-label);
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 2rem;
`
const ProfileSubContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  margin-top: 1rem;
`

const SecurityContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  margin-top: 1rem;
`
const StyledCard = styled.div`
  border: 1px solid var(--color-borders);
  border-radius: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.03);
  background: #fff;
  padding: 1.5rem 1.8rem;
  width: 100%;

  &:hover {
    box-shadow: 0 3px 6px rgba(120, 105, 235, 0.18), 0 2px 4px rgba(120, 105, 235, 0.10);
  }
`

export default Profile;
