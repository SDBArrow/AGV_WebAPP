import React, { useState, useEffect } from 'react';
import Config from "../scripts/Config";

function Test2() {

    let ros = null
    const [connected, setConnected] = useState(false)
    const [ip, setIP] = useState(localStorage.getItem("ip"))
    const [port, setPort] = useState(localStorage.getItem("port"))

    useEffect(() => {
        init_connection()
    }, [])

    function init_connection() {
        ros = new window.ROSLIB.Ros()
        console.log(ros);

        ros.on("connection", () => {
            console.log("Connection established in Teleoperation Component!");
            console.log(ros);
            setConnected(true);
        });

        ros.on("close", () => {
            console.log("Connection is Closed!");
            setConnected(false);
            //每三秒自動連接
            setTimeout(() => {
                try {
                    ros.connect("ws://" + ip + ":" + port);
                } catch (error) {
                    console.log("connection problem");
                }
            }, Config.RECONNECTION_TIMER);
        });

        try {
            ros.connect("ws://" + ip + ":" + port);
        } catch (error) {
            console.log("ws://" + ip + ":" + port);
            console.log("connection problem");
        }
    }

    useEffect(() => {
        send_cmd_vel()
    })

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

    return (
        <div>
        </div>
    );
}

export default Test2;