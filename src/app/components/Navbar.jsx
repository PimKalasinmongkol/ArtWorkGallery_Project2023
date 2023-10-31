"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../css/navbar.css";
import Logo from "../img/Logo.png";

import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const MySwal = withReactContent(Swal);

export default function Navbar({is_enableSearchBar ,isLoggedIn ,setIsLoggedIn}) {
  const router = useRouter();

  const [search ,setSearch] = useState("")
  const [toggleNav ,setToggleNav] = useState(false)

  const handleSetSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleToggleNav = () => {
    setToggleNav(!toggleNav)
  }

  const handleLogout = async() => {
    MySwal.fire({
      icon: "warning",
      title: "Are you sure you want to log out",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logged Out!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch("http://localhost:4000/user/logout")
          const data = await response.json()
          setIsLoggedIn(false)
        } catch (error) {
          console.error("Request failed : " + JSON.stringify(error));
        }
        MySwal.fire({
          icon:'success',
          title: 'Logged Out',
          showConfirmButton: false,
          timer: 1500
        })
        router.push("/signInUpMenu/")
      } else {

      }
    });
  }
  
  return (
    <>
      <nav>
        <div className="header_img">
          <Image src={Logo} className="image_nav" alt="logo_nav" />
        </div>
        <div className="anchor_menu">
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
          {
            !isLoggedIn ? 
            <Link href={"/signInUpMenu"}>Login</Link>
            :
            <button onClick={handleLogout}>Logout</button>
          }
        </div>
        <div className="hamburger-navbar" onClick={handleToggleNav}>
          <FontAwesomeIcon
            icon={faBars}
            size='lg'
            color="#fff"
          />
        </div>
      </nav>
      <div className="slide-right-navbar" style={{transform: toggleNav ? "translateX(0%)" : "translateX(100%)"}}>
        {
          isLoggedIn ? 
          <div className="slide-right-navbar-container">
            <Link href={"/user"}>Profile</Link>
            <Link href={"/user/editProfile"}>Setting</Link>
            <Link href={"/artwork/uploadWork"}>+ Artwork</Link>
          </div>
          :
          <div></div>
        }
      </div>
    </>
  );
}
