import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Popup from './Popup';

function InputCarSet() {
  const [name, setName] = useState("")
  const [ip, setIP] = useState("")
  const [port, setPort] = useState("")
  const [disable, setDisable] = useState(true)
  const [rule_name, setRuleName] = useState(false)
  const [rule_ip, setRuleIP] = useState(false)
  const [rule_port, setRulePort] = useState(false)
  const [ButtonPop, setButtonPop] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const GetName = (event) => {
    setName(event.target.value)
  }
  const GetIP = (event) => {
    setIP(event.target.value)
  }
  const GetPort = (event) => {
    setPort(event.target.value)
  }

  useEffect(() => {
    if (name != "") {
      setRuleName(true)
      if (rule_ip && rule_port) {
        setDisable(false)
      }
    } else {
      setRuleName(false)
      setDisable(true)
    }
  }, [name]);

  useEffect(() => {
    const IPRule = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
    if (ip.search(IPRule) !== -1) {
      setRuleIP(true)
      if (rule_port && rule_name) {
        setDisable(false)
      }
    } else {
      setRuleIP(false)
      setDisable(true)
    }
  }, [ip]);

  useEffect(() => {
    if (port <= 65535 && port >= 1) {
      setRulePort(true)
      if (rule_ip && rule_name) {
        setDisable(false)
      }
    } else {
      setRulePort(false)
      setDisable(true)
    }
  }, [port]);

  function connect() {
    const data = {
      car_name: name,
      car_ip: ip,
      car_port: port,
      jwt: localStorage.getItem("jwt")
    }
    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
      body: JSON.stringify(data)
    };
    fetch('https://sign-register.herokuapp.com/create_carset.php', requestOptions)
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.code === "61") {
          setInputValue(responseJson.message)
          setButtonPop(true)
        } else if (responseJson.code === "62") {
          setInputValue(responseJson.message)
          setButtonPop(true)
        } else if (responseJson.code === "42") {
          setInputValue(responseJson.message)
          setButtonPop(true)
        }
      })
  }

  return (
    <div className="w-96 bg-indigo-50 rounded-3xl py-20 select-none px-4 mt-5">
      <Popup trigger={ButtonPop} setButtonPop={setButtonPop} inputValue={inputValue} />
      <div className="bg-logo1 w-full h-32 bg-no-repeat bg-center bg-contain " />
      <div className="bg-white h-20 mt-16  rounded-2xl py-3">
        <label className="ml-4">AGV Name：</label>
        <div className="flex mx-4">
          <input className="w-80 mt-1 pl-1 h-6 rounded-lg border-4" type="Name" name="Name" onChange={GetName} />
        </div>
      </div>
      <div className="bg-white h-20 mt-8  rounded-2xl py-3">
        <label className="ml-4">AGV IP：</label>
        <div className="flex mx-4">
          <input className="w-80 mt-1 pl-1 h-6 rounded-lg border-4" type="ip" name="ip" onChange={GetIP} />
        </div>
      </div>
      <div className="bg-white h-20 mt-8  rounded-2xl py-3">
        <label className="ml-4">AGV Port：</label>
        <div className="flex mx-4">
          <input className="w-80 mt-1 pl-1 h-6 rounded-lg border-4" type="port" name="port" onChange={GetPort} />
        </div>
      </div>
      <button className="h-10 w-full mt-8 bg-indigo-800 text-white rounded-3xl cursor-pointer hover:bg-sky-700 active:bg-indigo-800 disabled:bg-black disabled:cursor-default" disabled={disable} onClick={connect}>儲存資料庫</button>
    </div>
  );
}

export default InputCarSet;