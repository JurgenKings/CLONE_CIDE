"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"

function ModalSearchBar(): React.JSX.Element {
  const [searchText, setSearchText] = useState<string>("")
  const [showModal, setShowModal] = useState<boolean>(false)
  const router = useRouter()

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }
  
  const handleSearchClick = () => {
    setShowModal(false)
    setSearchText("")
    router.push(`/tienda?text=${searchText}`)
  }

  return (
    <>
      <button
        className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
        onClick={openModal}
      >
        <i className="fas fa-search text-primary"></i>
      </button>

      {showModal && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "#dad1c59a",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "20px",
          zIndex: 999,
          overflow: "hidden"
        }}>
          <span style={{
            color: "#000",
            float: "right",
            fontSize: "28px",
            fontWeight: "bold",
            cursor: "pointer"
          }} onClick={closeModal}>&times;</span>
          <div style={{
            backgroundColor: "#ccc3b79a",
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
          }}>
            <div className="input-group w-100 mx-auto d-flex">
              <input
                type="search"
                value={searchText}
                className="form-control p-3"
                placeholder={`Buscar un producto`}
                aria-describedby="search-icon-1"
                onChange={e => setSearchText(e.target.value)}
              />
              <button
                onClick={handleSearchClick}
              >
                <span id="search-icon-1" className="input-group-text p-3">
                  <i className="fa fa-search"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalSearchBar