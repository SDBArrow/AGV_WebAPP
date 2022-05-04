import React, { useState, useEffect } from 'react';
import TodosList from "./TodosList_CarSet"
import InputCarSet from './InputCarSet';
import Popup from '../Popup';
import { useNavigate } from "react-router-dom";

function ViewCarSet() {

  const [todos, setTodos] = useState([]);
  const [ButtonInputCarSet, setButtonInputCarSet] = useState(false);
  const [ButtonPop, setButtonPop] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState(false);

  useEffect(() => {
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
          if (responseJson.data.permissions > 0 && responseJson.data.permissions <= 3) {
            setPermissions(true)
          } else {
            setPermissions(false)
          }
        } else {
          navigate('/Sign')
        }
      })
  }, [])

  //開啟新增車子設定頁面
  function create_carset() {
    setButtonInputCarSet(true)
  }

  useEffect(() => {

    const data = { jwt: localStorage.getItem("jwt") }

    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
      body: JSON.stringify(data)
    };
    fetch('https://sign-register.herokuapp.com/get_carset.php', requestOptions)
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.code === "63") {
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
  }, [ButtonInputCarSet]) //開啟新增和刪除頁面時刷新

  return (
    <div className="w-96 bg-indigo-50 rounded-3xl py-20 select-none px-4 mt-5">
      <Popup trigger={ButtonPop} setButtonPop={setButtonPop} inputValue={inputValue} />
      <InputCarSet trigger={ButtonInputCarSet} setButtonInputCarSet={setButtonInputCarSet} />
      <div className="bg-logo1 w-full h-32 bg-no-repeat bg-center bg-contain " />
      <div className='font-serif text-xl font-bold text-center mt-6'>AGV連線清單</div>
      <div className="flex justify-center mt-4 gap-2">
        <div className={`flex font-serif text-sm ${permissions ? "" : "hidden"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" ><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          : 新增設定
        </div>
        <div className='flex font-serif text-sm'>
          <svg className="w-5 h-5 fill-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          : 選定設定到確認欄位
        </div>
        <div className={`flex font-serif text-sm ${permissions ? "" : "hidden"}`}>
          <svg className="w-5 h-5 fill-sky-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          : 刪除設定
        </div>
      </div>
      <TodosList todos={todos} setTodos={setTodos} permissions={permissions} />
      <div className={`grid justify-items-center mt-8 ${permissions ? "" : "hidden"}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 cursor-pointer fill-red-400 hover:fill-red-700" onClick={create_carset} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  );
}

export default ViewCarSet;