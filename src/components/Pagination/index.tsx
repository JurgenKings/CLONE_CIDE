import Link from "next/link"
import React from "react"

function Pagination({ paginationData, currentPage }) {
  const totalPages = paginationData.pageCount

  console.log("ACASCACC", currentPage)
  

  return (
    <>
      {[...Array(totalPages)].map((_, index) => {
        const pageIndex = index + 1
        return (
          <Link
            key={pageIndex}
            href={`?page=${pageIndex}`}
            className={`rounded ${currentPage === pageIndex ? "active" : ""}`}
          >
            {pageIndex}
          </Link>
        )
      })}
    </>
  )
}

export default Pagination