import React from 'react';
import { useNavigate } from "react-router-dom";
import Popup from './Popup';

function TodosList({ todos, setTodos }) {

    const navigate = useNavigate();
    const handleChose = (todo) => {
        localStorage.setItem("car_name", todo.car_name);
        localStorage.setItem("ip", todo.car_ip);
        localStorage.setItem("port", todo.car_port);
        navigate('/')
    }

    const handleDelete = ({ id_car_set }) => {
        const data = { id_car_set: id_car_set, jwt: localStorage.getItem("jwt") }

        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            }),
            body: JSON.stringify(data)
        };
        fetch('https://sign-register.herokuapp.com/delete_carset.php', requestOptions)
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.code === "81") {
                    setTodos(todos.filter((todo) => todo.id_car_set !== id_car_set))
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

    return (
        <div>
            <Popup trigger={ButtonPop} setButtonPop={setButtonPop} inputValue={inputValue} />
            {todos.map((todo) => (
                <div className="flex bg-white h-12 mt-8 rounded-2xl py-3" key={todo.id_car_set}>
                    <label className="ml-4 basis-3/4">車子名稱：{todo.car_name}</label>
                    <div className='flex gap-3'>
                        <svg className="w-6 h-6 cursor-pointer fill-green-400 hover:fill-green-700" onClick={() => handleChose(todo)} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <svg className="w-6 h-6 cursor-pointer fill-sky-200 hover:fill-sky-600" onClick={() => handleDelete(todo)} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </div>
                </div>
            ))}
        </div>

    );

}

export default TodosList;