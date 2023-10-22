"use client"
import { useRouter } from 'next/navigation'
import React, {useState ,useEffect} from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Navbar from '@/app/components/Navbar'

import '../../css/editProfile.css'

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
        router.push("/user/editProfile")
      }
    }, [isLoggedIn])

    useEffect(() => {
        session()
        if (isLoggedIn == false) {
            router.push("/signInUpMenu/")
        } else {
            router.push("/user/editProfile")
        }
    })
  return (
    <>
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="author" content="user_profile" />
            <meta name="description" content="Portfolio of user_profile" />
            <title>User Editor</title>
        </Head>
        <Navbar is_enableSearchBar={false} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main>
            <div className='user-edit-container'>
                <div className='user-edit-image-container'>
                    <Image src={"https://images.pexels.com/photos/18693471/pexels-photo-18693471.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"} width={500} height={500} />
                </div>
                <form className='user-edit-form-container' action='/user/editUserData' encType='multipart/form-data'>
                    <input type="hidden" name='id' value={user.user_id} />
                    <div className='user-edit-form-input'>
                        <label htmlFor="">Username</label>
                        <input type="text" name="username" id="username" value={user.user_username} />
                    </div>
                    <br />
                    <div className='user-edit-form-input'>
                        <label htmlFor="">ArtistName</label>
                        <input type="text" name="artistname" id="artistname" value={user.user_artistname} />
                    </div>
                    <br />
                    <div className='user-edit-form-input'>
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" id="email" value={user.user_email} />
                    </div>
                    <br />
                    <div className='user-edit-form-input'>
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" id="password" value={user.user_password} />
                    </div>
                    <br />
                    <div className='user-edit-form-input'>
                        <label htmlFor="">Image</label>
                        <input type="file" name="image" id="image" value={user.user_imageProfile} />
                    </div>
                    <br />
                    <div className='user-edit-form-input-submit'>
                        <input type='submit' name="" id="" value="SAVE" />
                    </div>
                </form>
            </div>
        </main>
    </>
  )
}
