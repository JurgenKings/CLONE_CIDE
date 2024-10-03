import Link from "next/link"
import React from "react"

function Breadcrumb({ title }): React.JSX.Element {
  return (
    <>
      <div className="container-fluid page-header py-5" style={{
        backgroundImage: "url(/images/cart-page-header-img.jpg)",
        position: "relative",
      }}>
        <div style={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        }}></div>
        <h1 className="text-center text-white display-6" style={{ position: "relative" }}>
          {title}
        </h1>
        <ol className="breadcrumb justify-content-center mb-0" style={{ position: "relative" }}>
          <li className="breadcrumb-item">
            <Link href="/">
              Home
            </Link>
          </li>
          {
            (title === "Detalle del producto" || title === "Carrito" || title === "Checkout" || title === "Procesar Compra") && (
              <li className="breadcrumb-item">
                <Link href="/tienda">
                  Tienda
                </Link>
              </li>
            )
          }
          {
            (title === "Checkout" || title === "Procesar Compra") && (
              <li className="breadcrumb-item">
                <Link href="/carrito">
                  Carrito
                </Link>
              </li>
            )
          }
          {
            (title === "Procesar Compra") && (
              <li className="breadcrumb-item">
                <Link href="/checkout">
                  Checkout
                </Link>
              </li>
            )
          }
          {
            (title === "Detalle de venta") && (
              <li className="breadcrumb-item">
                <Link href="/ventas">
                  Ventas
                </Link>
              </li>
            )
          }
          <li className="breadcrumb-item active text-white">
            {title}
          </li>
        </ol>
      </div>
    </>
  )
}

export default Breadcrumb