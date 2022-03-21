import React from 'react';
import UpdateUserData from './UpdateUserData';
import UpdatePassword from './UpdatePassword';

function UserSet() {

  return (
    <div className='flex justify-center items-center gap-60'>
      <UpdateUserData />
      <UpdatePassword />
    </div>
  );
}

export default UserSet;