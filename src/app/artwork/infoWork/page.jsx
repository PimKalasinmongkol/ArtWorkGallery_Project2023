'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Navbar from "@/app/components/Navbar";

import '../../css/infoWork.css'

export default function page() {
  const router = useRouter()

  const [user ,setUser] = useState({})
  const [isLoggedIn ,setIsLoggedIn] = useState(false)

  const session = async () => {
    try {
      const response = await fetch('http://localhost:4000/user/session')
      const data = await response.json()

      if (data.loggedIn) {
        console.log(data.user_session);
        setUser(data.user_session)
        setIsLoggedIn(true)
        router.push('/artwork/infoWork')
      } else {
        setIsLoggedIn(false)
        router.push('/signInUpMenu')
      }
    } catch (error) {
      console.error("Request failed : " + JSON.stringify(error));
    }
  }

  useEffect(() => {
    session()
  }, [isLoggedIn])

  return (
    <>
      <Navbar
        is_enableSearchBar={false}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <main>
        <div className="container">
          <div className="image-artwork">
            
          </div>
          <div className="user-interaction-bar">
            <div className="user-info">
              
            </div>
            <div className="user-comment-container">
              
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
