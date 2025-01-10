import React from 'react';
import Sheet from '../components/common/Sheet';

import UpdateUserForm from '../components/forms/UpdateUserForm';

function ProfilePage() {
  return (
    <Sheet title="Update your profile">
      <UpdateUserForm />
    </Sheet>
  );
}

export default ProfilePage;
