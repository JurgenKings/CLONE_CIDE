"use client"
import Link from 'next/link'
import { useState } from 'react'

function PriceRangeSelector() {
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(500)

  const handleMinChange = (e) => {
    const value = Math.min(e.target.value, maxPrice)
    setMinPrice(value)
  }

  const handleMaxChange = (e) => {
    const value = Math.max(e.target.value, minPrice)
    setMaxPrice(value)
  }

  return (
    <div className="col-lg-12">
      <div className="mb-3">
        <h4 className="mb-2">Precio</h4>
        <div>
          <label htmlFor="minRange">Mínimo: ${minPrice}</label>
          <input
            type="range"
            className="form-range w-100"
            id="minRange"
            name="minRange"
            min="0"
            max={maxPrice}
            value={minPrice}
            onChange={handleMinChange}
          />
        </div>
        <div>
          <label htmlFor="maxRange">Máximo: ${maxPrice}</label>
          <input
            type="range"
            className="form-range w-100"
            id="maxRange"
            name="maxRange"
            min={minPrice}
            max="500"
            value={maxPrice}
            onChange={handleMaxChange}
          />
        </div>
        <Link
          href={`/tienda?minPrice=${minPrice}&maxPrice=${maxPrice}`}
          className='btn btn-primary mt-3'
        >
          Filtrar
        </Link>
        {/* <button className="btn btn-primary mt-3">
        </button> */}
      </div>
    </div>
  )
}

export default PriceRangeSelector 