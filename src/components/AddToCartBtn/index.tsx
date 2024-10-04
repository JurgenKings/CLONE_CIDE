"use client"
import React, { useState } from "react"
import useCartStore from "@/hooks/useCartStore"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function AddToCartBtn({ product }): React.JSX.Element {

  const addItem = useCartStore((state) => state.addItem)
  const [quantityToAddCart, setQuantityToAddCart] = useState<number>(1)

  const notify = (type: string, name: string, message: string) => {
    if (type === "success") toast.success(`${name} agregado al carrito exitosamente`)
    else if (type === "error") toast.error("Ocurrió un error al eliminar el producto del carrito")
    else if (type === "quantity") toast.error(message)
  }

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity: quantityToAddCart }
    addItem(productWithQuantity)
    notify("success", product.nombre, "")
  }

  const handleChangeQuantity = (method: string) => {
    if (method === "less") {
      if (quantityToAddCart === 1) {
        return
      } else {
        setQuantityToAddCart(quantityToAddCart - 1)
      }
    } else {
      if (quantityToAddCart === product.stock) {
        notify("quantity", "", "No se puede subir la cantidad porque sobrepasa el disponible actualmente")
        return
      } else {
        setQuantityToAddCart(quantityToAddCart + 1)
      }
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className="input-group quantity mb-5" style={{ width: "100px" }}>
        <div className="input-group-btn">
          <button className="btn btn-sm btn-minus rounded-circle bg-light border"
            onClick={() => {
              handleChangeQuantity("less")
            }}
          >
            <i className="fa fa-minus"></i>
          </button>
        </div>
        <input type="text" className="form-control form-control-sm text-center border-0" value={quantityToAddCart} />
        <div className="input-group-btn">
          <button
            className="btn btn-sm btn-plus rounded-circle bg-light border"
            onClick={() => {
              handleChangeQuantity("plus")
            }}
          >
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </div>
      <button
        disabled={product.stock === 0}
        className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
        onClick={handleAddToCart}
      >
        <i className="fa fa-shopping-cart me-2 text-primary"></i>
        Agregar al carrito
      </button>
    </>
  )
}

export default AddToCartBtn