"use client"
import useCartStore from "@/hooks/useCartStore"
import { domain } from "@/services/enviroments"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function ProductCardRounded({ product }): React.JSX.Element {

  const addItem = useCartStore((state) => state.addItem)

  const notify = (type: string, name: string) => {
    if (type === "success") toast.success(`${name} agregado al carrito exitosamente`)
    else if (type === "error") toast.error("Ocurrió un error al eliminar el producto del carrito")
  }

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity: 1 }
    addItem(productWithQuantity)
    notify("success", product.name)
  }

  return (
    <>
      <div key={product.documentId} className="col-lg-6 col-xl-4">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
        />
        <div
          className="p-4 rounded bg-light position-relative"
          style={{
            height: "250px",
            maxHeight: "250px",
          }}
        >
          <div className="row align-items-center">
            <div className="col-6">
              <Image
                src={`${domain}${product.images[0].url}`}
                alt=""
                width={140}
                height={140}
                className="img-fluid w-100 rounded-circle"
                style={{ objectFit: "cover", objectPosition: "50% 50%", height: "140px" }}
              />
            </div>
            <div className="col-6">
              <Link href={`/detalle-del-producto/${product.documentId}`} className="h5">
                {product.name}
              </Link>
              <div className="d-flex my-3">
                {
                  product.stock === 0
                    ? " Agotado"
                    : ` (${product.stock} Und)`
                }
              </div>
              <h4 className="mb-3">
                ${(((product.priceAlMayor * (product.tasaComisionPorcentual * 0.01))) + product.priceAlMayor).toFixed(2)}
              </h4>
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
      </div>
    </>
  )
}

export default ProductCardRounded