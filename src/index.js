import './index.css';

import {ThemeProvider} from '@emotion/react';
import {createTheme} from '@mui/material';
import {Amplify} from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import config from './aws-exports';

const theme = createTheme ({
  typography: {
    fontFamily: ['"Montserrat"', 'sans-serif'].join (','),
  },
});

Amplify.configure (config);

const root = ReactDOM.createRoot (document.getElementById ('root'));
root.render (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
