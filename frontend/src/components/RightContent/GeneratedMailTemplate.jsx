import styled from '@emotion/styled';
import toast from 'react-hot-toast';
import CopyIcon from '../../assets/copy-icon.png';
import { useEmailGeneratorStore } from '../../store/store';
import CustomToast from '../CustomToast/CustomToast';

const GeneratedMailTemplate = () => {

  const { generatedEmail } = useEmailGeneratorStore();

  // function to copy to clipboard
  const handleCopyToClipboard = () => {

    toast.dismiss();
    navigator.clipboard
      .writeText(generatedEmail || '')
      .then(() => {
        CustomToast({
          message: 'Copied successfully',
          type: 'success'
        });
      })
      .catch((err) => {
        CustomToast({
          message: err,
          type: 'error'
        });
      });
  }

  return (
    <Container>
      <Header>
        <StyledHeading>Generated Email</StyledHeading>

        <ImgContainer onClick={handleCopyToClipboard}>
          <img src={CopyIcon} style={{ width: '1.2rem', height: '1.2rem', marginTop: '0.1rem' }} />
        </ImgContainer>
      </Header>

      <Content>
        <p>
          {generatedEmail}
        </p>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 0.5rem;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-borders);
  padding-bottom: 0.9rem;
`

const StyledHeading = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--color-primary-purple);
  margin: 0;
`

const ImgContainer = styled.div`
  background: var(--color-primary-gradient-hover);
  padding: 0.6rem 0.7rem;
  border-radius: 0.6rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: border 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    border: 1px solid var(--color-primary-purple-hover);
    transform: scale(1.1);
  }
`

const Content = styled.div`
  width: 100%;

  >p {
    width: 100%;
    margin-top: 1rem;
    white-space: pre-wrap;
    font-size: 1rem;
    line-height: 1.6rem;
    color: var(--color-text);
  }
`

export default GeneratedMailTemplate;
