import React, { useEffect, useState } from 'react'
import "./PageSection.css"

import LoginCard from '../LoginCard/LoginCard'

function PageSection(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(()=>{
    if(localStorage.getItem("userData")){
      setIsLoggedIn(()=>{return true});
      setUserData(()=>{return JSON.parse(localStorage.getItem("userData"))});
    }
  },[]);

  useEffect(() => {
    if(userData){
      console.log(userData, "USER DATA");
    }
  }, [userData])

  const logIn = () => {
    setIsLoggedIn(() => {return true});
    setUserData(()=>{return JSON.parse(localStorage.getItem("userData"))});
    // console.log("SS LOGGED IN", userData);
  }

  return (
    <section className='page-section'>
      {!isLoggedIn && <LoginCard logIn={logIn}/>}
      
      {props.children}
    </section>
  )
}

export default PageSection