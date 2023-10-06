"use client"

import React, { useState } from "react";
import Link from "next/link";
import "../../css/Font.css"
import "../../css/signInAndUp.css"

export default function Login() {
  const [email ,setEmail] = useState("")
  const [password ,setPassword] = useState("")

  const handleSetEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleSetPassword = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <main>
        <a href="/signInUpMenu" id="backTo">
        Back
        </a>
        <form action="/addUser">
          <div className="form_header">
            <h1>Artist</h1>
          </div>
          <div className="form_container">
            <div className="form_group">
              <p>Email</p>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleSetEmail}
                required
              />
            </div>
            <div className="form_group">
              <p>Password</p>
              <input
                type="text"
                name="password"
                id="password"
                onChange={handleSetPassword}
                required
              />
            </div>
          </div>
          <div className="button_container">
            <Link href={"/signIn/signUp"}>Sign Up</Link>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </main>
    </div>
  );
}
