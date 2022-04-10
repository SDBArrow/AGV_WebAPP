import React, { useState, useEffect } from 'react';
import Connection from './Connection';
import RobotState from './RobotState';
import Map from './Map';
import ViewGaolSet from './ViewGoalSet';

function HighCtrl() {

  const [mode, setMode] = useState(true)

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  function change_mode() {
    setMode(!mode)
  }

  return (
    <div>
      <p className="text-center text-5xl mt-5">AGV Set Page</p>
      <Connection />
      <div className="flex justify-evenly items-center flex-wrap-reverse ">
        <ViewGaolSet />
        <div>
          <div className='h-10 w-20 rounded-full bg-gray-100 relative'>
            <label htmlFor="check">
              <input type="checkbox" id="check" className="sr-only peer" />
              <span className='w-2/5 h-4/5 bg-red-500 absolute rounded-full left-1 top-1 peer-checked:bg-blue-500 peer-checked:left-11 transition-all duration-500' onClick={change_mode} >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={`${mode ? "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" : "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"}`} />
                </svg>
              </span>
            </label>
          </div>
          <RobotState />
        </div>
        <Map />
      </div>
    </div>
  );
}

export default HighCtrl;