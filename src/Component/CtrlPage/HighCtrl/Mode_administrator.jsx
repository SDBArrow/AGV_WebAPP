import React, { useState, useEffect } from 'react';
import Config from "../scripts/Config";

function Mode_Change() {

  const [ros, setROS] = useState(null)
  const [ip, setIP] = useState(localStorage.getItem("ip"))
  const [port, setPort] = useState(localStorage.getItem("port"))
  const [mode, setMode] = useState(true)
  const [goal_name, setGoalName] = useState("")

  useEffect(() => {
    init_connection()
    window.$stop = stop
    window.$clear_costmap = clear_costmap
  }, []);

  function init_connection() {

    var ros_ = new window.ROSLIB.Ros()
    console.log(ros);

    ros_.on("connection", () => {
      console.log("Connection established in Teleoperation Component!");
      console.log(ros_);
      setROS(ros_)
    });

    ros_.on("close", () => {
      console.log("Connection is Closed!");
      //每三秒自動連接
      setTimeout(() => {
        try {
          ros_.connect("ws://" + ip + ":" + port);
        } catch (error) {
          console.log("connection problem");
        }
      }, Config.RECONNECTION_TIMER);
    });

    try {
      ros_.connect("ws://" + ip + ":" + port);
    } catch (error) {
      console.log("ws://" + ip + ":" + port);
      console.log("connection problem");
    }
  }

  useEffect(() => {
    window.$mode = mode
  }, [mode]);

  useEffect(() => {
    window.$goal_name = goal_name
  }, [goal_name]);

  function change_mode() {
    setMode(!mode)
  }

  const GetGoalName = (event) => {
    setGoalName(event.target.value)
  }

  function stopnow() {
    var stop = new window.ROSLIB.Topic({
      ros: ros,
      name: "/move_base/cancel",
      messageType: 'actionlib_msgs/GoalID',
    });

    var GoalID = new window.ROSLIB.Message({
      stamp: {
        secs: 0,
        nsecs: 0,
      },
      id: '',
    })
    stop.publish(GoalID)
  }

  function stop(ros) {
    var stop = new window.ROSLIB.Topic({
      ros: ros,
      name: "/move_base/cancel",
      messageType: 'actionlib_msgs/GoalID',
    });

    var GoalID = new window.ROSLIB.Message({
      stamp: {
        secs: 0,
        nsecs: 0,
      },
      id: '',
    })
    stop.publish(GoalID)
  }

  function clear_costmap(ros) {
    var clear_costmap = new window.ROSLIB.Service({
      ros: ros,
      name: "/move_base/clear_costmaps",
      messageType: 'std_srvs/Empty',
    });

    clear_costmap.callService("{}")
  }
  return (
    <div className=' bg-indigo-50 rounded-3xl py-10 select-none px-4 mt-5 grid justify-items-center'>
      <div className='font-serif text-xl font-bold'>模式切換</div>
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
        <input className="h-7 w-32 mt-1 ml-4 pl-1" placeholder="目標名稱" onChange={GetGoalName} />
      </div>
      <div className={`bg-white rounded-2xl w-40 py-3 mt-5 ${mode ? "hidden" : ""}`}>
        <button className="h-10 w-full bg-indigo-800 text-white rounded-3xl cursor-pointer hover:bg-sky-700 active:bg-indigo-800 disabled:bg-black disabled:cursor-default" onClick={stopnow}>強制停止</button>
      </div>
    </div>
  );
}

export default Mode_Change;