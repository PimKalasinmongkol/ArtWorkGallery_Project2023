'use client'

import React,{useState ,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/app/components/Navbar'
import Head from 'next/head'
import Image from 'next/image'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import images from '../../createImageImport'

import '../../css/uploadWork.css'

const MySwal = withReactContent(Swal)

export default function page() {
  const router = useRouter()

  const [user ,setUser] = useState({})
  const [isLoggedIn ,setIsLoggedIn] = useState(false)
  const [selectedImage ,setSelectedImage] = useState(null)

  const [artworkData,setArtworkData] = useState({
    artwork_title: '',
    artwork_author: '',
    artwork_work: null,
  })
  
  const session = async () => {
    try {
      const response = await fetch('http://localhost:4000/user/session')
      const data = await response.json()
  
      if (data.loggedIn) {
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
  
  const handleSetInput = (event) => {
    setArtworkData({
    ...artworkData,
      [event.target.name] : event.target.value
    })
  }
  
  const handleSetInputFile = (event) => {
    setArtworkData({
      ...artworkData,
      artwork_work : event.target.files[0]
    })
    setSelectedImage(URL.createObjectURL(event.target.files[0]))
  }
  
  
  const handleFormSubmit = async(event) => {
    event.preventDefault()
    
    if (artworkData.artwork_title === null & artworkData.artwork_work === null) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields',
        showConfirmButton: false,
        timer: 1500
      })
      return false;
    }

    console.log("artwork artistname: " + user.user_username);

    const formData = new FormData()
    formData.append('title', artworkData.artwork_title)
    formData.append('author', user.user_username)
    formData.append('work', artworkData.artwork_work)
    
    try {
      const request = await fetch('http://localhost:4000/gallery/createArtwork',{
        method: 'POST',
        body: formData
      })
      const data = await request.json()
      MySwal.fire({
        icon:'success',
        title: 'create artwork success',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (err) {
      console.error('Error creating artwork : ' + err.message);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  
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
                <form className='user_upload' onSubmit={handleFormSubmit}>
                    <Image src={selectedImage === null ? "" : selectedImage} width={400} height={400} alt={selectedImage === null ? "" : selectedImage} />
                    <input type="file" name="artwork_work" id="image" onChange={handleSetInputFile} />
                    <input type='text' name='artwork_title' id='title' placeholder='Title...' onChange={handleSetInput} />
                    <div>
                        <input type="submit" value="Upload" />
                    </div>
                </form>
            </div>
        </main>
    </>
  )
}
