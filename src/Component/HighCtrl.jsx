import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Connection from './Connection';
import Teleoperation from './Teleoperation';
import RobotState from './RobotState';
import Map from './Map';

function ControlPage() {

  return (
    <div>
      <p className="text-center text-5xl mt-5">AGV Control Page</p>
      <Connection />
      <Teleoperation />
      <h1>MAP</h1>
      <Map></Map>
      <RobotState />
    </div>
  );
}

export default ControlPage;