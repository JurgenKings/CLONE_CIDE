import React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Breadcrumb from "@/components/Breadcrumb"
import SaleTable from "@/components/SaleTable"
import { getSales, getSalesByEncargado } from "@/services/sales/sale"

const getFilteredSales = async (accessToken: string, encargado: string, page: number) => {
  if (!encargado) {
    return await getSales(accessToken, "page", Number(page))
  }
  return await getSalesByEncargado(accessToken, encargado)
}

async function SalesPage({ searchParams }) {
  const cookiesStore = cookies()
  const accessToken = cookiesStore.get('accessToken')?.value
  if (!accessToken) {
    redirect("/login")
  }

  const encargado = searchParams.encargado
  const page = parseInt(searchParams.page) || 1

  const salesData = await getFilteredSales(accessToken, encargado, page)
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
                    <SaleTable sales={sales} />
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