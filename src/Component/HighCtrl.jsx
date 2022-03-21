import React from 'react';
import Connection from './Connection';
import RobotState from './RobotState';
import Map from './Map';

function ControlPage() {

  return (
    <div>
      <p className="text-center text-5xl mt-5">AGV Set Page</p>
      <Connection />
      <div className="flex justify-center items-center gap-60">
        <RobotState />
        <Map />
      </div>
    </div>
  );
}

export default ControlPage;