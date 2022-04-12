import React, { useState, useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import Config from "../scripts/Config";
import * as Three from "three";

function RobotState() {

    const [ros, setROS] = useState(null)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [orientation, setOrientation] = useState(0)
    const [ip, setIP] = useState(localStorage.getItem("ip"))
    const [port, setPort] = useState(localStorage.getItem("port"))
    const [connect, setConnect] = useState(false)

    useEffect(() => {
        init_connection()
    }, []);


    useEffect(() => {
        try {
            console.log("test3")
            getRobotState()
            console.log("test4")
        }catch(error){
            console.log(error)
        }
    },);

    function init_connection() {

        var ros_ = new window.ROSLIB.Ros()
        console.log(ros);

        ros_.on("connection", () => {
            console.log("Connection established in Teleoperation Component!");
            console.log(ros_);
            setConnect(true)
            setROS(ros_)
        });

        ros_.on("close", () => {
            console.log("Connection is Closed!");
            setConnect(false)
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


    return (
        <div>
            <Row>
                <Col>
                    <h4 className="mt-4">Position</h4>
                    <p className="mt-0">x: {x}</p>
                    <p className="mt-0">y: {y}</p>
                    <p className="mt-0">Orientation: {orientation}</p>
                </Col>
            </Row>
            <button className="h-10 w-full mt-8 bg-indigo-800 text-white rounded-3xl cursor-pointer hover:bg-sky-700 active:bg-indigo-800" onClick={stop}>終止任務</button>
        </div>
    );
}


export default RobotState;