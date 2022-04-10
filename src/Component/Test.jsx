import React, { Component } from 'react';
import Config from "../scripts/Config";


class Test extends Component {
    state = {
        ros: null,
        ip: localStorage.getItem("ip"),
        port: localStorage.getItem("port"),
        mode: true,
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
        //this.stop();
    }

    send_cmd_vel() {
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
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

    stop() {
        var stop = new window.ROSLIB.Topic({
            ros: this.state.ros,
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

    clear_costmap() {
        var clear_costmap = new window.ROSLIB.Service({
            ros: this.state.ros,
            name: "/move_base/clear_costmaps",
            messageType: 'std_srvs/Empty',
        });

        clear_costmap.callService("{}")
    }

    change_mode = () => {
        this.setState({ mode: !this.state.mode }, () => {
        });
    }

    render() {
        return (
            <div>
                <button className="h-10 w-full mt-8 bg-indigo-800 text-white rounded-3xl cursor-pointer hover:bg-sky-700 active:bg-indigo-800 disabled:bg-black disabled:cursor-default" onClick={this.stop} >測試</button>
                <div className='h-10 w-20 rounded-full bg-gray-100 relative'>
                    <label htmlFor="check">
                        <input type="checkbox" id="check" className="sr-only peer" />
                        <span className='w-2/5 h-4/5 bg-rose-300 absolute rounded-full left-1 top-1 peer-checked:bg-rose-600 peer-checked:left-11 transition-all duration-500' onClick={this.change_mode} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d={`${this.state.mode ? "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" : "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"}`} />
                            </svg>
                        </span>
                    </label>
                </div>
            </div>
        );
    }
}

export default Test;