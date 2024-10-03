import React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Breadcrumb from "@/components/Breadcrumb"
import ProcessPurchase from "@/components/ProcessPurchase"

function ProcessPurchasePage(): React.JSX.Element {
  const cookiesStore = cookies()
  const accessToken = cookiesStore.get('accessToken')?.value
  if (!accessToken) {
    redirect("/login")
  }

  return (
    <>
      <Breadcrumb title="Procesar Compra" />

      <div className="container-fluid py-5">
        <ProcessPurchase />
      </div>
    </>
  )
}

export default ProcessPurchasePage