import styled from '@emotion/styled'

const StatsCard = ({ title, subTitle, titleStyle }) => {
  return (
    <Container>
      <Title style={{ ...titleStyle }} >{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 1.1rem 1.1rem 1.5rem 1.1rem;
  text-align: center;
  border: 1px solid var(--color-borders);
  border-radius: 0.6rem;
  gap: 0.5rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.03);

  &:hover {
    box-shadow: 0 3px 6px rgba(120, 105, 235, 0.18), 0 2px 4px rgba(120, 105, 235, 0.10);
  }
`
const Title = styled.p`
  margin: 0rem;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-primary-purple);
`
const SubTitle = styled.p`
  margin: 0rem;
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--color-secondary-grey-label);
  margin-top: 0.5rem;
`

export default StatsCard
