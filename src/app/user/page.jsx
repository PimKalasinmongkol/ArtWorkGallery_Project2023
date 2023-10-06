import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import "../css/userProfile.css"
import "../css/Font.css"

import Navbar from '../components/Navbar'

import Logo from "../img/Logo.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLock } from '@fortawesome/free-solid-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'

export default function page() {
  return (
    <>
        <Navbar />
        <main>
            <div className='user_header'>
                <div className='user_image_header'>
                    <Image src={Logo} />
                </div>
                <div className='user_info_header'>
                    <h2>Username</h2>
                    <p>description profile</p>
                </div>
            </div>
            <div className='user_interaction'>
                <div className='user_follower_button'>
                    <div>
                        <FontAwesomeIcon icon={faUserLock} width={"100%"} />
                    </div>
                    <p>Follow</p>
                </div>
                <div className='user_share_button'>
                    <FontAwesomeIcon icon={faShare} width={"100%"}/>
                </div>
            </div>
            <div>
                <div className='user_artwork'>
                    <div className='artwork_container'>
                        
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}
