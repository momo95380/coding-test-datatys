import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Button,
  Stack,
} from '@mui/joy';
import useAuth from '../../hooks/useAuth';
import { deleteCurrentUser, updateCurrentUser } from '../../api/user';
import FormInput from './FormInput';

export default function UpdateUserForm() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const methods = useForm({
    defaultValues: {
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      country: user.country || '',
      city: user.city || '',
      phoneNumber: user.phone_number || '',
      position: user.position || '',
    },
  });

  const { reset } = methods;

  // Set the form values to user data on any update
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        country: user.country || '',
        city: user.city || '',
        phoneNumber: user.phone_number || '',
        position: user.position || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      await updateCurrentUser(data);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const onDelete = async () => {
    try {
      await deleteCurrentUser();
      navigate('/login');
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2}>
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
            Update Profile
          </Button>
          <Button onClick={onDelete} fullWidth>
            Delete Profile
          </Button>
          <Button onClick={onLogout} fullWidth>
            Logout
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
