import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from './Header'
import Footer from './Footer'

function Hall() {

  const navigate = useNavigate();

  useEffect(() => {
    const data = { jwt: localStorage.getItem("jwt") }

    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
      body: JSON.stringify(data)
    };
    fetch('https://sign-register.herokuapp.com/validate_token.php', requestOptions)
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.code === "41") {

        } else {
          navigate('/sign')
        }
      })
  })

  return (
    <div className='bg-background h-full w-screen'>
      <Header />

      <Footer />
    </div>
  );
}

export default Hall;