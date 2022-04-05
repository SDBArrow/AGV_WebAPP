import React, { useState, useEffect } from 'react';
import TodosList from "./TodosList"
import InputCarSet from './InputCarSet';

function ViewCarSet() {

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function create_carset(){
    setInputValue("測試")
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
        if (responseJson.code === "71") {
          setTodos(responseJson.data)
        } else {

        }
      })
  }, [])

  return (
    <div className="w-96 bg-indigo-50 rounded-3xl py-20 select-none px-4 mt-5">
      <InputCarSet />
      <div className="bg-logo1 w-full h-32 bg-no-repeat bg-center bg-contain " />
      <div className='h-2 mt-6' />
      <TodosList todos={todos} setTodos={setTodos} />
      <div className='grid justify-items-center mt-8 '>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 cursor-pointer fill-red-400 hover:fill-red-700" onClick={create_carset} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" data-modal-toggle="popup-modal" >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  );
}

export default ViewCarSet;