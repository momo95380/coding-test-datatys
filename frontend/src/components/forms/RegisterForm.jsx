import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Button,
  Stack,
} from '@mui/joy';
import useAuth from '../../hooks/useAuth';
import FormInput from './FormInput';

export default function RegisterForm() {
  const methods = useForm();
  const { register: registerUser } = useAuth();

  const onSubmit = async (data) => {
    const result = await registerUser(data);
    if (!result.success) {
      console.error(result.error);
    }
  };

  const password = methods.watch('password');

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
          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            validation={{
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            }}
          />
          <FormInput
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            validation={{
              required: 'First name is required',
            }}
          />
          <FormInput
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            validation={{
              required: 'Last name is required',
            }}
          />
          <FormInput
            name="country"
            label="Country"
            placeholder="Enter your country"
            validation={{
              required: 'Country is required',
            }}
          />
          <FormInput
            name="city"
            label="City"
            placeholder="Enter your city"
            validation={{
              required: 'City is required',
            }}
          />
          <FormInput
            name="phoneNumber"
            label="Phone Number"
            placeholder="Enter your phone number"
            validation={{
              required: 'Phone number is required',
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                message: 'Please enter a valid phone number',
              },
            }}
          />
          <FormInput
            name="position"
            label="Position"
            placeholder="Enter your position"
            validation={{
              required: 'Position is required',
            }}
          />
          <Button type="submit" fullWidth>
            Create Account
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
