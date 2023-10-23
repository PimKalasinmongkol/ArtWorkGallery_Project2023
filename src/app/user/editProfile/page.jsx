"use client"
import { useRouter } from 'next/navigation'
import React, {useState ,useEffect} from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Navbar from '@/app/components/Navbar'

import images from '../../createImageImport'

import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

import '../../css/editProfile.css'

const MySwal = withReactContent(Swal)

export default function page() {
  const router = useRouter()
  
  const [user ,setUser] = useState({})
  const [isLoggedIn ,setIsLoggedIn] = useState(false)
  
  const [userData ,setUserData] = useState({
    user_id: '',
    user_username: '',
    user_email: '',
    user_password: '',
    user_artistname: '',
    user_imageProfile: null,
  })

    const session = async () => {
      try {
        const response = await fetch('http://localhost:4000/user/session')
        const data = await response.json()
    
        if (data.loggedIn) {
          console.log(data.user_session)
          setUser(data.user_session)
          setIsLoggedIn(true)
          setUserData(data.user_session)
          router.push('/user/editProfile')
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

    const handleSetUserData = (event) => {
      setUserData({
      ...userData,
        [event.target.name] : event.target.value
      })
    }

    const handleSetUserDataFile = (event) => {
      setUserData({
      ...userData,
        user_imageProfile : event.target.files[0]
      })
    }

    const handleSubmit = async(event) => {
      event.preventDefault()

      const formData = new FormData()
      formData.append('id', userData.user_id)
      formData.append('username', userData.user_username)
      formData.append('password', userData.user_password)
      formData.append('email', userData.user_email)
      formData.append('artistname', userData.user_artistname)
      formData.append('imageprofile', userData.user_imageProfile)

      try {
        const request = await fetch('http://localhost:4000/user/editUserData', {
          method: 'POST',
          body: formData
        })
        const data = await request.json()
        console.log(data.update_data)
        console.log(data.message);
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

    Object.keys(images).forEach((image) => {
      if (!image.startsWith('src')) {
        console.log(image);
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
                {
                  Object.keys(images).map((image) => {
                    if (!image.startsWith('src')) {
                      if (image === user.user_imageprofile) {
                        return (
                          <div className='user-edit-image-container'>
                            <Image src={images[image]} className='user-edit-image-src' alt='user_edit_image' width={500} height={500} />
                          </div>
                        )
                      }
                    }
                  })
                }
                <form className='user-edit-form-container' onSubmit={handleSubmit}>
                    <input type="hidden" name='user_id' value={userData.user_id} onChange={handleSetUserData}  />
                    <div className='user-edit-form-input'>
                        <label htmlFor="">Username</label>
                        <input type="text" name="user_username" id="username" value={userData.user_username} onChange={handleSetUserData} />
                    </div>
                    <br />
                    <div className='user-edit-form-input'>
                        <label htmlFor="">ArtistName</label>
                        <input type="text" name="user_artistname" id="artistname" value={userData.user_artistname} onChange={handleSetUserData} />
                    </div>
                    <br />
                    <div className='user-edit-form-input'>
                        <label htmlFor="">Email</label>
                        <input type="email" name="user_email" id="email" value={userData.user_email} onChange={handleSetUserData} />
                    </div>
                    <br />
                    <div className='user-edit-form-input'>
                        <label htmlFor="">Password</label>
                        <input type="password" name="user_password" id="password" value={userData.user_password} onChange={handleSetUserData} />
                    </div>
                    <br />
                    <div className='user-edit-form-input'>
                        <label htmlFor="">Image</label>
                        <input type="file" name="user_imageProfile" id="image" onChange={handleSetUserDataFile} />
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
