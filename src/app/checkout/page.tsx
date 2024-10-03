import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Breadcrumb from '@/components/Breadcrumb'
import CheckoutForm from '@/components/CheckoutForm'

function ChekoutPage() {

  const cookiesStore = cookies()
  const accessToken = cookiesStore.get('accessToken')?.value
  if (!accessToken) {
    redirect("/login")
  }

  return (
    <>
      <Breadcrumb title="Checkout" />

      <div className="container-fluid py-5">
        <div className="container py-5">
          <h1 className="mb-4">
            Detalles de Facturación
          </h1>
          <CheckoutForm />

        </div>
      </div>
    </>
  )
}

export default ChekoutPage