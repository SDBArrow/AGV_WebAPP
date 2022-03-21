import React, { useState, useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import Popup from './Popup';

function Update() {
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate();
    const [ButtonPop, setButtonPop] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const GetFirstName = (event) => {
        setFirstName(event.target.value)
    }
    const GetLastName = (event) => {
        setLastName(event.target.value)
    }

    //判斷有無輸入姓名
    useEffect(() => {
        if ((firstname !== "") && (lastname !== "")) {
            console.log("Name")
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [firstname, lastname])

    function registeraccount() {
/*
        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        }
        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            }),
            body: JSON.stringify(data)
        };
        fetch('https://sign-register.herokuapp.com/create_user.php', requestOptions)
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.code === "51") {
                    navigate('/Sign')
                } else if (responseJson.code === "52") {
                    setInputValue(responseJson.message)
                    setButtonPop(true)
                } else if (responseJson.code === "53") {
                    setInputValue(responseJson.message)
                    setButtonPop(true)
                }
            })*/
    }

    return (
        <div className="w-96 bg-indigo-50 rounded-3xl py-20 select-none px-4 mt-5">
            <Popup trigger={ButtonPop} setButtonPop={setButtonPop} inputValue={inputValue} />
            <div className="bg-logo1 w-full h-32 bg-no-repeat bg-center bg-contain " />
            <div className="h-20 mt-16 gap-8 flex ">
                <div className="bg-white rounded-2xl w-40 py-3 ">
                    <label className="ml-4">Fist Name</label>
                    <input className="h-7 w-32 mt-1 ml-4 pl-1" type="firstname" name="firstname" placeholder="Michael" onChange={GetFirstName} />
                </div>
                <div className="bg-white rounded-2xl w-40 py-3 ">
                    <label className="ml-4">Last name</label>
                    <input className="h-7 w-32 mt-1 ml-4 pl-1" type="lastname" name="lastname" placeholder="Ke" onChange={GetLastName} />
                </div>
            </div>
            <button className="h-10 w-full mt-8 bg-indigo-800 text-white rounded-3xl cursor-pointer hover:bg-sky-700 active:bg-indigo-800 disabled:bg-black disabled:cursor-default" disabled={disable} onClick={registeraccount}>修改</button>
        </div>
    );
}

export default Update;