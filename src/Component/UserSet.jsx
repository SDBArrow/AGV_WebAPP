import React from 'react';
import UpdateUserData from './UpdateUserData';
import UpdatePassword from './UpdatePassword';

function UserSet() {

  return (
    <div className='flex justify-evenly items-center flex-wrap '>
      <UpdatePassword />
      <UpdateUserData />
    </div>
  );
}

export default UserSet;