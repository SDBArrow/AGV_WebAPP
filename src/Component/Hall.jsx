import React from 'react';
import UpdateCarSet from './UpdateCarSet';
import ViewCarSet from './ViewCarSet';

function Hall() {

  return (
    <div className='flex justify-evenly items-center flex-wrap '>
      <ViewCarSet />
      <UpdateCarSet />
    </div>
  );
}

export default Hall;