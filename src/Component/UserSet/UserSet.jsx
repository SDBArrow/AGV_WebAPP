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
    <div className='flex justify-evenly items-center flex-wrap'>
      <Popup trigger={ButtonPop} setButtonPop={setButtonPop} inputValue={inputValue} />
      <UpdatePassword />
      <UpdateUserData />
      <div className={`w-96 bg-indigo-50 rounded-3xl py-20 select-none px-4 mt-5 ${permission ? "" : "hidden"}`}>
        <div className="bg-logo1 w-full h-32 bg-no-repeat bg-center bg-contain " />
        <div className='font-serif text-xl font-bold text-center mt-8'>會員清單</div>
        <TodosList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}

export default UserSet;