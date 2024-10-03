"use client"
import React, { ChangeEvent, useEffect, useState } from "react"
import useCartStore from "@/hooks/useCartStore"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify'
import { createSale } from "@/services/sales/sale"
import { domain } from "@/services/enviroments"
import useSaleData from "@/hooks/useSaleData"
import Loading from "../Loading"
import 'react-toastify/dist/ReactToastify.css'
import "./ProcessPurchase.css"

function ProcessPurchase(): React.JSX.Element {

  const router = useRouter()
  const itemCount = useCartStore((state) => state.cartItems.length)
  const cartItems = useCartStore((state) => state.cartItems)
  const clearCart = useCartStore((state) => state.clearCart)
  const saleData = useSaleData((state) => state.saleData)

  useEffect(() => {
    if (itemCount === 0) {
      router.push(`/tienda`)
    }
  }, [itemCount, router])

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const notify = (type: string) => {
    if (type === "success") toast.success("Compra recibida, en proceso, se le enviará un correo al validarla")
    else if (type === "serverError") toast.error("Ocurrió un error crear la compra")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    try {
      const {
        selectedPaymentMethod,
        fullName,
        lastName,
        address,
        city,
        zipCode,
        phoneNumber,
        email,
        orderNotes,
        selectedCountry,
        selectedShipping,
        total,
        cartItems
      } = saleData

      const transformedSaleData = {
        metodoPago: selectedPaymentMethod,
        clienteNombre: fullName,
        clienteApellido: lastName,
        clienteDireccion: address,
        envioCiudad: city,
        codigoPostal: parseInt(zipCode),
        clienteNumeroTelefono: phoneNumber,
        clienteCorreo: email,
        notasPedido: orderNotes,
        envioPais: selectedCountry,
        envioTipo: selectedShipping,
        productos: cartItems,
        total,
        fechaVenta: new Date().toISOString().split('T')[0],
        horaVenta: new Date().toISOString().split('T')[1].split('.')[0],
      }

      const body = {
        data: {
          ...transformedSaleData
        }
      }

      const response = await createSale(body)

      const formData = new FormData()

      formData.append('files', file)
      formData.append('ref', 'api::venta.venta')
      formData.append('refId', `${response.data.id}`)
      formData.append('field', 'comprobantePago')

      const imageUploaded = await fetch(`${domain}/api/upload`, {
        method: 'POST',
        body: formData,
      })

      if (response && imageUploaded) {
        notify("success")
        clearCart()
        router.push(`/tienda`)
      } else {
        notify("serverError")
      }
    } catch (error) {
      if (error) { }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className="container-fluid contact">
        <div className="container">
          <div className="p-5 bg-light rounded">


            <div className="pp-container-bank">
              <div className="payment-info text-center pp-bank">
                <h4>Datos Bancarios</h4>
                <p>Banco: Banco Ejemplo</p>
                <p>Número de Cuenta: 1234567890</p>
                <p>Teléfono (Pago Móvil): 0412-3456789</p>
                <p>Cédula: 12345678</p>
              </div>
            </div>

            <div className="order-details" style={{ marginTop: "2rem" }}>
              <h4>Detalle del Pedido</h4>
              <ul className="list-group">
                {
                  cartItems.map((item) => (
                    <li key={item.documentId} className="list-group-item pp-list-container">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span className="pp-list-value">
                        Subtotal: ${
                          (((item.priceAlMayor * (item.tasaComisionPorcentual * 0.01)))
                            + item.priceAlMayor)
                          * item.quantity
                        }
                      </span>
                    </li>
                  ))
                }
                <li className="list-group-item pp-list-container">
                  <span>
                    Tipo de Envío:
                  </span>
                  <span className="pp-list-value">
                    {saleData?.selectedShipping}
                  </span>
                </li>
                <li className="list-group-item pp-list-container">
                  <span>
                    Método de Pago:
                  </span>
                  <span className="pp-list-value">
                    {saleData?.selectedPaymentMethod}
                  </span>
                </li>
                <li className="list-group-item pp-list-container">
                  <span>
                    Nombre del cliente:
                  </span>
                  <span className="pp-list-value">
                    {saleData?.fullName} {saleData?.lastName}
                  </span>
                </li>
                <li className="list-group-item font-weight-bold pp-list-container">
                  <span>
                    Total a Pagar:
                  </span>
                  <span className="pp-list-value">
                    ${saleData?.total}
                  </span>
                </li>
              </ul>
            </div>

            <div className="order-details mt-4">
              <h4>Datos de Envío</h4>
              <p>Dirección: {saleData?.address}</p>
              <p>País: {saleData?.selectedCountry}</p>
              <p>Ciudad: {saleData?.city}</p>
              <p>Código Postal: {saleData?.zipCode}</p>
            </div>

            {
              loading ? (
                <div
                  className="mb-4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Loading />
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit}>
                    <div className="file-input">
                      <label htmlFor="payment-proof">Adjuntar Comprobante de Pago:</label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="payment-proof"
                        required
                        onChange={handleFileChange}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`submit-button ${loading ? 'disabled' : ''}`}
                      disabled={loading}
                    >
                      Pagar
                    </button>
                  </form>
                </>
              )
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default ProcessPurchase