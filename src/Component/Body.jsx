import React from 'react';
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