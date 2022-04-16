import React, { useState, useEffect } from 'react';

function Mode_Change() {

  const [mode, setMode] = useState(true)
  const [goal_name, setGoalName] = useState("")

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("goal_name", goal_name);
  }, [goal_name]);

  function change_mode() {
    setMode(!mode)
  }

  const GetGoalName = (event) => {
    setGoalName(event.target.value)
  }

  return (
          <div className=' bg-indigo-50 rounded-3xl py-10 select-none px-4 mt-5 grid justify-items-center'>
            <div className='font-serif text-xl font-bold'>模式控制</div>
            <div className='flex h-10 w-20 rounded-full mt-5 bg-gray-300 relative'>
              <label htmlFor="check">
                <input type="checkbox" id="check" className="sr-only peer" />
                <span className='w-2/5 h-4/5 bg-red-500 absolute rounded-full left-1 top-1 peer-checked:bg-blue-500 peer-checked:left-11 transition-all duration-500' onClick={change_mode} >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={`${mode ? "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" : "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"}`} />
                  </svg>
                </span>
              </label>
            </div>
            <div className="mt-5 font-serif text-center text-blue-600">Mode：{mode ? "新增模式" : "導航模式"}</div>
            <div className={`bg-white rounded-2xl w-40 py-3 mt-5 ${mode ? "" : "hidden"}`}>
              <label className="ml-4">新增的目標名稱：</label>
              <input className="h-7 w-32 mt-1 ml-4 pl-1" placeholder="座位1" onChange={GetGoalName} />
            </div>
          </div>
  );
}

export default Mode_Change;