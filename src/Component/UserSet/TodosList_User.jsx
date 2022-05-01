import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Popup from '../Popup';

function TodosList_User({ todos, setTodos }) {

  const navigate = useNavigate();
  const [permission, setPermission] = useState(0)
  const [ButtonPop, setButtonPop] = useState(false);
  const [inputValue, setInputValue] = useState("");

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
          setPermission(responseJson.data.permission)
        } else {
          navigate('/Sign')
        }
      })
  }, [])

  function update_permissions(todo, newpermissions) {
    const data = {
      id: todo.id,
      permissions: newpermissions,
      jwt: localStorage.getItem("jwt")
    }
    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
      body: JSON.stringify(data)
    };
    fetch('https://sign-register.herokuapp.com/update_permissions.php', requestOptions)
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.code === "83") {
          setInputValue(responseJson.message)
          setButtonPop(true)
          todo.permissions = newpermissions
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
  }

  const up_permissions = (todo) => {
    let newpermissions = todo.permissions + 1
    update_permissions(todo, newpermissions)
  }

  const down_permissions = (todo) => {
    let newpermissions = todo.permissions - 1
    update_permissions(todo, newpermissions)
  }

  return (
    <div>
      <Popup trigger={ButtonPop} setButtonPop={setButtonPop} inputValue={inputValue} />
      {todos.map((todo) => (
        <div className="flex flex-col bg-white h-26 mt-8 rounded-2xl py-3" key={todo.id}>
          <label className="ml-4">姓名：{todo.firstname}</label>
          <label className="ml-4 mt-2">Email：{todo.email}</label>
          <div className="flex ml-4 mt-2">
            <label className='basis-3/4'>權限：{todo.permissions}</label>
            <div className='flex gap-3'>
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 cursor-pointer fill-green-400 hover:fill-green-700`} disabled={true} onClick={() => down_permissions(todo)} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 cursor-pointer fill-sky-200 hover:fill-sky-600`} disabled={true} onClick={() => up_permissions(todo)} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>

  );

}

export default TodosList_User;