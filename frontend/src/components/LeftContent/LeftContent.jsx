import { EditOutlined, MessageOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Tabs, Tag } from 'antd';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ReplyIcon from '../../assets/reply-icon.png';
import WandIcon from '../../assets/wand-icon.png';
import { useEmailGeneratorStore } from '../../store/store';
import Auth from '../Auth/Auth';
import CustomButton from '../CustomButton/CustomButton';
import CustomToast from '../CustomToast/CustomToast';
import GenerateEmail from './GenerateEmail';
import ReplyEmail from './ReplyEmail';

const LeftContent = ({ genEmailValues, setGenEmailValues, replyEmailValues, setReplyEmailValues, isLoading = false, generateEmail = () => { } }) => {

  const { accessToken, usageDetails } = useEmailGeneratorStore();

  const emailCount = usageDetails?.remaining;
  const [activeTab, setActiveTab] = useState('generate');
  const [showModal, setShowModal] = useState(false);

  // tab items
  const items = [
    {
      key: 'generate', label: 'Generate Email',
      children: <GenerateEmail genEmailValues={genEmailValues} setGenEmailValues={setGenEmailValues} />,
      icon: <EditOutlined />
    },
    {
      key: 'reply', label: 'Reply to Email',
      children: <ReplyEmail replyEmailValues={replyEmailValues} setReplyEmailValues={setReplyEmailValues} />,
      icon: <MessageOutlined />
    },
  ];

  // onchange function for tab change
  const onTabChange = (activeKey) => {
    setActiveTab(activeKey);
  }

  // function to return the extra button content
  const getButtonChildren = () => {
    if (accessToken === null) {
      return;
    }
    else {
      if (isLoading) {
        return `Generating...`
      }
      else if (!isLoading) {
        return `${emailCount}/3 Free`
      }
    }
  }

  // function to get tag color code
  const getColorForTag = () => {
    if (emailCount <= 1) {
      return 'var(--color-error)';
    }
    else if (emailCount <= 2) {
      return 'var(--color-warning)';
    }
    else {
      return 'transparent';
    }
  }

  // generate email button onclick function
  const handleGenerateBtnClick = () => {
    if (accessToken === null) {
      setShowModal(true);
      return;
    }
    else if (emailCount === 0) {
      toast.dismiss();
      CustomToast({
        type: 'error',
        message: 'Daily limit reached',
        duration: 5000,
      });
      return;
    }
    else {
      if (activeTab === 'generate') {
        generateEmail('email');
      }
      else if (activeTab === 'reply') {
        generateEmail('reply');
      }
    }
  }

  return (
    <Container>

      {/* Show Login or Sign up modal if user is not logged in and try to generate email */}
      {showModal && <Auth showModal={showModal} setShowModal={setShowModal} />}

      <StyledTab
        items={items}
        onChange={onTabChange}
        activeKey={activeTab}
      />

      <StyledHR />

      <div style={{ marginTop: '1.2rem' }}>
        <CustomButton
          style={{ width: '100%', height: '2.7rem', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}
          label={activeTab === 'generate' ? 'Generate Email' : 'Reply Email'}
          icon={
            activeTab === 'generate' ? <img src={WandIcon} style={{ width: '1.2rem', height: '1.2rem' }} />
              : <img src={ReplyIcon} style={{ width: '1.2rem', height: '1.2rem' }} />
          }
          onClick={handleGenerateBtnClick}
          children={accessToken && usageDetails &&
            <StyledTag
              style={{
                backgroundColor: getColorForTag(), border: emailCount >= 3 ? '1px solid #fff' : 'none',
                fontSize: isLoading ? '0.7rem' : '0.8rem'
              }}
            >
              {getButtonChildren()}
            </StyledTag>
          }
        />
      </div>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 0.5rem;
  margin: 0rem 1.2rem;
`

const StyledTab = styled(Tabs)`
  .ant-tabs-nav {
    border-bottom: 1px solid var(--color-borders) !important;
  }

  .ant-tabs-nav-list {
    display: flex;
    width: 100%;
  }

  .ant-tabs-tab {
    flex: 1;
    justify-content: center;
    border-bottom: 2px solid transparent;
    padding: 0.5rem 0rem !important;

    &:hover {
      background: var(--color-primary-gradient-hover);
      border-radius: 0.6rem 0.6rem 0rem 0rem;
    }
  }

  .ant-tabs-tab-active {
    background: linear-gradient(135deg, rgba(138, 131, 242, 0.25), rgba(125, 143, 251, 0.25),rgba(111, 202, 255, 0.25)) !important;
    border-radius: 0.6rem 0.6rem 0rem 0rem;
    border-bottom: 2px solid var(--color-primary-purple);

    &:hover {
      background: background: linear-gradient(135deg, rgba(138, 131, 242, 0.25), rgba(125, 143, 251, 0.25),rgba(111, 202, 255, 0.25)) !important; !important;
    }
  }

  /* Active tab text color */
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: var(--color-primary-purple) !important;
    font-weight: 500;
  }

  /* Non-active tabs */
  .ant-tabs-tab .ant-tabs-tab-btn {
    color: var(--color-grey-label);
    font-weight: 500;
  }

  .ant-tabs-ink-bar {
    display: none;
  }
`
const StyledHR = styled.div`
  border-bottom: 1px solid var(--color-borders);
  width: 100%;
  margin-top: 2rem;
`
const StyledTag = styled(Tag)`
  border-radius: 1rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  color: #fff;
  margin-left: 0.5rem;
`

export default LeftContent;
