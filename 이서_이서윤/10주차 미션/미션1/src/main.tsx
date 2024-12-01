import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {LoginContextProvider} from '../content/LoginText';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
    </StrictMode>
  );
}
