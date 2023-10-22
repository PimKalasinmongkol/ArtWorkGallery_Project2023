'use client'

import React,{useState ,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/app/components/Navbar'
import Head from 'next/head'
import Image from 'next/image'

import '../../css/uploadWork.css'

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
      router.push("/artwork/uploadWork")
    }
  }, [isLoggedIn])
  return (
    <>
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="author" content="user_artwork" />
            <meta name="description" content="upload artwork+" />
            <title>Upload ArtWork</title>
        </Head>
        <Navbar is_enableSearchBar={false} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main>
            <div className='container'>
                <div className='user_profile'>
                    <Image src={"https://images.pexels.com/photos/8923536/pexels-photo-8923536.jpeg?auto=compress&cs=tinysrgb&w=1600"} width={80} height={80} />
                    <h2>Username</h2>
                </div>
                <form className='user_upload' action='' encType=''>
                    <Image src={"https://images.pexels.com/photos/5212653/pexels-photo-5212653.jpeg?auto=compress&cs=tinysrgb&w=1600"} width={500} height={500} />
                    <input type="file" name="image" id="image" />
                    <input type='text' name='title' id='title' placeholder='Title...' />
                    <div>
                        <input type="submit" value="Upload" />
                    </div>
                </form>
            </div>
        </main>
    </>
  )
}
