import './index.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {ThemeProvider} from '@emotion/react';
import {createTheme} from '@mui/material';

const theme = createTheme ({
  typography: {
    fontFamily: `'Onest', sans - serif`,
    fontWeightLight: 300,
    fontWeightMedium: 400,
    fontWeightBold: 600,
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
