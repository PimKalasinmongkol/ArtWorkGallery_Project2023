"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

import "../css/about.css";

export default function page() {
  return (
    <>
      <Navbar is_enableSearchBar={false} />
      <main>
        <div class="head">
          <h1>ABOUT</h1>
        </div>
        <div class="box_profile">
          <div class="Photo">
            <img
              class="profile"
              src="https://cdn.pic.in.th/file/picinth/pim.jpeg"
              alt="pim.jpeg"
              border="0"
              width="100%"
            />
            <p>Pim Kalasinmongol</p>
            <p>position</p>
          </div>

          <div class="Photo">
            <img
              class="profile"
              src="https://cdn.pic.in.th/file/picinth/pim.jpeg"
              alt="pim.jpeg"
              border="0"
              width="100%"
            />
            <p>Pim Kalasinmongol</p>
            <p>position</p>
          </div>

          <div class="Photo">
            <img
              class="profile"
              src="https://cdn.pic.in.th/file/picinth/pim.jpeg"
              alt="pim.jpeg"
              border="0"
              width="100%"
            />
            <p>Pim Kalasinmongol</p>
            <p>position</p>
          </div>
        </div>
        <footer class="footer-section">
          <div class="text_footer">
            <p>Location : Kasetsart Univercity ,Sriracha</p>
            <p>Contact : 022-222-2222</p>
            <p>Email : ku.src@ku.th</p>
          </div>
          <div class="QR">
            <img
              src="https://cdn.pic.in.th/file/picinth/KU-SRC.png"
              alt="KU-SRC.png"
              border="0"
              width="100px"
            />
          </div>
        </footer>
      </main>
    </>
  );
}
