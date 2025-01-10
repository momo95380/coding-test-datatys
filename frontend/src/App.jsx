import React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

import ProfilePage from './pages/profile';
import './App.css';

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
    <CssVarsProvider theme={theme}>
      <ProfilePage />
    </CssVarsProvider>
  );
}

export default App;
