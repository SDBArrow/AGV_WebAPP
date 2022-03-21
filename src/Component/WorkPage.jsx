import React, { useEffect,useState } from 'react';
import { useNavigate ,Outlet} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

function WorkPage() {

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

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
          const name = (responseJson.data.firstname+responseJson.data.lastname) 
          setInputValue(name)
        } else {
          navigate('/Sign')
        }
      })
  })

  return (
    <div className='h-full w-screen'>
      <Header inputValue={inputValue}/>
      <Outlet />
      <Footer />
    </div>
  );
}

export default WorkPage;