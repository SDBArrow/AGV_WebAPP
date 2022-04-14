import React, { Component } from 'react';
import Config from '../scripts/Config';

class Map_GeneralCtrl extends Component {

    state = {
        ros: null,
        ip: localStorage.getItem("ip"),
        port: localStorage.getItem("port"),
    };

    constructor() {
        super();
        this.view_map = this.view_map.bind(this);
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);
        try {
            this.state.ros.connect("ws://" + this.state.ip + ":" + this.state.port);
        } catch (error) {
            console.log("ws://" + this.state.ip + ":" + this.state.port);
            console.log("can't connect to the AGV.Try again after 1 second");
        }
    }

    componentDidMount() {
        this.init_connection();
        this.view_map();
    }

    view_map() {
        var viewer = new window.ROS2D.Viewer({
            divID: "nav_div",
            width: 640,
            height: 480,
        });

        var navClient = new window.NAV2D.OccupancyGridClientNav({
            ros: this.state.ros,
            rootObject: viewer.scene,
            viewer: viewer,
            serverName: "/move_base",
            withOrientation: false,
        });
    }

    render() {
        return (
            <div className='select-none'>
                <div id="nav_div" className='text-center'>Map Viewer</div>
            </div>
        );
    }
}

export default Map_GeneralCtrl;