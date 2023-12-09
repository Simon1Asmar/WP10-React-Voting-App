import React, { useEffect, useState } from "react";
import "./PageSection.css";

import LoginCard from "../LoginCard/LoginCard";
import Header from "../Header/Header";
import VotingPage from "../VotingPage/VotingPage";

function PageSection(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setIsLoggedIn(() => {
        return true;
      });
      setUserData(() => {
        return JSON.parse(localStorage.getItem("userData"));
      });
      setIsAdmin(() => {
        return userData.isAdmin;
      });
    }
  }, []);

  useEffect(() => {
    if (userData) {
      console.log(userData, "USER DATA");
    }
  }, [userData]);

  const logIn = () => {
    setIsLoggedIn(() => {
      return true;
    });
    setUserData(() => {
      return JSON.parse(localStorage.getItem("userData"));
    });
    // console.log("SS LOGGED IN", userData);
  };

  const logOut = () => {
    setIsLoggedIn(() => {
      return false;
    });
    setUserData(() => {
      return "";
    });
    localStorage.clear();
    console.log("LOGGING OUT");
  };

  return (
    <section className="page-section">
      {!isLoggedIn && <LoginCard logIn={logIn} />}

      {isLoggedIn && userData.isAdmin && (
       <Header logOut={logOut} isAdmin={true}/>
      )}

      {isLoggedIn && !userData.isAdmin && (
       <Header logOut={logOut} isAdmin={false}/>
      )}

      {props.children}
    </section>
  );
}

export default PageSection;
