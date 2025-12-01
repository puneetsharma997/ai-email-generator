import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './globalStyles.scss';

createRoot(document.getElementById('root')).render(
  <>
    <Toaster position='top-right' containerStyle={{ zIndex: '1001', top: '2rem', right: '1.5rem' }} toastOptions={{
      className: 'react-hot-toast'
    }} />

    <App />
  </>,
)
