import './index.css';

import {ThemeProvider} from '@emotion/react';
import {createTheme} from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const theme = createTheme ({
  typography: {
    fontFamily: ['"Montserrat"', 'sans-serif'].join (','),
  },
});

const root = ReactDOM.createRoot (document.getElementById ('root'));
root.render (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
