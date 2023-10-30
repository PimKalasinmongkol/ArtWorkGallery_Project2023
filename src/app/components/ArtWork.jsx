"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import "../css/showArtWork.css";

import images from "../createImageImport";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const MySwal = withReactContent(Swal);

export default function ArtWork({user}) {
  const [artwork, setArtwork] = useState([])
  const [allLike ,setAllLike] = useState([])
  const [allUser ,setAllUser] = useState([])
  const [allComment,setAllComment] = useState([])
  const [isLike ,setIsLike] = useState(false)
  const [commentContent ,setCommentContent] = useState("")

  const getAllUser = async() => {
    try {
      const response = await fetch('http://localhost:4000/user/getUserIdAndUserArtistname');
      const data = await response.json()
      setAllUser(data)
    } catch (error) {
      console.error("Request failed : " + JSON.stringify(error));
    }
  }

  const getArtwork = async () => {
    try {
      const response = await fetch("http://localhost:4000/gallery/getAllUserAndGallery");
      const data = await response.json()
      setArtwork(data)
    } catch (error) {
      console.error("Failed to fetch artwork")
    }
  };

  const getAllLike = async () => {
    try {
      const response = await fetch("http://localhost:4000/gallery/getAllLike");
      const data = await response.json()
      if (data.length > 0) {
        setAllLike(data)
      } else {
        setAllLike([])
      }
    } catch (error) {
      console.error("Failed to fetch artwork")
    }
  };

  const getAllComment = async () => {
    try {
      const response = await fetch("http://localhost:4000/gallery/getAllComment");
      const data = await response.json()
      if (data.length > 0) {
        setAllComment(data)
      } else {
        setAllComment([])
      }
    } catch (error) {
      console.error("Failed to fetch artwork")
    }
  };

  const handleLike = async (user_id ,gallery_id) => {
    const isUserLikeThisGallery = allLike.find((item) => item.gallery_id === gallery_id && item.user_id === user_id)

    if (isUserLikeThisGallery === undefined) {
      try {
        const response = await fetch("http://localhost:4000/gallery/add_like",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gallery_id: gallery_id,
            user_id: user_id
          })
        });
        const data = await response.json()
      } catch (error) {
        console.error("Failed to like artwork")
      }
    } else {
      try {
        const response = await fetch("http://localhost:4000/gallery/undo_like",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gallery_id: gallery_id,
            user_id: user_id
          })
        })
        const data = await response.json()
      } catch (error) {
        console.error("Failed to like artwork")
      }
    }
  };

  const handleCommentSend = async (user_id,gallery_id) => {
    if (commentContent.length == 0) {
      MySwal.fire({
        icon: "error",
        title: "Please enter comment",
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      try {
        const response = await fetch("http://localhost:4000/gallery/add_comment",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gallery_id: gallery_id,
            user_id: user_id,
            comment_content: commentContent
          })
        })
        const data = await response.json()
        setCommentContent("")
      } catch (error) {
        console.error("Failed to like artwork")
        MySwal.fire({
          icon: "error",
          title: "Failed to send comment",
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

  useEffect(() => {
    getArtwork(); getAllLike(); getAllComment(); getAllUser();
  }, [isLike,commentContent])

  return (
    <>
      <div className="artWork-container">
        {artwork.map((item) => {
          let countLike = 0
          let countComment = 0
          const user_ = artwork.find(
            (user) => user.user_username === item.gallery_author
          );
          allLike.map((like) => {
            if (like.gallery_id === item.gallery_id) {
              countLike++
            }
          })
          allComment.map((comment) => {
            if (comment.gallery_id === item.gallery_id) {
              countComment++
            }
          })
          const userImage = images[user_.user_imageprofile];
          const artworkImage = images[item.gallery_work];
          return (
            <div className="artWork-box" key={item.gallery_id}>
              <div className="artwork-header">
                <div>
                  <Image
                    src={userImage}
                    width={60}
                    height={60}
                    alt="User Profile"
                  />
                  <p>{item.gallery_author}</p>
                </div>
              </div>
              <div className="artwork-image">
                <Image
                  src={artworkImage}
                  width={450}
                  height={450}
                  alt="Artwork"
                />
                <div className="artwork-info">
                  <p className="artwork-info-title">{item.gallery_title.toUpperCase()}</p>
                  <small className="artwork-info-date">{item.gallery_date.slice(0 ,-5).replace('T' ," ")}</small>
                </div>
                <div className="artwork-like-comment" href={`/infoWork/${item.gallery_id}`}>
                  <div>
                    <FontAwesomeIcon className="likeIcon" icon={faHeart} size="2x" onClick={() => {
                      handleLike(user.user_id ,item.gallery_id)
                      setIsLike(!isLike)
                    }} />
                    <p>{countLike}</p>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faComment} size="2x" />
                    <p>{countComment}</p>
                  </div>
                </div>
                <div className="artwork-comment-container">
                  <ul>
                    {
                      allComment.map((comment) => {
                        if (comment.gallery_id === item.gallery_id) {
                          const user_artistname = allUser.map((user) => {
                            if (comment.user_id === user.user_id) {
                              return user.user_artistname
                            }
                          })
                          return (
                            <li key={comment.comment_id}>
                              <h4>{user_artistname}</h4>
                              <p>{comment.comment_content}</p>
                              <small>{comment.comment_date}</small>
                            </li>
                          )
                        }
                      })
                    }
                  </ul>
                  <form onSubmit={(event) => {
                    handleCommentSend(user.user_id ,item.gallery_id)
                    event.preventDefault()
                    }}>
                    <input type="text" name="comment_content" id="comment_content" onChange={(event) => setCommentContent(event.target.value)} placeholder="Write your comment..." />
                    <button type="submit">
                      <FontAwesomeIcon icon={faArrowRight} size="lg" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
