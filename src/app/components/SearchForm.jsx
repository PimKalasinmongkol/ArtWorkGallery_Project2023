'use client'

import React, {useState ,useEffect} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function SearchForm({
    searchGallery,
    setSearchGallery
}) {

  return (
    <>
        <form className="form_search_" style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            paddingInline: '5rem',
            paddingBlock: '1rem',
            marginTop: '1rem',
        }}>
          <input
            type="search"
            name="search"
            placeholder="search title..."
            style={{
                fontSize: '1.2rem',
                padding: '0.7rem 1.5rem',
                outline: '1px solid #ccc',
                border: 'none',
                boxShadow: '2px 2px 2px rgba(0,0,0,0.1)',
                borderRadius: '50px',
                width: '40%'
            }}
            onChange={(event) => setSearchGallery(event.target.value)}
          />
        </form>
    </>
  )
}
