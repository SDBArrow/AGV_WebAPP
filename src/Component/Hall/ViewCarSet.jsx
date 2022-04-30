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
      <div className='h-2 mt-6' />
      <div className='font-serif text-xl font-bold text-center'>AGV連線清單</div>
      <TodosList todos={todos} setTodos={setTodos} />
      <div className='grid justify-items-center mt-8 '>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 cursor-pointer fill-red-400 hover:fill-red-700" onClick={create_carset} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  );
}

export default ViewCarSet;