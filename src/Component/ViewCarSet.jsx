import React, { useState, useEffect } from 'react';
import TodosList from "./TodosList"


function ViewCarSet() {

  const [todos, setTodos] = useState([]);

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
          for (let i = 0; i < responseJson.data.length; i++) {
            console.log(responseJson.data[i])
            setTodos(responseJson.data)
            //setTodos([...todos,{id: responseJson.data[i].id_car_set, car_name: responseJson.data[i].car_name, car_ip: responseJson.data[i].car_ip, car_port: responseJson.data[i].car_port}])
          }
        } else {

        }
      })
  }, [])

  return (
    <div className="w-96 bg-indigo-50 rounded-3xl py-20 select-none px-4 mt-5">
      <div className="bg-logo1 w-full h-32 bg-no-repeat bg-center bg-contain " />
      <div className='h-2 mt-6'/>
      <TodosList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default ViewCarSet;