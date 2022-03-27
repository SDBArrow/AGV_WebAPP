import React, { useState, useEffect } from 'react';
import Popup from './Popup';

function UpdataPassword() {
    const [password, setPassword] = useState("")
    const [passwordcheck, setPasswordCheck] = useState("")
    const [disable, setDisable] = useState(true)
    const [ButtonPop, setButtonPop] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const GetPassword = (event) => {
        setPassword(event.target.value)
    }
    const GetPasswordCheck = (event) => {
        setPasswordCheck(event.target.value)
    }


    //判斷密碼
    
    useEffect(() => {
        const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
        if ((password !== "") && (passwordcheck !== "")) {
            if (password.search(passwordRule) !== -1 && (password === passwordcheck)) {
                console.log("Password")
                setDisable(false)
            } else {
                setDisable(true)
            }
        }

    }, [password, passwordcheck]);

    function updatepassword() {
        
        const data = {
            password: password,
            jwt: localStorage.getItem("jwt") 
        }
        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            }),
            body: JSON.stringify(data)
        };
        fetch('https://sign-register.herokuapp.com/update_user.php', requestOptions)
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.code === "31") {
                    setInputValue(responseJson.message)
                    setButtonPop(true)
                } else if (responseJson.code === "32") {
                    setInputValue(responseJson.message)
                    setButtonPop(true)
                }
            })
    }

    return (
        <div className="w-96 bg-indigo-50 rounded-3xl py-20 select-none px-4 mt-5">
            <Popup trigger={ButtonPop} setButtonPop={setButtonPop} inputValue={inputValue} />
            <div className="bg-logo1 w-full h-32 bg-no-repeat bg-center bg-contain " />
            <div className="bg-white h-20 mt-8  rounded-2xl py-3">
                <label className="ml-4">新密碼 (包括英文大小寫，最多15碼，最少6碼)</label>
                <div className="flex mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <input className="w-80 ml-4 mt-1 pl-1 h-6 rounded-lg" type="password" name="password" placeholder="············" onChange={GetPassword} />
                </div>
            </div>
            <div className="bg-white h-20 mt-8  rounded-2xl py-3">
                <label className="ml-4">再次輸入密碼</label>
                <div className="flex mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <input className="w-80 ml-4 mt-1 pl-1 h-6 rounded-lg" type="password" name="passwordcheck" placeholder="············" onChange={GetPasswordCheck} />
                </div>
            </div>
            <button className="h-10 w-full mt-8 bg-indigo-800 text-white rounded-3xl cursor-pointer hover:bg-sky-700 active:bg-indigo-800 disabled:bg-black disabled:cursor-default" disabled={disable} onClick={updatepassword}>更改密碼</button>
        </div>
    );
}

export default UpdataPassword;