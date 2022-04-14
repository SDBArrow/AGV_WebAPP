import React, { useState, useEffect } from 'react';
import Config from "../scripts/Config";
//import * as Three from "three";
//import { Row, Col } from "react-bootstrap";


function Test2() {
    const [ros, setROS] = useState(null)
    const [ip, setIP] = useState(localStorage.getItem("ip"))
    const [port, setPort] = useState(localStorage.getItem("port"))
    const [mode, setMode] = useState(true)
/*
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [orientation, setOrientation] = useState(0)
    const [connect, setConnect] = useState(false)*/

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
/*
    function getRobotState() {
        try {
            //創建一個pose訂閱
            var pose_subscriber = new window.ROSLIB.Topic({
                ros: ros,
                name: "/robot_pose",
                messageType: "geometry_msgs/Pose",
            });
            console.log("test1")
            pose_subscriber.subscribe((message) => {
                setX(message.position.x.toFixed(5))
                setY(message.position.y.toFixed(5))
                setOrientation(getOrientationFromQuaternion(message.orientation).toFixed(5))
                //pose_subscriber.unsubscribe();
            });
            console.log("test2")
        }catch (error){
            console.log(error)
        }
    }

    function getOrientationFromQuaternion(ros_orientation_quaternion) {
        var q = new Three.Quaternion(   //Three 為 php 用來處理四元數的套件，這裡輸入從ros訂閱到的x、y、z、w
            ros_orientation_quaternion.x,
            ros_orientation_quaternion.y,
            ros_orientation_quaternion.z,
            ros_orientation_quaternion.w
        );
        //convert this quaternion into Roll, Pitch and yaw
        var RPY = new Three.Euler().setFromQuaternion(q); //將四元數轉換成尤拉角
        return RPY["_z"] * (180 / Math.PI);
    }*/

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