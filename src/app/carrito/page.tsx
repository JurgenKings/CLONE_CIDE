import React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Breadcrumb from "@/components/Breadcrumb"
import ShoppingCart from "@/components/ShoppingCart"

function ShoppingCartPage(): React.JSX.Element {
  const cookiesStore = cookies()
  const accessToken = cookiesStore.get('accessToken')?.value
  if (!accessToken) {
    redirect("/login")
  }

  return (
    <>
      <Breadcrumb title="Carrito" />

      <div className="container-fluid py-5">
        <ShoppingCart />
      </div>
    </>
  )
}

export default ShoppingCartPage