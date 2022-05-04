import React, { useState, useEffect } from 'react';
import UpdateUserData from './UpdateUserData';
import UpdatePassword from './UpdatePassword';
import TodosList from "./TodosList_User"
import Popup from '../Popup';
import { useNavigate } from "react-router-dom";

function UserSet() {

  const [todos, setTodos] = useState([]);
  const [ButtonPop, setButtonPop] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [permission, setPermission] = useState(false)

  useEffect(() => {

    const data = { jwt: localStorage.getItem("jwt") }

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
          setPermission(true)
          setTodos(responseJson.data)
        } else if (responseJson.code === "43" || responseJson.code === "42") {
          setInputValue(responseJson.message + "，五秒後將跳轉")
          setButtonPop(true)
          setTimeout(function () {
            navigate('/Sign')
          }, 5000);
        }
      })
  }, [])

  return (
    <div className='flex justify-evenly items-start flex-wrap'>
      <Popup trigger={ButtonPop} setButtonPop={setButtonPop} inputValue={inputValue} />
      <UpdatePassword />
      <UpdateUserData />
      <div className={`w-96 bg-indigo-50 rounded-3xl py-20 select-none px-4 mt-5 ${permission ? "" : "hidden"}`}>
        <div className="bg-logo1 w-full h-32 bg-no-repeat bg-center bg-contain " />
        <div className='font-serif text-xl font-bold text-center mt-8'>會員清單</div>
        <div className="flex justify-center mt-4 gap-2">
            <div className="flex font-serif text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-green-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" /></svg>
              : 降低權限
            </div>
            <div className='flex font-serif text-sm'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-sky-200" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" /></svg>
              : 提高權限
            </div>
          </div>
        <TodosList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}

export default UserSet;