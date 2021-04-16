import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
      <MemoryRouter>
          <App />
      </MemoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
