import React, { Component } from 'react';
import Config from "../scripts/Config";


class Test extends Component {
    state = {
        ros: null,
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
        this.send_cmd_vel();
    }

    send_cmd_vel() {
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "/cmd_vel",
            messageType : 'geometry_msgs/Twist',
        });
        
        var Twist = new window.ROSLIB.Message({
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
        cmd_vel.publish(Twist)
    }


    render() {
        return (
            <div>
            </div>
        );
    }
}

export default Test;