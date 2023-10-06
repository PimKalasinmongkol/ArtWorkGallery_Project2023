"use client";
import React, { useEffect, useState } from "react";

import "../../css/signInAndUp.css";
import "../../css/Font.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal)

export default function signUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailValidate ,setEmailValidate] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [passwordStrengthLevel, setPasswordStrengthLevel] = useState(0);

  const [passwordStrengthCheck_1, setPasswordStrengthCheck_1] = useState(false);
  const [passwordStrengthCheck_2, setPasswordStrengthCheck_2] = useState(false);
  const [passwordStrengthCheck_3, setPasswordStrengthCheck_3] = useState(false);

  const [passwordStrengthMeter, setPasswordStrengthMeter] = useState(0);

  let stock = 3;

  let upperCase_regex = /[A-Z]$/;
  let lowerCase_regex = /[a-z]$/;
  let numerical_regex = /[0-9]$/;
  let mail_regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

  let meterLevel = {
    bad_color: "red",
    medium_color: "yellow",
    good_color: "green",
  };

  const FormValidation = (event) => {
    event.preventDefault();

    console.log(password);
    console.log(passwordConfirm);
    console.log(email);
    console.log(username);

    let checkEmail = false
    let checkPassword = false
    let checkUsername = false
    // email validation
    if (mail_regex.test(email)) {
        setEmailValidate(true)
        checkEmail = true
    } else {
        setEmailValidate(false)
        checkEmail = false
    }
    
    if (password.length > 7 && password.length <= 20) {
      if (password != passwordConfirm) {
        MySwal.fire({
          icon: 'error',
          text: 'confirm password is not match!',
        })
        checkPassword = false
      } else {
        checkPassword = true
      }
    } else {
      MySwal.fire({
        icon: 'error',
        text: 'Password length must be between 7 and 20 characters',
      })
      checkPassword = false
    }

    if (username.length < 3) {
      MySwal.fire({
        icon: 'error',
        text: 'Username must be at least 3 characters',
      })
      checkUsername = false
    } else {
      checkUsername = true
    }

    if (checkEmail && checkPassword && checkUsername) {
      MySwal.fire({
        icon: 'success',
        title: 'Registration Success',
        text: 'Welcome to Artist Gallery'
      })
      return true
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Something went wrong'
      })
      return false
    }
  };

  const handleSetPassword = (event) => {
    let getPassword = event.target.value;
    setPassword(event.target.value);
    if (getPassword.length > 0) {
      if (
        upperCase_regex.test(getPassword) &&
        passwordStrengthCheck_1 === false
      ) {
        setPasswordStrengthCheck_1(!passwordStrengthCheck_1);
        setPasswordStrengthMeter((prev) => {
          if (prev === stock) return prev;
          return prev + 1;
        });
      }
      if (
        lowerCase_regex.test(getPassword) &&
        passwordStrengthCheck_2 === false
      ) {
        setPasswordStrengthCheck_2(!passwordStrengthCheck_2);
        setPasswordStrengthMeter((prev) => {
          if (prev === stock) return prev;
          return prev + 1;
        });
      }
      if (
        numerical_regex.test(getPassword) &&
        passwordStrengthCheck_3 === false
      ) {
        setPasswordStrengthCheck_3(!passwordStrengthCheck_3);
        setPasswordStrengthMeter((prev) => {
          if (prev === stock) return prev;
          return prev + 1;
        });
      }
      console.log(passwordStrengthMeter);
    } else {
      setPasswordStrengthCheck_1(false);
      setPasswordStrengthCheck_2(false);
      setPasswordStrengthCheck_3(false);
      setPasswordStrengthMeter(0);
    }
  };

  const handleSetEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleSetUsername = (event) => {
    setUsername(event.target.value)
  }

  const handleSetPasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value)
  }

  return (
    <div>
      <main>
        <a href="/signInUpMenu" id="backTo">Back</a>
        <form action="/addUser" onSubmit={FormValidation}>
          <div className="form_header">
            <h1>Artist</h1>
          </div>
          <div className="form_container">
            <div className="form_group">
              <p>Email</p>
              <input type="email" name="email" id="email" onChange={handleSetEmail} required />
              {
                emailValidate == false ?
                <p style={{color: "red"}}>Email format is invalid</p>
                :
                <p></p>
              }
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
              {password.length > 0 ? (
                <div className="passwordValidator">
                  <small
                    style={{
                      color: "white",
                      textShadow: "2px 2px 2px rgba(0,0,0,0.3)",
                    }}
                  ></small>
                  <div className="passwordStrengthMeter">
                    <span
                      style={{
                        width: "48px",
                        borderWidth: "5px",
                        borderStyle: "solid",
                        borderColor:
                          passwordStrengthMeter == 1
                            ? "red"
                            : passwordStrengthMeter == 2
                            ? "yellow"
                            : passwordStrengthMeter == 3
                            ? "green"
                            : "white",
                      }}
                    ></span>
                    <span
                      style={{
                        width: "48px",
                        borderWidth: "5px",
                        borderStyle: "solid",
                        borderColor:
                          passwordStrengthMeter == 1
                            ? "red"
                            : passwordStrengthMeter == 2
                            ? "yellow"
                            : passwordStrengthMeter == 3
                            ? "green"
                            : "white",
                      }}
                    ></span>
                    <span
                      style={{
                        width: "48px",
                        borderWidth: "5px",
                        borderStyle: "solid",
                        borderColor:
                          passwordStrengthMeter == 2
                            ? "yellow"
                            : passwordStrengthMeter == 3
                            ? "green"
                            : "white",
                      }}
                    ></span>
                    <span
                      style={{
                        width: "48px",
                        borderWidth: "5px",
                        borderStyle: "solid",
                        borderColor:
                          passwordStrengthMeter == 3 ? "green" : "white",
                      }}
                    ></span>
                    <span
                      style={{
                        width: "48px",
                        borderWidth: "5px",
                        borderStyle: "solid",
                        borderColor:
                          passwordStrengthMeter == 3 ? "green" : "white",
                      }}
                    ></span>
                  </div>
                  <div className="passwordRequirement">
                    <ul>
                      <li style={{ listStyleType: "none" }}>
                        <p
                          style={{
                            color:
                              password.length > 7 && password.length <= 20
                                ? "white"
                                : "red",
                            textShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          7-20 Characters
                        </p>
                      </li>
                      <li style={{ listStyleType: "none" }}>
                        <p
                          style={{
                            color: passwordStrengthCheck_1
                              ? "white"
                              : "red",
                            textShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          At least one capital letter
                        </p>
                      </li>
                      <li style={{ listStyleType: "none" }}>
                        <p
                          style={{
                            color: passwordStrengthCheck_2
                              ? "white"
                              : "red",
                            textShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          At least one number
                        </p>
                      </li>
                      <li style={{ listStyleType: "none" }}>
                        <p
                          style={{
                            color: passwordStrengthCheck_3
                              ? "white"
                              : "red",
                            textShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          At least one special symbol
                        </p>
                      </li>
                      <li style={{ listStyleType: "none" }}>
                        <p
                          style={{
                            color: password.indexOf(" ") >= 0 ? "red" : "white",
                            textShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          No spaces
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="form_group">
              <p>Password Confirm</p>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                onChange={handleSetPasswordConfirm}
                required
              />
            </div>
            <div className="form_group">
              <p>Username</p>
              <input type="text" name="username" id="username" onChange={handleSetUsername} required />
            </div>
          </div>
          <div className="button_container">
            <button type="reset" onClick={() => window.location.reload(true)}>Cancel</button>
            <button type="submit">Create</button>
          </div>
        </form>
      </main>
    </div>
  );
}
