import React from "react";
import Link from "next/link";
import Image from "next/image";
import "../css/Font.css";
import "../css/signInAndUp.css"

import Logo from "../img/Logo.png";

export default function page() {
  return (
    <>
      <main>
        <a href="/" id="backTo">
          Back
        </a>
        <div className="menu_container">
            <div className="menu_icon">
                <Image src={Logo} />
            </div>
            <div className="menu_header">
                <h1>Welcome</h1>
            </div>
            <div className="menu_button">
                <Link href={"/signInUpMenu/signUp"} id="register">Register</Link>
                <Link href={"/signInUpMenu/signIn"} id="login">Sign In</Link>
            </div>
        </div>
      </main>
    </>
  );
}
