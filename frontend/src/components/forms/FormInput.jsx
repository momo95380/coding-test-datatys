import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  Typography,
} from '@mui/joy';
import PropTypes from 'prop-types';

/**
 * Form input component
 * @param {string} name
 * @param {string} label
 * @param {string} [type='text']
 * @param {object} [validation]
 * @param {string} [placeholder]
 */
export default function FormInput({
  name,
  label,
  type = 'text',
  validation = {},
  placeholder = '',
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl error={!!errors[name]}>
      <FormLabel>{label}</FormLabel>
      <Input
        {...register(name, validation)}
        type={type}
        placeholder={placeholder}
      />
      {errors[name] && (
        <Typography level="body-xs" color="danger">
          {errors[name].message}
        </Typography>
      )}
    </FormControl>
  );
}

FormInput.defaultProps = {
  type: 'text',
  validation: {},
  placeholder: '',
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  validation: PropTypes.shape({
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    minLength: PropTypes.shape({
      value: PropTypes.number,
      message: PropTypes.string,
    }),
    pattern: PropTypes.shape({
      value: PropTypes.instanceOf(RegExp),
      message: PropTypes.string,
    }),
    validate: PropTypes.func,
  }),
  placeholder: PropTypes.string,
};
