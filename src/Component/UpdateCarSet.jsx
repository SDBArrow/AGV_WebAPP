import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Popup from './Popup';

function UpdateCarSet() {


  const [disable, setDisable] = useState(true)
  const [ButtonPop, setButtonPop] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  function updateset() {
    /*
    localStorage.setItem("ip", ip);
    localStorage.setItem("port", port);
    navigate('/GeneralCtrl')*/
  }

  return (
    <div className="w-96 bg-indigo-50 rounded-3xl py-20 select-none px-4 mt-5">
      <Popup trigger={ButtonPop} setButtonPop={setButtonPop} inputValue={inputValue} />
      <div className="bg-logo1 w-full h-32 bg-no-repeat bg-center bg-contain " />
      <div className="bg-white h-20 mt-16  rounded-2xl py-3">
        <label className="ml-4">AGV Name：</label>
        <div className="flex mx-4">

        </div>
      </div>
      <div className="bg-white h-20 mt-8  rounded-2xl py-3">
        <label className="ml-4">AGV IP：</label>
        <div className="flex mx-4">

        </div>
      </div>
      <div className="bg-white h-20 mt-8  rounded-2xl py-3">
        <label className="ml-4">AGV Port：</label>
        <div className="flex mx-4">

        </div>
      </div>
      <button className="h-10 w-full mt-8 bg-indigo-800 text-white rounded-3xl cursor-pointer hover:bg-sky-700 active:bg-indigo-800 disabled:bg-black disabled:cursor-default" disabled={disable} onClick={updateset}>設定AGV連線</button>
    </div>
  );
}

export default UpdateCarSet;