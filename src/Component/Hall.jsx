import React from 'react';
import InputCarSet from './InputCarSet';
import UpdateCarSet from './UpdateCarSet';
import ViewCarSet from './ViewCarSet';

function Hall() {

  return (
    <div className='flex justify-evenly items-center flex-wrap '>
      <InputCarSet />
      <UpdateCarSet />
      <ViewCarSet />
    </div>
  );
}

export default Hall;