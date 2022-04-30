import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ChoseCarSet() {

  const [car_name, setCar_Name] = useState("")
  const [car_ip, setCar_IP] = useState("")
  const [car_port, setCar_Port] = useState("")
  const navigate = useNavigate();

  function updateset() {
    navigate('/GeneralCtrl')
  }

  useEffect(() => {
    setCar_Name(localStorage.getItem("car_name"))
    setCar_IP(localStorage.getItem("ip"))
    setCar_Port(localStorage.getItem("port"))
  },)

  return (
    <div className="w-96 bg-indigo-50 rounded-3xl py-20 select-none px-4 mt-5">
      <div className="bg-logo1 w-full h-32 bg-no-repeat bg-center bg-contain " />
      <div className="bg-white h-12 mt-16  rounded-2xl py-3">
        <label className="ml-4">AGV Name：{car_name}</label>
      </div>
      <div className="bg-white h-12 mt-8  rounded-2xl py-3">
        <label className="ml-4">AGV IP：{car_ip}</label>
      </div>
      <div className="bg-white h-12 mt-8  rounded-2xl py-3">
        <label className="ml-4">AGV Port：{car_port}</label>
      </div>
      <button className="h-10 w-full mt-8 bg-indigo-800 text-white rounded-3xl cursor-pointer hover:bg-sky-700 active:bg-indigo-800 disabled:bg-black disabled:cursor-default" onClick={updateset}>到操作介面</button>
    </div>
  );
}

export default ChoseCarSet;