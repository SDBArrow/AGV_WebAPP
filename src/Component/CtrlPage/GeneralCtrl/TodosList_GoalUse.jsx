import React, { useState, useEffect } from 'react';
import Config from "../scripts/Config";

function TodosList_GoalUse({ todos, setTodos }) {
    const [disabled, setDisabled] = useState(true)
    const [chose_goal_name, setGoalName] = useState("")
    const [chose_position_x, setPosition_x] = useState(0)
    const [chose_position_y, setPosition_y] = useState(0)
    const [chose_orientation_z, setOrientation_z] = useState(0)
    const [chose_orientation_w, setOrientation_w] = useState(0)

    const ChoseGoal = ({ goal_name, position_x, position_y, orientation_z, orientation_w }) => {
        setGoalName(goal_name)
        setPosition_x(position_x)
        setPosition_y(position_y)
        setOrientation_z(orientation_z)
        setOrientation_w(orientation_w)
        setDisabled(false)
    }

    function BT_SendGoal() {
        
        //stop(ros)
        //clear_costmap(ros)

        //發送導航
        var positionVec3 = new window.ROSLIB.Vector3({
            x: parseFloat(chose_position_x),
            y: parseFloat(chose_position_y),
            z: 0,
        });

        var orientation = new window.ROSLIB.Quaternion({ x: 0, y: 0, z: parseFloat(chose_orientation_z), w: parseFloat(chose_orientation_w) });

        var pose = new window.ROSLIB.Pose({
            position: positionVec3,
            orientation: orientation,
        });

        window.$sendGoal(pose)
        /*  直接發送目標
        var actionClient = new window.ROSLIB.ActionClient({
            ros: ros,
            serverName: '/move_base',
            actionName: 'move_base_msgs/MoveBaseAction',
        });

        var goal = new window.ROSLIB.Goal({
            actionClient: actionClient,
            goalMessage: {
                target_pose: {
                    header: {
                        frame_id: "map",
                    },
                    pose: pose,
                },
            },
        });
        goal.send();*/
        setGoalName("")
        setPosition_x("")
        setPosition_y("")
        setOrientation_z("")
        setOrientation_w("")
        setDisabled(true)
    }

    return (
        <div>
            <div className="flex bg-white h-12 mt-8 rounded-2xl py-3" >
                <label className="ml-4 basis-3/4">選定目標名稱：{chose_goal_name}</label>
            </div>
            <button className="h-10 w-full mt-8 bg-indigo-800 text-white rounded-3xl cursor-pointer hover:bg-sky-700 active:bg-indigo-800 disabled:bg-black disabled:cursor-default" disabled={disabled} onClick={BT_SendGoal} >發送</button>
            {todos.map((todo) => (
                <div className="flex bg-white h-12 mt-8 rounded-2xl py-3" key={todo.id_goal_set}>
                    <label className="ml-4 basis-3/4">目標名稱：{todo.goal_name}</label>
                    <div className='flex'>
                        <svg className="w-6 h-6 cursor-pointer fill-green-400 hover:fill-green-700" onClick={() => ChoseGoal(todo)} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                </div>
            ))}
        </div>

    );

}

export default TodosList_GoalUse;