import React from 'react';
import Sheet from '../components/common/Sheet';

import RegisterForm from '../components/forms/RegisterForm';

function RegisterPage() {
  return (
    <Sheet title="Create an account">
      <RegisterForm />
    </Sheet>
  );
}

export default RegisterPage;
