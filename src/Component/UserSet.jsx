import React, { useState, useEffect } from 'react';
import UpdateUserData from './UpdateUserData';
import UpdatePassword from './UpdatePassword';
import TodosList from "./TodosList_UserPermission"
import Popup from './Popup';
import { useNavigate } from "react-router-dom";

function UserSet() {

  const [todos, setTodos] = useState([]);
  const [ButtonPop, setButtonPop] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    const data = {jwt: localStorage.getItem("jwt")}

    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
      body: JSON.stringify(data)
    };
    fetch('https://sign-register.herokuapp.com/get_user.php', requestOptions)
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.code === "81") {
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
  }, []) //按刷新按鈕時

  return (
    <div className='flex justify-evenly items-center flex-wrap'>
      <UpdatePassword />
      <UpdateUserData />
      <div className="w-96 bg-indigo-50 rounded-3xl py-20 select-none px-4 mt-5">
          <div className="bg-logo1 w-full h-32 bg-no-repeat bg-center bg-contain " />
          <div className='font-serif text-xl font-bold text-center mt-8'>AGV Goal 清單</div>
          <TodosList todos={todos} setTodos={setTodos} />
          <div className='grid justify-items-center mt-8 '>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 cursor-pointer fill-white hover:fill-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        </div>
    </div>
  );
}

export default UserSet;