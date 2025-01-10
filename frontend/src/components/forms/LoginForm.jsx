import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Typography,
  Button,
  Stack,
} from '@mui/joy';
import useAuth from '../../hooks/useAuth';
import FormInput from './FormInput';

export default function LoginForm() {
  const [error, setError] = useState(false);
  const methods = useForm();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);
    if (!result.success) {
      setError(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            validation={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            validation={{
              required: 'Password is required',
              minLength: {
                value: 3,
                message: 'Password must be at least 3 characters',
              },
            }}
          />
          <Button type="submit" fullWidth>
            Sign in
          </Button>
          {error && (
            <Typography level="body-xs" color="danger">
              Invalid email or password
            </Typography>
          )}
        </Stack>
      </form>
    </FormProvider>
  );
}
