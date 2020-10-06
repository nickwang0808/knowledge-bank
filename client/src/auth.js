import React, { useState } from "react";
import "./auth.css";

export default function Auth({ checkAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const url = {
    register: "http://localhost:4000/api/register",
    login: "http://localhost:4000/api/login",
  };

  const sendData = async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    console.log(response);
    checkAuth();
  };

  return (
    <>
      <h2>Login or Register</h2>
      <div>
        <form>
          <label htmlFor="username">Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label htmlFor="username">password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              sendData(url.register, {
                username: username,
                password: password,
              });
            }}
          >
            Register
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              sendData(url.login, { username: username, password: password });
            }}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
