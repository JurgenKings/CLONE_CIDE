"use client"
import { useRouter } from "next/navigation"
import React from "react"

function SortBar(): React.JSX.Element {
  const router = useRouter()

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value) {
      router.push(`/tienda/?sort=${value}`)
    }
  }

  return (
    <>
      <div className="col-xl-3">
        <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
          <label htmlFor="fruits">Ordenar por:</label>
          <select
            id="fruits"
            name="fruitlist"
            className="border-0 form-select-sm bg-light me-3"
            onChange={handleSortChange}
          >
            <option value="">Ninguno</option>
            <option value="priceASC">Precio: ASC</option>
            <option value="priceDESC">Precio: DESC</option>
          </select>
        </div>
      </div>
    </>
  )
}

export default SortBar