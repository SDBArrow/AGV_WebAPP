import React, { useState, useEffect } from 'react';
import Config from "../scripts/Config";


function Test2() {
    const [ros, setROS] = useState(null)
    const [ip, setIP] = useState(localStorage.getItem("ip"))
    const [port, setPort] = useState(localStorage.getItem("port"))
    const [mode, setMode] = useState(true)

    useEffect(() => {
        init_connection()
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

    function send_cmd_vel() {
        var cmd_vel = new window.ROSLIB.Topic({
            ros: ros,
            name: "/cmd_vel",
            messageType: 'geometry_msgs/Twist',
        });

        var Twist = new window.ROSLIB.Message({
            linear: {
                x: 0.5,
                y: 0.0,
                z: 0.0,
            },
            angular: {
                x: 0.3,
                y: 0.0,
                z: 0.0,
            }
        })
        cmd_vel.publish(Twist)
    }

    function stop() {
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

    function clear_costmap() {
        var clear_costmap = new window.ROSLIB.Service({
            ros: this.state.ros,
            name: "/move_base/clear_costmaps",
            messageType: 'std_srvs/Empty',
        });

        clear_costmap.callService("{}")
    }

    function change_mode() {
        setMode(!mode)
        localStorage.setItem("mode", mode);
    }

    return (
        <div>
            <button className="h-10 w-full mt-8 bg-indigo-800 text-white rounded-3xl cursor-pointer hover:bg-sky-700 active:bg-indigo-800 disabled:bg-black disabled:cursor-default" onClick={stop} >測試</button>
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
        </div>
    );

}

export default Test2;