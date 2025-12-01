import styled from '@emotion/styled';
import { Input, Select } from 'antd';
import toast from 'react-hot-toast';
import { emailLengthOptions, emailToneOptions, emailTypeOptions, followUpTemplate, introductionTemplate, templatesData, thankYouTemplate } from '../../utils/constants';
import CustomToast from '../CustomToast/CustomToast';

const GenerateEmail = ({ genEmailValues, setGenEmailValues }) => {

  // onchange function for input fields
  const handleOnChangeFields = (type, value) => {
    setGenEmailValues((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  // on click function for quick templates
  const handleQuickTemplatesClick = (template) => {
    if (template?.id === 'followup') {
      setGenEmailValues(followUpTemplate);
    }
    else if (template?.id === 'thankyou') {
      setGenEmailValues(thankYouTemplate);
    }
    else if (template?.id === 'introduction') {
      setGenEmailValues(introductionTemplate);
    }

    toast.dismiss();
    CustomToast({
      message: 'Template loaded! Click Generate to create your email.',
      type: 'success'
    });
  }

  return (
    <Container style={{ color: 'var(--color-black-label) !important' }}>

      <QuickTemplatesContainer>
        <StyledText>Quick templates</StyledText>

        <StyledTemplates>
          {templatesData?.map((item) => {
            return (
              <Template title={item?.label} key={item?.id} onClick={() => handleQuickTemplatesClick(item)}>
                <img src={item?.icon} />
              </Template>
            )
          })}
        </StyledTemplates>
      </QuickTemplatesContainer>

      {/* Type and Tone section */}
      <TypeToneWrapper>
        <TypeContainer>
          <StyledLabel>Type</StyledLabel>
          <StyledSelect
            placeholder="Select type"
            onChange={(value) => handleOnChangeFields('type', value)}
            options={emailTypeOptions}
            value={genEmailValues?.type}
            style={{ marginTop: '0.3rem' }}
          />
        </TypeContainer>

        <ToneContainer>
          <StyledLabel>Tone</StyledLabel>
          <StyledSelect
            placeholder='Select tone'
            onChange={(value) => handleOnChangeFields('tone', value)}
            options={emailToneOptions}
            value={genEmailValues?.tone}
            style={{ marginTop: '0.3rem' }}
          />
        </ToneContainer>
      </TypeToneWrapper>

      {/* Recipient section */}
      <RecipientWrapper>
        <StyledLabel>Recipient</StyledLabel>
        <StyledInput
          placeholder='e.g., John Doe, HR Manager'
          style={{ marginTop: '0.3rem' }}
          onChange={(e) => handleOnChangeFields('recipient', e?.target?.value)}
          value={genEmailValues?.recipient}
        />
      </RecipientWrapper>

      {/* Subject section */}
      <SubjectWrapper>
        <StyledLabel>Subject</StyledLabel>
        <StyledInput
          placeholder='Subject of the email'
          style={{ marginTop: '0.3rem' }}
          onChange={(e) => handleOnChangeFields('subject', e?.target?.value)}
          value={genEmailValues?.subject}
        />
      </SubjectWrapper>

      {/* Context/Details section */}
      <SubjectWrapper>
        <StyledLabel>Context/Details</StyledLabel>
        <StyledTextArea
          placeholder='Enter key details to include...'
          style={{ marginTop: '0.3rem' }}
          onChange={(e) => handleOnChangeFields('details', e?.target?.value)}
          value={genEmailValues?.details}
        />
      </SubjectWrapper>

      {/* Length section */}
      <LengthWrapper>
        <StyledLabel>Length</StyledLabel>
        <StyledSelect
          placeholder='Select length'
          onChange={(value) => handleOnChangeFields('length', value)}
          options={emailLengthOptions}
          value={genEmailValues?.length}
          style={{ marginTop: '0.3rem' }}
        />
      </LengthWrapper>

    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`
const QuickTemplatesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: var(--color-primary-gradient-hover);
  padding: 0.8rem 0rem;
  border-radius: 0.6rem;
  gap: 0.6rem;

  @media (min-width: 100px) and (max-width: 300px) {
    display: none;
  }
`
const StyledText = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-grey-label);
  margin-left: 1rem;
`
const StyledTemplates = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-right: 1rem;
`
const Template = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-borders);
  border-radius: 0.6rem;
  padding: 0.7rem 0.7rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, border 0.2s ease-in-out, background 0.2s ease-in-out;

  img {
    width: 1.9rem;
    height: 1.9rem;
  }

  &:hover {
    transform: scale(1.12);
    border: 1px solid var(--color-primary-purple);
    background: linear-gradient(135deg, rgba(138, 131, 242, 0.2), rgba(125, 143, 251, 0.2), rgba(111, 202, 255, 0.2));
  }
`
const TypeToneWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  @media (min-width: 100px) and (max-width: 300px) {
    display: flex;
    flex-direction: column;
  }
`
const TypeContainer = styled.div`
  width: 100%;
`
const StyledLabel = styled.p`
  margin: 0rem;
  font-size: 0.9rem;
  font-weight: 500;
`
const ToneContainer = styled.div`
  width: 100%;
`
const RecipientWrapper = styled.div`
  width: 100%;
`
const SubjectWrapper = styled.div`
  width: 100%;
`
const LengthWrapper = styled.div`
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

const StyledInput = styled(Input)`
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

const StyledTextArea = styled(Input.TextArea)`
  width: 100%;
  min-height: 5rem !important;

  &.ant-input-outlined:focus {
    border-color: var(--color-primary-purple-hover) !important;
    box-shadow: 0 0 0 2px var(--color-tabs-hover) !important;
  }

  &.ant-input-outlined:hover {
    border-color: var(--color-primary-purple-hover) !important;
  }
`

export default GenerateEmail;
