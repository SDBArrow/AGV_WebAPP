import React, { Component } from 'react';
import Config from "../scripts/Config"
class Connection extends Component {
    state = {
        connected: false,
        ros: null,
        ip: localStorage.getItem("ip"),
        port: localStorage.getItem("port"),
    };

    constructor() {
        super();
        this.init_connection();
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", () => {
            console.log("Connection established!");
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

    render() {
        return (
            <div>
                <div className = {"mt-5 p-4 mb-4 text-center rounded-lg" + (this.state.connected ? " text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800" : "text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800")}
                    variant={this.state.connected ? "success" : "danger"}>
                    {this.state.connected ? "AGV connected" : "AGV Dissconnected"}
                </div>
            </div>);
    }
}

export default Connection;