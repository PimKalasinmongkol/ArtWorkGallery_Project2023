"use client"

import React, { useState } from "react";
import Link from "next/link";
import "../../css/Font.css"
import "../../css/signInAndUp.css"

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Login() {
  const [username ,setUsername] = useState("")
  const [password ,setPassword] = useState("")

  const handleSetUsername = (event) => {
    setUsername(event.target.value)
  }

  const handleSetPassword = (event) => {
    setPassword(event.target.value)
  }

  const handleFormSubmit = async(event) => {
    try {
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      })
      const data = await response.json()
      console.log(data.success)
      console.log(data.message)
      console.log(username)
      console.log(password)
      if (data.success) {
        sessionStorage.setItem("username", data.user_username);
        MySwal.fire({
          icon: "success",
          title: "Login Success",
          text: "Redirecting to Home Page",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.href = "/"; // Redirect to home page
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid username or password",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error("Request failed : " + JSON.stringify(error));
      MySwal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid username or password',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  return (
    <div>
      <main>
        <Link href={"/signInUpMenu"} id="backTo">Back</Link>
        <form onSubmit={handleFormSubmit} method="post">
          <div className="form_header">
            <h1>Artist</h1>
          </div>
          <div className="form_container">
            <div className="form_group">
              <p>Username</p>
              <input
                type="text"
                name="username"
                id="username"
                onChange={handleSetUsername}
                required
              />
            </div>
            <div className="form_group">
              <p>Password</p>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleSetPassword}
                required
              />
            </div>
          </div>
          <div className="button_container">
            <Link href={"/signInUpMenu/signUp"}>Sign Up</Link>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </main>
    </div>
  );
}
