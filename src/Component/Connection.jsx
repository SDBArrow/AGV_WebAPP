import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Config from "../scripts/Config"
class Connection extends Component {
    state = {
        connected: false,
        ros: null,
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

    render() {
        return (
            <div>
                <Alert className="text-center m-3"
                    variant={this.state.connected ? "success" : "danger"}>
                    {this.state.connected ? "AGV connected" : "AGV Dissconnected"}
                </Alert>
            </div>);
    }
}

export default Connection;