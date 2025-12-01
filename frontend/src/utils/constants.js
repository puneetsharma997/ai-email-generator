import FollowUp from '../assets/followup.png';
import Introduction from '../assets/introduction.png';
import ThankYou from '../assets/thankyou.png';

export const emailTypeOptions = [
  {
    value: 'professional',
    label: 'Professional',
  },
  {
    value: 'follow up',
    label: 'Follow-up',
  },
  {
    value: 'thank you',
    label: 'Thank You',
  },
  {
    value: 'introduction',
    label: 'Introduction',
  },
  {
    value: 'apology',
    label: 'Apology',
  },
  {
    value: 'request',
    label: 'Request',
  },
  {
    value: 'resignation',
    label: 'Resignation',
  },
]

export const emailToneOptions = [
  {
    value: 'professional',
    label: 'Professional',
  },
  {
    value: 'friendly',
    label: 'Friendly',
  },
  {
    value: 'formal',
    label: 'Formal',
  },
  {
    value: 'casual',
    label: 'Casual',
  },
  {
    value: 'apologetic',
    label: 'Apologetic',
  },
]

export const emailLengthOptions = [
  {
    value: 'short',
    label: 'Short',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'long',
    label: 'Long',
  },
]

export const templatesData = [
  {
    id: 'followup', label: 'Follow-up', icon: FollowUp,
  },
  {
    id: 'thankyou', label: 'Thank You', icon: ThankYou,
  },
  {
    id: 'introduction', label: 'Introduction', icon: Introduction,
  },
];

export const followUpTemplate = {
  type: 'follow up',
  tone: 'professional',
  recipient: 'John Doe',
  subject: 'Following up on our meeting last week',
  details: 'Thank you again for meeting with me last week. I wanted to follow up regarding the proposal we reviewed and check whether you had any questions or would like any additional information from my side.',
  length: 'short'
}

export const introductionTemplate = {
  type: 'introduction',
  tone: 'professional',
  recipient: 'Tom Holland',
  subject: 'Introduction and Opportunity to Connect',
  details: 'I hope you are doing well. My name is Tom Holland, and I wanted to reach out to introduce myself. I believe there may be an opportunity for us to collaborate, and I would welcome the chance to connect and learn more about your work.',
  length: 'short'
}

export const thankYouTemplate = {
  type: 'thank you',
  tone: 'friendly',
  recipient: 'Peter Parker',
  subject: 'Thank you for your help',
  details: 'I wanted to thank you for your assistance with the client presentation yesterday. Your insights and support were invaluable and helped us secure the deal.',
  length: 'short'
}

export const authErrorMessages = {
  invalid_credentials: 'Email or password is incorrect.',
  email_not_confirmed: 'Email not verified. Check your inbox for the confirmation link.',
  email_address_invalid: 'Invalid email. Please use different email address.',
  email_exists: 'This email is already registered.',
  over_email_send_rate_limit: 'Email limit reached. Please wait before trying again.',
  over_request_rate_limit: 'Too many requests. Please try again later.',
  same_password: "New password can’t be the same as the old one.",
  user_already_exists: 'This user is already exists.',
  user_not_found: 'User not found',
  weak_password: 'Weak password. Try using letters, numbers, and symbols.'
}

export const tokenExpiredMessage = 'Session expired. Please log in again.'