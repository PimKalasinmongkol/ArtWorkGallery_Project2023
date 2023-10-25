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

export default function ArtWork({ artwork, allUser }) {
  return (
    <>
      <div className="artWork-container">
        {artwork.map((item) =>
          allUser.map((user) => (
            Object.keys(images).map((image) => {
              if (user.user_username === item.gallery_author) {
                if (!image.startsWith("src")) {
                  if (image === item.gallery_work) {
                    return (
                      <div className="artWork-box" key={item.gallery_id}>
                        <div className="artwork-header">
                          {/* User Profile */}
                          <div>
                            <Image
                              src={images[allUser.user_username]}
                              width={60}
                              height={60}
                              alt="test"
                            />
                            <p>{item.gallery_author}</p>
                          </div>
                        </div>
                        <div className="artwork-image">
                          {/* ArtWork Image */}
                          <Image
                            src={images[image]}
                            width={450}
                            height={450}
                            alt="test"
                          />
                          <div className="artwork-like-comment">
                            <div>
                              <FontAwesomeIcon icon={faHeart} size="2x" />
                              <p>29300</p>
                            </div>
                            <div>
                              <FontAwesomeIcon icon={faComment} size="2x" />
                              <p>1880</p>
                            </div>
                            {/* show count like and comment */}
                          </div>
                        </div>
                      </div>
                    );
                  }
                }
              }
            })
          ))
        )}
      </div>
    </>
  );
}
