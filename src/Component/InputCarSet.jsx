import React, { useState, useEffect } from 'react';
import Popup from './Popup';

function InputCarSet() {
  const [name, setName] = useState("")
  const [ip, setIP] = useState("")
  const [port, setPort] = useState("")
  const [disable, setDisable] = useState(true)
  const [ButtonPop, setButtonPop] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const GetName = (event) => {
    setName(event.target.value)
  }
  const GetIP = (event) => {
    setIP(event.target.value)
  }
  const GetPort = (event) => {
    setPort(event.target.value)
  }

  function connect() {
    localStorage.setItem("ip", ip);
    localStorage.setItem("port", port);
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
      <button className="h-10 w-full mt-8 bg-indigo-800 text-white rounded-3xl cursor-pointer hover:bg-sky-700 active:bg-indigo-800 disabled:bg-black disabled:cursor-default" disabled={disable} onClick={connect}>設定連線</button>
    </div>
  );
}

export default InputCarSet;