"use client"
import { domain } from "@/services/enviroments"
import { updateStateSaleById } from "@/services/sales/sale"
import React, { useState } from "react"
import Loading from "../Loading"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./ImageSale.css"
import { useRouter } from "next/navigation"
import { updateStockSaleConfirm } from "@/services/products/products"
import { createClient } from "@/services/clients/client"
import Image from "next/image"
import useUserStore from "@/hooks/useUserStore"

function ImageSale({ sale }): React.JSX.Element {

  const router = useRouter()
  const userData = useUserStore((state) => state.userData)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)

  const id = sale.documentId
  const currentStatus = sale.estado
  const proofPayment = sale.comprobantePago
  const productsSale = sale?.productos
  const newEncargado = userData?.nombre
  const clientData = {
    data: {
      nombre: sale.clienteNombre,
      apellido: sale.clienteApellido,
      direccion: sale.clienteDireccion,
      telefono: sale.clienteNumeroTelefono,
      correo: sale.clienteCorreo,
    }
  }

  const openModal = (image) => {
    setModalImage(image)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const notify = (type: string) => {
    if (type === "success") toast.success("Estado de la venta cambiado exitosamente")
    else if (type === "serverError") toast.error("Ocurrió un error al cambiar el estado")
    else toast.error("Error: no se pudo cambiar el estado, intente nuevamente")
  }

  const handleClickNewState = async (newState: string, newEncargado: string) => {
    setLoading(true)
    try {
      const response = await updateStateSaleById(id, newState, proofPayment, newEncargado)

      if (response) {
        if (newState === "Confirmada") {
          const updateStockRes = await updateStockSaleConfirm(productsSale)
          const createClientRes = await createClient(clientData)
          if (updateStockRes && createClientRes) {
            notify("success")
            router.push(`/ventas`)
          } else {
            notify("error")
          }
        } else {
          notify("success")
          router.push(`/ventas`)
        }
      } else {
        notify("error")
      }
    } catch (error) {
      if (error) { }
      notify("serverError")
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
      <div className="col-lg-4">
        <div className="rounded">
          <button
            type="button"
            style={{
              backgroundColor: "transparent",
              border: "none"
            }}
            onClick={() => openModal(`${domain}${sale?.comprobantePago?.url}`)}
          >
            <Image
              src={`${domain}${sale?.comprobantePago?.url}`}
              className="img-fluid rounded"
              alt="Image"
              width={500}
              height={500}
            />
          </button>
          <div style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}>
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
                  {
                    currentStatus === "Pendiente" && (
                      <>
                        <span className="mt-4">
                          <button
                            className="my-auto imagesale-btn imagesale-btn_check"
                            type="button"
                            onClick={() => {
                              handleClickNewState("Confirmada", newEncargado)
                            }}
                          >
                            <i className="fas fa-check-circle fa-2x"></i>
                            <span>Confirmar</span>
                          </button>
                        </span>
                        <span className="mt-4">
                          <button
                            className="my-auto imagesale-btn imagesale-btn_rejected"
                            type="button"
                            onClick={() => {
                              handleClickNewState("Rechazada")
                            }}
                          >
                            <i className="fas fa-ban fa-2x"></i>
                            <span>Rechazar</span>
                          </button>
                        </span>
                        <span className="mt-4">
                          <button
                            className="my-auto imagesale-btn imagesale-btn_cancel"
                            type="button"
                            onClick={() => {
                              handleClickNewState("Cancelada")
                            }}
                          >
                            <i className="fas fa-times-circle fa-2x"></i>
                            <span>Cancelar</span>
                          </button>
                        </span>
                      </>
                    )
                  }
                </>
              )
            }
          </div>
        </div>
      </div>

      {showModal && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "20px",
          zIndex: 999,
          maxWidth: "80%",
          marginTop: "7rem",
          maxHeight: "80%",
          overflow: "auto"
        }}>
          <span style={{
            color: "#000",
            float: "right",
            fontSize: "28px",
            fontWeight: "bold",
            cursor: "pointer"
          }} onClick={closeModal}>&times;</span>
          <div style={{ display: 'block', margin: '0 auto', maxWidth: '100%', maxHeight: '100%', borderRadius: '5px' }}>
            <Image
              src={modalImage}
              alt="Modal Image"
              layout="responsive"
              width={500}
              height={500} 
              style={{ borderRadius: '5px' }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ImageSale