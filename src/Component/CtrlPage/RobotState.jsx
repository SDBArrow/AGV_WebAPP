import React, { Component } from 'react';
import Config from "./scripts/Config";
import * as Three from "three";

class RobotState extends Component {
    state = {
        ros: null,
        x: 0,
        y: 0,
        power: 0,
        orientation: 0,
        ip:localStorage.getItem("ip"),
        port:localStorage.getItem("port"),
    }

    constructor() {
        super();
        this.init_connection();
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", () => {
            console.log("Connection established in Teleoperation Component!");
            console.log(this.state.ros);
            this.setState({ connected: true });
        });

        this.state.ros.on("close", () => {
            console.log("Connection is Closed!");
            this.setState({ connected: false });
            //每三秒自動連接
            setTimeout(() => {
                try {
                    this.state.ros.connect("ws://" + this.state.ip + ":" + this.state.port);
                } catch (error) {
                    console.log("connection problem");
                }
            }, Config.RECONNECTION_TIMER);
        });

        try {
            this.state.ros.connect("ws://" + this.state.ip + ":" + this.state.port);
        } catch (error) {
            console.log("ws://" + this.state.ip + ":" + this.state.port);
            console.log("connection problem");
        }
    }


    componentDidMount() {
        this.getRobotState();
        this.getRobotPower();
    }

    getRobotPower() {
        //創建一個pose訂閱
        var pose_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "/power",
            messageType: "std_msgs/UInt16",
        });

        pose_subscriber.subscribe((message) => {
            this.setState({ power: message.data.toFixed(5) });
        });
    }

    getRobotState() {
        //創建一個pose訂閱
        var pose_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "/robot_pose",
            messageType: "geometry_msgs/Pose",
        });

        pose_subscriber.subscribe((message) => {
            this.setState({ x: message.position.x.toFixed(5) });
            this.setState({ y: message.position.y.toFixed(5) });
            this.setState({
                orientation: this.getOrientationFromQuaternion(
                    message.orientation
                ).toFixed(5),
            });
        });
    }
    getOrientationFromQuaternion(ros_orientation_quaternion) {
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

    render() {
        return (
            <div>
                <div className="mt-10 text-blue-600 text-2xl text-center">車子電量和座標資訊</div>
                <div className="mt-2">電量：{this.state.power}</div>
                <div className="mt-0">x： {this.state.x}</div>
                <div className="mt-0">y： {this.state.y}</div>
                <div className="mt-0">Orientation： {this.state.orientation}</div>
            </div>
        );
    }
}

export default RobotState;