import React, { useState, useEffect } from 'react';
import TodosList from "./TodosList_GoalSet"

function ViewGoalSet() {

  const [todos, setTodos] = useState([]);

  //開啟新增車子設定頁面
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
        if (responseJson.code === "101") {
          setTodos(responseJson.data)
        } else {

        }
      })
  }, []) //開啟新增和刪除頁面時刷新

  return (
    <div className="w-96 bg-indigo-50 rounded-3xl py-20 select-none px-4 mt-5">
      <div className="bg-logo1 w-full h-32 bg-no-repeat bg-center bg-contain " />
      <div className='h-2 mt-6' />
      <TodosList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default ViewGoalSet;