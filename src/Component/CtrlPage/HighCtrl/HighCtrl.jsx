import React, { useState, useEffect } from 'react';
import Connection from '../Connection';
import RobotState from '../RobotState';
import Map from './Map_HighCtrl';
import TodosList from "./TodosList_GoalSet"
import Popup from '../../Popup';
import Mode from './Mode_administrator';
import { useNavigate } from "react-router-dom";

function HighCtrl() {

  const [todos, setTodos] = useState([]);
  const [BT_GetGoalSet, setBT_GetGoalSet] = useState(false);
  const [ButtonPop, setButtonPop] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  function get_goalset() {
    setBT_GetGoalSet(!BT_GetGoalSet)
  }

  //處理 Navigator CALL API 後回傳的資料
  function callPopup(msg) {
    if (msg.code === "43" || msg.code === "42") {
      setInputValue(msg.message + "，五秒後將跳轉")
      setButtonPop(true)
      setTimeout(function () {
        navigate('/Sign')
      }, 5000);
    }else{
      setInputValue(msg.message)
      setButtonPop(true)
    }
  }

  useEffect(() => {
    window.$callPopup = callPopup  //把 CallPopup function window 讓正在渲染的component 都能使用
    const data = { jwt: localStorage.getItem("jwt") }

    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
      body: JSON.stringify(data)
    };
    fetch('https://sign-register.herokuapp.com/validate_token.php', requestOptions)
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.code === "41") {
          if( responseJson.data.permissions < 1 ){
            navigate('/')
          }
        } else {
          navigate('/Sign')
        }
      })
  }, [])

  //更新 新增的Goal
  useEffect(() => {

    const data = { id_car_set: localStorage.getItem("id_car_set"), jwt: localStorage.getItem("jwt") }

    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
      body: JSON.stringify(data)
    };
    fetch('https://sign-register.herokuapp.com/get_goalset.php', requestOptions)
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.code === "73") {
          setTodos(responseJson.data)
        } else if (responseJson.code === "43" || responseJson.code === "42") {
          setInputValue(responseJson.message + "，五秒後將跳轉")
          setButtonPop(true)
          setTimeout(function () {
            navigate('/Sign')
          }, 5000);
        } else {
          setInputValue(responseJson.message)
          setButtonPop(true)
        }
      })
  }, [BT_GetGoalSet]) //按刷新按鈕時

  return (
    <div>
      <Popup trigger={ButtonPop} setButtonPop={setButtonPop} inputValue={inputValue} />
      <p className="text-center text-5xl mt-5">AGV Set Page</p>
      <Connection />
      <div className="flex justify-evenly items-center flex-wrap-reverse ">
        <div className="w-96 bg-indigo-50 rounded-3xl py-20 select-none px-4 mt-5">
          <div className="bg-logo1 w-full h-32 bg-no-repeat bg-center bg-contain " />
          <div className='font-serif text-xl font-bold text-center mt-8'>AGV Goal 清單</div>
          <TodosList todos={todos} setTodos={setTodos} />
          <div className='grid justify-items-center mt-8 '>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 cursor-pointer fill-white hover:fill-red-300" onClick={get_goalset} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        </div>
        <div>
          <Mode />
          <RobotState />
        </div>
        <Map />
      </div>
    </div >
  );
}

export default HighCtrl;