import React, { useState, useEffect } from 'react';

function Battery_Percentage(popup) {

  const [power, setPower] = useState(0);
  const [delay, setDelay] = useState(false);

  useEffect(() => {
    setPower(popup.power)
  }, []);

  useEffect(() => {
    setTimeout(function () {
      setPower(popup.power)
      console.log(power)
      setDelay(!delay)
    }, 3000);
  }, [delay]);

  var scope = {
    full: {
      width: 100
    },
    three_quarters: {
      width: 75
    },
    half: {
      width: 50
    },
    quarter: {
      width: 25
    },
    low: {
      width: 10
    }
  }

  return (
    <div>
      <div className="mt-10 text-blue-600 text-2xl text-center">車子電量</div>
      <div className={`w-48 mt-5 grid justify-items-center ${power > 75 ? "" : "hidden"}`}>
        <div className="shadow w-1/2 rounded border-2 border-gray-400 flex my-1 relative">
          <div
            className="border-r-8 h-6 rounded-r absolute flex border-gray-400 ml-24 mt-2 z-10"></div>
          <div
            className="cursor-default bg-green-400 text-xs font-bold leading-none flex items-center justify-center m-1 py-4 text-center text-white"
            style={scope.full}>
            <div className="absolute left-0 mx-8 text-gray-700"></div>
          </div>
        </div>
      </div>

      <div className={`w-48 mt-5 grid justify-items-center ${power > 50 && power <= 75 ? "" : "hidden"}`}>
        <div className="shadow w-1/2 rounded border-2 border-gray-400 flex my-1 relative">
          <div
            className="border-r-8 h-6 rounded-r absolute flex border-gray-400 ml-24 mt-2 z-10"></div>
          <div
            className="cursor-default bg-green-400 text-xs font-bold leading-none flex items-center justify-center m-1 py-4 text-center text-white"
            style={scope.three_quarters}>
            <div className="absolute left-0 mx-8 text-gray-700"></div>
          </div>
        </div>
      </div>

      <div className={`w-48 mt-5 grid justify-items-center ${power > 25 && power <= 50 ? "" : "hidden"}`}>
        <div className="shadow w-1/2 rounded border-2 border-gray-400 flex my-1 relative">
          <div
            className="border-r-8 h-6 rounded-r absolute flex border-gray-400 ml-24 mt-2 z-10"></div>
          <div
            className="cursor-default bg-yellow-400 text-xs font-bold leading-none flex items-center justify-center m-1 py-4 text-center text-white"
            style={scope.half}>
            <div className="absolute left-0 mx-8 text-gray-700"></div>
          </div>
        </div>
      </div>

      <div className={`w-48 mt-5 grid justify-items-center ${power > 10 && power <= 25 ? "" : "hidden"}`}>
        <div className="shadow w-1/2 rounded border-2 border-gray-400 flex my-1 relative">
          <div
            className="border-r-8 h-6 rounded-r absolute flex border-gray-400 ml-24 mt-2 z-10"></div>
          <div
            className="cursor-default bg-gray-400 text-xs font-bold leading-none flex items-center justify-center m-1 py-4 text-center text-white"
            style={scope.quarter}>
            <div className="absolute left-0 mx-8 text-gray-700"></div>
          </div>
        </div>
      </div>

      <div className={`w-48 mt-5 grid justify-items-center ${power <= 10 ? "" : "hidden"}`}>
        <div className="shadow w-1/2 rounded border-2 border-gray-400 flex my-1 relative">
          <div
            className="border-r-8 h-6 rounded-r absolute flex border-gray-400 ml-24 mt-2 z-10"></div>
          <div
            className="cursor-default bg-red-400 text-xs font-bold leading-none flex items-center justify-center m-1 py-4 text-center text-white"
            style={scope.low}>
            <div className="absolute left-0 mx-8 text-red-400"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path></svg></div>
          </div>
        </div>
      </div>

    </div >
  );
}

export default Battery_Percentage;