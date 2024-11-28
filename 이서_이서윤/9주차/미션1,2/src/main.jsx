import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../../미션1,2/src/App.jsx'
import { Provider } from 'react-redux'
import { store } from '../src/store/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
        <App />
    </Provider>
  </StrictMode>,
)
