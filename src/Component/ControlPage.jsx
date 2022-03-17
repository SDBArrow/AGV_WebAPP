import React from 'react';
import Connection from './Connection';
import Teleoperation from './Teleoperation';
import RobotState from './RobotState';
import Map from './Map';
import Header from './Header'
import Footer from './Footer'

function ControlPage() {
    return (
        <div className='bg-background h-full w-screen'>

            <Header />
            <h1 className="text-center ">AGV Control Page</h1>

            <Connection />

            <Teleoperation />

            <h1>MAP</h1>
            <Map></Map>

            <RobotState />

            <Footer />
        </div>
    );
}

export default ControlPage;