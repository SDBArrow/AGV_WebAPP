import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Popup from './Popup';

function Register() {
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordcheck, setPasswordCheck] = useState("")
    const [disable, setDisable] = useState(false)
    const [input_email, setinput_email] = useState(false)
    const [input_password, setinput_password] = useState(false)
    const [input_name, setinput_name] = useState(false)
    const navigate = useNavigate();
    const [ButtonPop, setButtonPop] = useState(false);
    const [inputValue, setInputValue] = useState("");


    const GetFirstName = (event) => {
        setFirstName(event.target.value)
    }
    const GetLastName = (event) => {
        setLastName(event.target.value)
    }
    const GetPassword = (event) => {
        setPassword(event.target.value)
    }
    const GetPasswordCheck = (event) => {
        setPasswordCheck(event.target.value)
    }
    const GetEmail = (event) => {
        setEmail(event.target.value)
    }


    //判斷有無輸入姓名
    useEffect(() => {
        if ((firstname !== "") && (lastname !== "")) {
            setinput_name(true)
            console.log("Name")
            if (input_password === true && input_email === true) {
                setDisable(false)
            }
        } else {
            setinput_name(false)
            setDisable(true)
        }
    }, [firstname, lastname])

    //判斷信箱
    useEffect(() => {
        const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
        if (email.search(emailRule) !== -1) {
            setinput_email(true)
            console.log("Email")
            if (input_password === true && input_name === true) {
                setDisable(false)
            }
        } else {
            setinput_email(false)
            setDisable(true)
        }
    }, [email]);

    //判斷密碼
    useEffect(() => {
        const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
        if ((password !== "") && (passwordcheck !== "")) {
            if (password.search(passwordRule) !== -1 && (password === passwordcheck)) {
                setinput_password(true)
                console.log("Password")
                if (input_email === true && input_name === true) {
                    setDisable(false)
                }
            } else {
                setinput_password(false)
                setDisable(true)
            }
        }

    }, [password, passwordcheck]);

    function registeraccount() {

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
                    navigate('/')
                } else if (responseJson.code === "52") {
                    setInputValue(responseJson.message)
                    setButtonPop(true)
                } else if (responseJson.code === "53") {
                    setInputValue(responseJson.message)
                    setButtonPop(true)
                }
            })
    }


    return (
        <div className="w-96 bg-indigo-50 rounded-3xl py-20 select-none px-4">
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
            <div className="bg-white h-20 mt-8  rounded-2xl py-3">
                <label className="ml-4">Email 信箱</label>
                <div className="flex mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input className="w-80 ml-4 mt-1 pl-1" type="email" name="email" placeholder="Username@gmail.com" onChange={GetEmail} />
                </div>
            </div>
            <div className="bg-white h-20 mt-8  rounded-2xl py-3">
                <label className="ml-4">密碼 (包括英文大小寫，最多15碼，最少6碼)</label>
                <div className="flex mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <input className="w-80 ml-4 mt-1 pl-1" type="password" name="password" placeholder="············" onChange={GetPassword} />
                </div>
            </div>
            <div className="bg-white h-20 mt-8  rounded-2xl py-3">
                <label className="ml-4">再次輸入密碼</label>
                <div className="flex mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <input className="w-80 ml-4 mt-1 pl-1" type="password" name="passwordcheck" placeholder="············" onChange={GetPasswordCheck} />
                </div>
            </div>
            <button className="h-10 w-full mt-8 bg-indigo-800 text-white rounded-3xl cursor-pointer hover:bg-sky-700 active:bg-indigo-800 disabled:bg-black disabled:cursor-default" disabled={disable} onClick={registeraccount} >註冊</button>
            <div className=" grid gap-48 grid-cols-2 mt-8"><span className="w-8 cursor-pointer"><Link to="/">登入</Link></span><span className="cursor-pointer"><Link to="/Forget">忘記密碼?</Link></span></div>
        </div>
    );

}

export default Register;