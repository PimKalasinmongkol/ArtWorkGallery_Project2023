'use client'

import React ,{useState ,useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import "../css/userProfile.css"
import "../css/Font.css"
import Navbar from '../components/Navbar'

import Logo from "../img/Logo.png"

export default function page() {
    const router = useRouter()

  const [user ,setUser] = useState({})
  const [isLoggedIn ,setIsLoggedIn] = useState(false)

  const session = async () => {
    try {
      const response = await fetch('http://localhost:4000/user/session')
      const data = await response.json()

      if (data.loggedIn) {
        console.log(data.user_session)
        setUser(data.user_session)
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error("Request failed : " + JSON.stringify(error));
    }
  }

  useEffect(() => {
    session()
    if (isLoggedIn == false) {
      router.push("/signInUpMenu/")
    } else {
      router.push("/user")
    }
  }, [isLoggedIn])

    const fakeData = [
        {
            img: "https://images.pexels.com/photos/18714307/pexels-photo-18714307/free-photo-of-delara.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
            date: new Date().toLocaleDateString().toString() + " " + new Date().toLocaleTimeString().toString()
        },
        {
            img: "https://images.pexels.com/photos/18573394/pexels-photo-18573394/free-photo-of-people-cycling-along-the-canal.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
            date: new Date().toLocaleDateString().toString() + " " + new Date().toLocaleTimeString().toString()
        },
        {
            img: "https://images.pexels.com/photos/9663326/pexels-photo-9663326.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
            date: new Date().toLocaleDateString().toString() + " " + new Date().toLocaleTimeString().toString()
        },
        {
            img: "https://images.pexels.com/photos/12626953/pexels-photo-12626953.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
            date: new Date().toLocaleDateString().toString() + " " + new Date().toLocaleTimeString().toString()
        },
        {
            img: "https://images.pexels.com/photos/18624571/pexels-photo-18624571/free-photo-of-brunette-woman-in-coat-looking-up-in-evening.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
            date: new Date().toLocaleDateString().toString() + " " + new Date().toLocaleTimeString().toString()
        },
        {
            img: "https://images.pexels.com/photos/18693471/pexels-photo-18693471.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
            date: new Date().toLocaleDateString().toString() + " " + new Date().toLocaleTimeString().toString()
        },
    ]

  return (
    <>
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="author" content="user_profile" />
            <meta name="description" content="Portfolio of user_profile" />
            <title>User Profile</title>
        </Head>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main>
            <div className='user_header'>
                <div className='user_image_header'>
                    <Image src={Logo} />
                </div>
                <div className='user_info_header'>
                    <h2>{user.user_username}</h2>
                    <p>description profile</p>
                </div>
            </div>
            <div className='user_artwork'>
                <div className='user_artwork'>
                    <div className='artwork_container'>
                        {
                            fakeData.map(item => (
                                <div>
                                    <Image src={item.img} style={{objectFit:'cover' ,borderRadius: '30px'}} width={670} height={670}/>
                                    <p>Post Date: {item.date}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}
