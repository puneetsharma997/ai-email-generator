import styled from "@emotion/styled"
import { Input, Select } from "antd"
import { emailLengthOptions, emailToneOptions } from "../../utils/constants"

const ReplyEmail = ({ replyEmailValues, setReplyEmailValues }) => {

  // onchange function for input fields
  const handleOnChangeFields = (type, value) => {
    setReplyEmailValues((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  return (
    <Container style={{ color: 'var(--color-black-label) !important' }}>

      {/* Original email section */}
      <OriginalEmailWrapper>
        <StyledLabel>Original Email</StyledLabel>
        <StyledTextArea
          placeholder='Paste the email you want to reply to here...'
          style={{ marginTop: '0.3rem' }}
          onChange={(e) => handleOnChangeFields('originalEmail', e?.target?.value)}
          value={replyEmailValues?.originalEmail}
        />
        <StyledInfoText>Paste the complete email from the other participant</StyledInfoText>
      </OriginalEmailWrapper>

      {/* Type and Length section */}
      <TypeLengthWrapper>
        <ToneContainer>
          <StyledLabel>Tone</StyledLabel>
          <StyledSelect
            placeholder='Select tone'
            onChange={(value) => handleOnChangeFields('tone', value)}
            options={emailToneOptions}
            value={replyEmailValues?.tone}
            style={{ marginTop: '0.3rem' }}
          />
        </ToneContainer>

        <LengthWrapper>
          <StyledLabel>Length</StyledLabel>
          <StyledSelect
            placeholder='Select tone'
            onChange={(value) => handleOnChangeFields('length', value)}
            options={emailLengthOptions}
            value={replyEmailValues?.length}
            style={{ marginTop: '0.3rem' }}
          />
        </LengthWrapper>
      </TypeLengthWrapper>

      {/* Original email section */}
      <CommentsWrapper>
        <StyledLabel>Your Comments/ Key Points</StyledLabel>
        <StyledTextArea
          placeholder='Add your comments, questions, or key points you want to include in the reply...'
          style={{ marginTop: '0.3rem' }}
          onChange={(e) => handleOnChangeFields('comments', e?.target?.value)}
          value={replyEmailValues?.comments}
        />
        <StyledInfoText>What do you want to say in your reply?</StyledInfoText>
      </CommentsWrapper>

    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`

const TypeLengthWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`

const StyledLabel = styled.p`
  margin: 0rem;
  font-size: 0.9rem;
  font-weight: 500;
`

const StyledInfoText = styled.p`
  margin: 0rem;
  font-size: 0.77rem;
  font-weight: 400;
  color: var(--color-grey-label);
  font-style: italic;
`

const ToneContainer = styled.div`
  width: 100%;
`

const LengthWrapper = styled.div`
  width: 100%;
`

const OriginalEmailWrapper = styled.div`
  width: 100%;
`

const CommentsWrapper = styled.div`
  width: 100%;
`

const StyledSelect = styled(Select)`
  width: 100%;
  height: 2.3rem;

  &.ant-select-focused {
    --ant-select-active-border-color: var(--color-primary-purple-hover) !important;
    --ant-select-active-outline-color: var(--color-tabs-hover) !important;
  }

  &.ant-select-outlined {
    --ant-select-border-color: var(--color-primary-purple-hover) !important;

    &:hover {
      border-color: var(--color-primary-purple-hover) !important;
    }
  }
`

const StyledTextArea = styled(Input.TextArea)`
  width: 100%;
  min-height: 9rem !important;

  &.ant-input-outlined:focus {
    border-color: var(--color-primary-purple-hover) !important;
    box-shadow: 0 0 0 2px var(--color-tabs-hover) !important;
  }

  &.ant-input-outlined:hover {
    border-color: var(--color-primary-purple-hover) !important;
  }
`

export default ReplyEmail;
