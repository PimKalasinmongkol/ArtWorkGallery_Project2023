"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../css/navbar.css";
import Logo from "../img/Logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({is_enableSearchBar}) {
  const [search ,setSearch] = useState("")
  
  const handleSetSearch = (event) => {
    setSearch(event.target.value)
  }
  
  return (
    <>
      <nav>
        <div className="header_img">
          <Image src={Logo} className="image_nav" />
        </div>
        <div className="anchor_menu">
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/contact"}>Contact</Link>
          <Link href={"/signInUpMenu"}>Login</Link>
          <div className="profile_nav">
            <p>My Gallery</p>
            <Image src={Logo} />
          </div>
        </div>
      </nav>
      {
        is_enableSearchBar ? 
        <div className="form_search">
          <form className="form_search_">
            <input
              type="search"
              name="search"
              placeholder="search keyword"
              onChange={handleSetSearch}
            />
            <button type="submit">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="icon_search"
              />
            </button>
          </form>
        </div>
        :
        <div></div>
      }
    </>
  );
}
