"use client"
import Link from "next/link"
import React from "react"

function ButtonCategory({ category }): React.JSX.Element {

  return (
    <>
      <li>
        <div className="d-flex justify-content-between fruite-name">
          <Link href={`/tienda?categoryId=${category.id}`}>
            <i className="fas fa-check me-2"></i>
            {category.nombre}
          </Link>
        </div>
      </li>
    </>
  )
}

export default ButtonCategory