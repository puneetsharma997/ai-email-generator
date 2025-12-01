import styled from '@emotion/styled'

const StaticMailTemplate = () => {
  return (
    <Container>
      <div>
        <StyledText>Subject</StyledText>
        <StyledText style={{ fontWeight: 500, fontSize: '1rem', marginTop: '0.4rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-borders)' }}>
          Application for Marketing Manager Position
        </StyledText>
      </div>

      <Content>
        <StyledP>Dear Hiring Manager,</StyledP>
        <br />
        <StyledP>
          I'm writing to express my interest in the Marketing Manager role. With 6+ years leading multi-channel campaigns and a proven record of increasing qualified pipeline by 32%, I'm confident I can help Innovatech Solutions accelerate growth.
        </StyledP>
        <br />
        <StyledP>
          In my current role at BetaTech, I built the paid + lifecycle strategy across Google Ads, Facebook, and email that reduced CPA by 18% while improving MQL quality. I also partnered with Sales to implement lead scoring, improving SAL conversion by 20%.
        </StyledP>
        <br />
        <StyledP>
          I'd welcome the chance to share a brief plan for your Q1 launch and how I'd prioritize quick wins in the first 90 days.
        </StyledP>
        <br />
        <StyledP>Best regards,</StyledP>
        <StyledP>Peter Parker</StyledP>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid var(--color-borders);
  border-radius: 0.6rem;
  padding: 0.6rem 0rem;
  margin-top: 0.5rem;
  width: 100%;
  width: 100%;
`

const Content = styled.div`
  width: 100%;
  max-width: calc(50rem - 200px);
  box-sizing: border-box;
  padding: 1rem 8rem 1rem 1.5rem;

  @media (min-width: 0px) and (max-width: 500px) {
    padding: 1rem 1rem 1rem 1rem;
  }
  @media (min-width: 501px) and (max-width: 768px) {
    padding: 1rem 4rem 1rem 1rem;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 1rem 2rem 1rem 1rem;
  }
`

const StyledText = styled.p`
  color: var(--color-grey-label);
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0;
  text-align: center; 
  padding: 0rem 1rem;
`
const StyledP = styled.p`
  color: var(--color-grey-label);
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  text-align: left;
  letter-spacing: 0.6px;
  line-height: 1.6;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`

export default StaticMailTemplate;
