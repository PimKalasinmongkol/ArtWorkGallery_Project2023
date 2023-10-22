import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import '../css/showArtWork.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'

export default function ArtWork() {
    let render = [1,2,3,4,5,6,7,8,9,10]
  return (
    <>
        <div className='artWork-container'>
            {
                render.map(id => (
                    <div className='artWork-box' key={id}>
                        <div className='artwork-header'>
                            {/* User Profile */}
                            <div>
                                <Image src={"https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=1600"} width={60} height={60} alt="test" />
                                <p>Username</p>
                            </div>
                        </div>
                        <div className='artwork-image'>
                            {/* ArtWork Image */}
                            <Image src={"https://images.pexels.com/photos/3700245/pexels-photo-3700245.jpeg?auto=compress&cs=tinysrgb&w=1600"} width={450} height={450} alt='test' />
                            <div className='artwork-like-comment'>
                                <div>
                                    <FontAwesomeIcon icon={faHeart} size='2x' />
                                    <p>29300</p>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faComment} size='2x' />
                                    <p>1880</p>
                                </div>
                                {/* show count like and comment */}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </>
  )
}
