import React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import AuthProvider from './auth/AuthProvider';
import Router from './router/Router';

function App() {
  const theme = extendTheme({
    fontFamily: {
      body: 'Source Sans Pro, sans-serif',
      display: 'Source Sans Pro, sans-serif',
    },
    components: {
      JoyButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#153376',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#153376',
            },
          },
        },
      },
    },
  });

  return (
    <BrowserRouter>
      <CssVarsProvider theme={theme}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </CssVarsProvider>
    </BrowserRouter>
  );
}

export default App;
