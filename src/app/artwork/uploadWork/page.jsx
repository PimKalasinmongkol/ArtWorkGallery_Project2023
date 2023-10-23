'use client'

import React,{useState ,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/app/components/Navbar'
import Head from 'next/head'
import Image from 'next/image'

import images from '../../createImageImport'

import '../../css/uploadWork.css'

export default function page() {
    const router = useRouter()

  const [user ,setUser] = useState({})
  const [isLoggedIn ,setIsLoggedIn] = useState(false)

  const [artworkData,setArtworkData] = useState({
    artwork_title: '',
    artwork_author: '',
    artwork_work: null,
    artwork_like: null,
    artwork_date: null,
  })

  const session = async () => {
    try {
      const response = await fetch('http://localhost:4000/user/session')
      const data = await response.json()

      if (data.loggedIn) {
        console.log(data.user_session);
        setUser(data.user_session)
        setIsLoggedIn(true)
        router.push('/artwork/uploadWork')
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

  let date_timestamp = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}` 

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
                {
                  Object.keys(images).map((image) => {
                    if (!image.startsWith('src')) {
                      if (image === user.user_imageprofile) {
                        return (
                          <div className='user_profile'>
                            <Image src={images[image]} className='user-edit-image-src' alt='user_edit_image' width={70} height={70} />
                            <h2>{user.user_artistname}</h2>
                          </div>
                        )
                      }
                    }
                  })
                }
                <form className='user_upload' action='' encType=''>
                    <Image src={"https://images.pexels.com/photos/5212653/pexels-photo-5212653.jpeg?auto=compress&cs=tinysrgb&w=1600"} width={400} height={400} />
                    <input type="hidden" name="artwork_author" value={user.user_username} />
                    <input type="hidden" name='artwork_date' value={date_timestamp} />
                    <input type="file" name="artwork_work" id="image" />
                    <input type='text' name='artwork_title' id='title' placeholder='Title...' />
                    <div>
                        <input type="submit" value="Upload" />
                    </div>
                </form>
            </div>
        </main>
    </>
  )
}
