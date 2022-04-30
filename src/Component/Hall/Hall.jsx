import React from 'react';
import ChoseCarSet from './ChoseCarSet';
import ViewCarSet from './ViewCarSet';

function Hall() {

  return (
    <div className='flex justify-evenly items-center flex-wrap '>
      <ViewCarSet />
      <ChoseCarSet />
    </div>
  );
}

export default Hall;