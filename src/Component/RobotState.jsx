import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap";
import Config from "../scripts/Config";
import * as Three from "three";

class RobotState extends Component {
    state = {
        ros: null,
        x: 0,
        y: 0,
        orientation: 0,
        linear_velocity: 0,
        angular_velocity: 0,
        ip: localStorage.getItem("ip"),
        port: localStorage.getItem("port"),
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
    }

    getRobotState() {
        //創建一個pose訂閱
        var pose_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "/tracked_pose",
            messageType: "geometry_msgs/PoseStamped",
        });

        pose_subscriber.subscribe((message) => {
            this.setState({ x: message.pose.position.x.toFixed(5) });
            this.setState({ y: message.pose.position.y.toFixed(5) });
            this.setState({
                orientation: this.getOrientationFromQuaternion(
                    message.pose.orientation
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
                <Row>
                    <Col>
                        <h4 className="mt-4">Position</h4>
                        <p className="mt-0">x: {this.state.x}</p>
                        <p className="mt-0">y: {this.state.y}</p>
                        <p className="mt-0">Orientation: {this.state.orientation}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4 className="mt-4">Velocities</h4>
                        <p className="mt-0">Linear Velocity: {this.state.linear_velocity}</p>
                        <p className="mt-0">Angular Velocity: {this.state.angular_velocity}</p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RobotState;