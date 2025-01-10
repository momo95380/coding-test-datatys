import React from 'react';
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/forms/LoginForm';
import Sheet from '../components/common/Sheet';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <Sheet title="Login to your account">
      <LoginForm />
      <Button onClick={() => navigate('/register')} fullWidth sx={{ mt: 2 }}>
        Don&apos;t have an account? Sign up
      </Button>
    </Sheet>
  );
}

export default LoginPage;
