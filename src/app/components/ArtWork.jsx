"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import "../css/showArtWork.css";

import images from "../createImageImport";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";

export default function ArtWork() {
  const [artwork, setArtwork] = useState([])

  const getArtwork = async () => {
    try {
      const response = await fetch("http://localhost:4000/gallery/getAllUserAndGallery");
      const data = await response.json()
      setArtwork(data)
      console.log(data)
    } catch (error) {
      console.error("Failed to fetch artwork")
    }
  };

  useEffect(() => {
    getArtwork();
  }, [])

  return (
    <>
      <div className="artWork-container">
        {artwork.map((item) => {
          const user = artwork.find(
            (user) => user.user_username === item.gallery_author
          );
          const userImage = images[user.user_imageprofile];
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
                <div className="artwork-like-comment">
                  <div>
                    <FontAwesomeIcon icon={faHeart} size="2x" />
                    <p>29300</p>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faComment} size="2x" />
                    <p>1880</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
