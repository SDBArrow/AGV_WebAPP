import React, { useState, useEffect } from 'react';
import Config from "../scripts/Config";

function Test() {

    const [connected, setConnected] = useState();
    const [ip, setIP] = useState(localStorage.getItem("ip"));
    const [port, setPort] = useState(localStorage.getItem("port"));
    var ros;
    
    function ros_test() {

        console.log("ip：" + ip + " port：" + port)
        /*
        var cmdVel = new ROSLIB.Topic({
            ros : ros,
            name : '/cmd_vel',
            messageType : 'geometry_msgs/Twist'
        })
        var twist = new ROSLIB.Message({
            linear :{
                x : 0.5,
                y : 0.0,
                z : 0.0,
            },
            angular : {
                x : 0.3,
                y : 0.0,
                z : 0.0,
            }
        })
        cmdVel.publish(twist)*/
    }

    useEffect(() => {
        init_connection()
    }, []);

    function init_connection() {
        ros = new window.ROSLIB.Ros()
        console.log(ros);

        ros.on("connection", () => {
            console.log("Connection established!");
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
            test.connect("ws://" + ip + ":" + port);
        } catch (error) {
            console.log("ws://" + ip + ":" + port);
            console.log("connection problem");
        }
    }
    return (

        <div>
            <div>
                <button className="h-10 w-full mt-8 bg-indigo-800 text-white rounded-3xl cursor-pointer hover:bg-sky-700 active:bg-indigo-800 disabled:bg-black disabled:cursor-default" onClick={ros_test} >測試</button>
            </div>
        </div>
    );

}

export default Test;
