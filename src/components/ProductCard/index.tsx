"use client"
import useCartStore from "@/hooks/useCartStore"
import { domain } from "@/services/enviroments"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function ProductCard({ product, isTienda }): React.JSX.Element {

  const addItem = useCartStore((state) => state.addItem)

  const notify = (type: string, name: string) => {
    if (type === "success") toast.success(`${name} agregado al carrito exitosamente`)
    else if (type === "error") toast.error("Ocurrió un error al eliminar el producto del carrito")
  }

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity: 1 }
    addItem(productWithQuantity)
    notify("success", product.nombre)
  }

  return (
    <>
      <div className={`col-md-6 col-lg-6 col-xl-${isTienda ? "4" : "3"}`}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
        />
        <div
          className="rounded position-relative fruite-item"
          style={{
            height: "400px",
            maxHeight: "400px",
            // backgroundColor: "beige",
            border: "1px solid green",
            display: "flex",
            flexDirection: "column",
            position: "relative"
          }}
        >
          <div className="fruite-img" style={{ height: '180px', position: 'relative' }}>
            <Image
              src={`${domain}${product.imagenes[0].url}`}
              alt=""
              layout="fill"
              objectFit="cover"
              className="img-fluid w-100 rounded-top"
            />
          </div>
          <div
            className="text-white bg-secondary px-3 py-1 rounded position-absolute"
            style={{ top: "10px", left: "10px" }}>
            {product.categoria.nombre}
          </div>
          <div className="p-4 border-top-0 rounded-bottom" style={{ flex: "1" }}>
            <Link href={`/detalle-del-producto/${product.documentId}`}>
              <h5 style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                {product.nombre}
                <span style={{
                  fontSize: "0.8rem"
                }}>
                  {
                    product.stock === 0
                      ? "Agotado"
                      : `(${product.stock} Und)`
                  }
                </span>
              </h5>
              <p style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                {product.descripcion}
              </p>
            </Link>
            <div
              className="d-flex justify-content-between flex-lg-wrap"
              style={{ gap: "0.5rem", marginTop: "auto" }}
            >
              <p className="text-dark fw-bold mb-0">
                ${(((product.precioAlMayor * (product.tasaComisionPorcentual * 0.01))) + product.precioAlMayor).toFixed(2)}
              </p>

              <button
                className="btn border border-secondary rounded-pill px-3 text-primary"
                disabled={product.stock === 0}
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "200px",
                  marginTop: "1rem"
                }}
                onClick={handleAddToCart}
              >
                <i className="fa fa-shopping-cart me-2 text-primary"></i>
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default ProductCard