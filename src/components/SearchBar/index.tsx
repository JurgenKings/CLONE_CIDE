"use client"
import Link from "next/link"
import React, { useState } from "react"

function SearchBar({searchBy}): React.JSX.Element {
  const [searchText, setSearchText] = useState<string>("")
  return (
    <>
      <div className="col-xl-3">
        <div className="input-group w-100 mx-auto d-flex">
          <input
            type="search"
            value={searchText}
            className="form-control p-3"
            placeholder={`Buscar por ${searchBy}`}
            aria-describedby="search-icon-1"
            onChange={e => setSearchText(e.target.value)}
          />
          <Link href={`${searchBy === "nombre" ? `/tienda?text=${searchText}` : `/ventas?text=${searchText}`}`}>
            <span id="search-icon-1" className="input-group-text p-3">
              <i className="fa fa-search"></i>
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default SearchBar