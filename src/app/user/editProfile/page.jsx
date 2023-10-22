"use client"
import { useRouter } from 'next/navigation'
import React, {useState ,useEffect} from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Navbar from '@/app/components/Navbar'

import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

import '../../css/editProfile.css'

const MySwal = withReactContent(Swal)

export default function page() {
    const router = useRouter()

    const [user ,setUser] = useState({})
    const [isLoggedIn ,setIsLoggedIn] = useState(false)

    const [id ,setId] = useState(null)
    const [username ,setUsername] = useState("")
    const [email ,setEmail] = useState("")
    const [password ,setPassword] = useState("")
    const [artistname ,setArtistname] = useState("")
    const [imageProfile ,setImageProfile] = useState(null)

    const handleSetUsername = (event) => {
      setUsername(event.target.value)
    }
    
    const handleSetEmail = (event) => {
      setEmail(event.target.value)
    }

    const handleSetPassword = (event) => {
      setPassword(event.target.value)
    }

    const handleSetArtistname = (event) => {
      setArtistname(event.target.value)
    }

    const handleSetImageProfile = (event) => {
      setImageProfile(event.target.files[0])
    }

    const handleSetId = (event) => {
      setId(event.target.value)
    }

    const handleSubmit = async(event) => {
      event.preventDefault()

      const formData = new FormData()
      formData.append('id' ,id)
      formData.append('username',username)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('artistname',artistname)
      formData.append('file',imageProfile)

      try {
        const request = await fetch('http://localhost:4000/user/editProfile', {
          method: 'POST',
          body: formData
        })
        const data = await request.json()
        console.log(data)
        MySwal.fire({
          icon:'success',
          title: 'update profile success',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        console.error(error)
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  
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
                <form className='user-edit-form-container' onSubmit={handleSubmit}>
                    <input type="hidden" name='id' value={user.user_id} onChange={handleSetId} />
                    <div className='user-edit-form-input'>
                        <label htmlFor="">Username</label>
                        <input type="text" name="username" id="username" value={user.user_username} onChange={handleSetUsername} />
                    </div>
                    <br />
                    <div className='user-edit-form-input'>
                        <label htmlFor="">ArtistName</label>
                        <input type="text" name="artistname" id="artistname" value={user.user_artistname} onChange={handleSetArtistname} />
                    </div>
                    <br />
                    <div className='user-edit-form-input'>
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" id="email" value={user.user_email} onChange={handleSetEmail} />
                    </div>
                    <br />
                    <div className='user-edit-form-input'>
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" id="password" value={user.user_password} onChange={handleSetPassword} />
                    </div>
                    <br />
                    <div className='user-edit-form-input'>
                        <label htmlFor="">Image</label>
                        <input type="file" name="image" id="image" value={user.user_imageProfile} onChange={handleSetImageProfile} />
                    </div>
                    <br />
                    <div className='user-edit-form-input-submit'>
                        <input type='submit' value="SAVE" />
                    </div>
                </form>
            </div>
        </main>
    </>
  )
}
