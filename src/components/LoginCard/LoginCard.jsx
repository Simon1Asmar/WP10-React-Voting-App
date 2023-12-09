import React, { useState } from "react";
import axios from "axios";

import "./LoginCard.css";

function LoginCard(props) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const inputEmail = e.target.elements.email.value;
    const inputPassword = e.target.elements.password.value;

    axios
      .get("https://65745cd7f941bda3f2afa76c.mockapi.io/votingapp/users")
      .then((response) => {
        console.log(response.data);
        console.log(inputEmail, inputPassword);

        const filteredResponse = response.data.filter((user) => {
          if (user.email === inputEmail && user.password === inputPassword) {
            console.log("yes");
            return true;
          }
        });

        if (filteredResponse.length === 1) {
          localStorage.setItem("userData", JSON.stringify(filteredResponse[0]));
          props.logIn();
        }
        console.log("filteredResponse", filteredResponse);
        // setUsersData(()=>{ return response.data});
        // console.log("usersData", usersData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <section className="login-card flex-col" onSubmit={handleLogin}>
      <h1 className="logo-text">PRIME VOTE</h1>

      <form className="flex-col">
        <input type="email" name="email" id="email" required placeholder="Email"/>

        <input type="password" name="password" id="password" required placeholder="Password"/>

        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default LoginCard;
