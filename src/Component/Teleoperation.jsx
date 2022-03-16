import React, { Component } from 'react';
import { Joystick } from "react-joystick-component";
import Config from "../scripts/Config";

class Teleoperation extends Component {
    state = { ros:null};

    constructor() {
        super();
        this.init_connection();

        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
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
                    this.state.ros.connect("ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PROT);
                } catch (error) {
                    console.log("connection problem");
                }
            }, Config.RECONNECTION_TIMER);
        });

        try {
            this.state.ros.connect("ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PROT);
        } catch (error) {
            console.log("ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PROT);
            console.log("connection problem");
        }
    }
    handleMove(Event) {
        console.log("handle move")

        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: "geomtry_msgs/Twist", 
        });
        var twist = new window.ROSLIB.Message({
            linear:{
                x: Event.y / 50,
                y: 0,
                z: 0,
            },
            angular:{
                x: 0,
                y: 0,
                z: -Event.x / 50,
            },
        });
        cmd_vel.publish(twist);
    }
    handleStop(Event) {
        console.log("handle stop")
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: "geomtery_msgs/Twist",
        });
        var twist = new window.ROSLIB.Message({
            linear:{
                x: 0,
                y: 0,
                z: 0,
            },
            angular:{
                x: 0,
                y: 0,
                z: 0,
            },
        });
        cmd_vel.publish(twist);
    }

    render() {
        return (
            <div>
                <Joystick
                    size={100}
                    baseColor="#EEEEEE"
                    stickColor="#BBBBBB"
                    move={this.handleMove}
                    stop={this.handleStop}
                ></Joystick>
            </div>
        );
    }
}

export default Teleoperation;