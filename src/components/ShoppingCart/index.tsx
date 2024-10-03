"use client"
import useCartStore from "@/hooks/useCartStore"
import { domain } from "@/services/enviroments"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function ShoppingCart(): React.JSX.Element {

  const cartItems = useCartStore((state) => state.cartItems)
  const removeItem = useCartStore((state) => state.removeItem)
  const changeQuantity = useCartStore((state) => state.changeQuantity)
  const itemCount = useCartStore((state) => state.cartItems.length)

  const notify = (type: string, name: string, message: string) => {
    if (type === "success") toast.success(`${name} eliminado del carrito exitosamente`)
    else if (type === "error") toast.error("Ocurrió un error al eliminar el producto del carrito")
    else if (type === "quantity") toast.error(message)
    else if (type === "emptyCart") toast.error("El carrito está vacío. Agrega productos antes de proceder")
  }

  const handleDeleteCart = (documentId: string, name: string) => {
    removeItem(documentId)
    notify("success", name, "")
  }

  const total = cartItems.reduce((sum, product) => sum + ((((product.priceAlMayor * (product.tasaComisionPorcentual * 0.01))) + product.priceAlMayor)) * product.quantity, 0)

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className="container py-5">
        {
          cartItems.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col">Disponibilidad</th>
                    <th scope="col">Acción</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    cartItems.map((item) => (
                      <tr key={item.documentId}>
                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <Image
                              src={`${domain}${item.images[0].url}`}
                              width={80}
                              height={80}
                              className="img-fluid me-5 rounded-circle"
                              style={{height: "80px"}}
                              alt=""
                            />
                          </div>
                        </th>
                        <td>
                          <p className="mb-0 mt-4">
                            {item.name}
                          </p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">
                            ${(((item.priceAlMayor * (item.tasaComisionPorcentual * 0.01))) + item.priceAlMayor).toFixed(2)}
                          </p>
                        </td>
                        <td>
                          <div className="input-group quantity mt-4" style={{ width: "100px" }}>
                            <div className="input-group-btn">
                              <button className="btn btn-sm btn-minus rounded-circle bg-light border"
                                onClick={() => {
                                  changeQuantity(item.documentId, -1, item.stock, notify)
                                }}
                              >
                                <i className="fa fa-minus"></i>
                              </button>
                            </div>
                            <input type="text" className="form-control form-control-sm text-center border-0" value={item.quantity} />
                            <div className="input-group-btn">
                              <button
                                className="btn btn-sm btn-plus rounded-circle bg-light border"
                                onClick={() => {
                                  changeQuantity(item.documentId, 1, item.stock, notify)
                                }}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">
                            ${((((item.priceAlMayor * (item.tasaComisionPorcentual * 0.01))) + item.priceAlMayor) * item.quantity).toFixed(2)}
                          </p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">
                            {
                              item.stock === 0
                                ? "Agotado"
                                : `${item.stock} Und`
                            }
                          </p>
                        </td>
                        <td>
                          <button
                            className="btn btn-md rounded-circle bg-light border mt-4"
                            onClick={() => {
                              handleDeleteCart(item.documentId, item.name)
                            }}
                          >
                            <i className="fa fa-times text-danger"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  }

                </tbody>
              </table>
            </div>
          )
        }

        <div className="row g-4 justify-content-end">
          <div className="col-8"></div>
          <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
            <div className="bg-light rounded">
              <div className="p-4">
                <h1 className="display-6 mb-4">
                  Total
                </h1>
                <div className="d-flex justify-content-between mb-4">
                  <h5 className="mb-0 me-4">
                    Subtotal:
                  </h5>
                  <p className="mb-0">
                    ${total.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                <h5 className="mb-0 ps-4 me-4">
                  Total
                </h5>
                <p className="mb-0 pe-4">
                  ${total.toFixed(2)}
                </p>
              </div>
              <Link
                href={itemCount > 0 ? "/checkout" : "#"}
                className={`btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4 ${itemCount === 0 ? 'disabled' : ''}`}
                type="button"
                onClick={(e) => {
                  if (itemCount === 0) {
                    e.preventDefault()
                    notify("emptyCart", "", "")
                  }
                }}
              >
                Procesar compra
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShoppingCart