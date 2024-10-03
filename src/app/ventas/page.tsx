import React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Breadcrumb from "@/components/Breadcrumb"
import SaleTable from "@/components/SaleTable"
import { getSales } from "@/services/sales/sale"

async function SalesPage() {
  const cookiesStore = cookies()
  const accessToken = cookiesStore.get('accessToken')?.value
  if (!accessToken) {
    redirect("/login")
  }

  const salesData = await getSales(accessToken)
  const sales = salesData.data

  return (
    <>
      <Breadcrumb title="Ventas" />

      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="container py-5">
                {
                  // cartItems.length === 0 ? (
                  //   <p>El carrito está vacío</p>
                  // ) : (
                  <div className="table-responsive">
                    <SaleTable sales={sales}/>
                  </div>
    
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SalesPage