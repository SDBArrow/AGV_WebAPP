import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Popup from '../Popup';

function Forget() {
    const [email, setEmail] = useState("");
    const [bt_forget, setbt_forget] = useState("disabled");
    const navigate = useNavigate();
    const [ButtonPop, setButtonPop] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const GetEmail = (event) => {
        setEmail(event.target.value);
    }

    useEffect(() => {
        const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
        if (email.search(emailRule) !== -1) {
            setbt_forget("")
        } else {
            setbt_forget("disabled")
        }
        //console.log('state:', form.email);
    }, [email]);

    function Forget() {
        const data = {
            email: email,
        }
        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            }),
            body: JSON.stringify(data)
        };
        fetch('https://sign-register.herokuapp.com/forget_password.php', requestOptions)
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.code === "51") {
                    setInputValue(responseJson.message+"，3秒後自動跳轉更新")
                    setButtonPop(true)
                    setTimeout(function () {
                        navigate('/Sign')
                      }, 3000);
                } else {
                    setInputValue(responseJson.message)
                    setButtonPop(true)
                }
            })
    }

    return (
        <div className="w-96 bg-indigo-50 rounded-3xl py-20 select-none px-4 p-5 mt-5">
            <Popup trigger={ButtonPop} setButtonPop={setButtonPop} inputValue={inputValue} />
            <div className="bg-logo1 w-full h-32 bg-no-repeat bg-center bg-contain " />
            <div className="bg-white h-20 mt-16  rounded-2xl py-3">
                <label className="ml-4">請輸入註冊的Email</label>
                <div className="flex mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input className="w-80 ml-4 mt-1 pl-1 h-6 rounded-lg" type="email" name="email" placeholder="Username@gmail.com" onChange={GetEmail} />
                </div>
            </div>
            <button className="h-10 w-full mt-8 bg-indigo-800 text-white rounded-3xl hover:bg-sky-700 active:bg-indigo-800 disabled:bg-black disabled:cursor-default" disabled={bt_forget} onClick={Forget} >發送救援信件</button>
            <div className=" grid gap-72 grid-cols-2 mt-8 "><span className="w-8 cursor-pointer"><Link to="/Sign">登入</Link></span><span className="cursor-pointer"><Link to="/Register">註冊</Link></span></div>
        </div>
    );
}
export default Forget;