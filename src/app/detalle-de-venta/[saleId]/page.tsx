import React from "react"
import Breadcrumb from "@/components/Breadcrumb"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getSaleById } from "@/services/sales/sale"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ImageSale from "@/components/ImageSale"

async function SaleDetail({ params }) {

  const cookiesStore = cookies()
  const accessToken = cookiesStore.get('accessToken')?.value
  if (!accessToken) {
    redirect("/login")
  }

  const { saleId } = params

  const sale = await getSaleById(accessToken, saleId)

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <Breadcrumb title="Detalle de venta" />

      <div className="container-fluid contact py-5">
        <div className="container">
          <div className="p-5 bg-light rounded">
            <div className="row g-4 mb-5">
              <div className="col-lg-12 col-xl-12" style={{
                // backgroundColor: "purple"
              }}>
                <div className="row g-4">

                  <ImageSale sale={sale} />

                  <div className="col-lg-4">
                    <h4 className="fw-bold mb-3">
                      # {sale.id}
                    </h4>
                    <p>
                      Tipo de envío: <span className="fw-bold"> {sale?.envioTipo}</span>
                    </p>
                    <p>
                      Método de Pago: <span className="fw-bold">{sale?.metodoPago}</span>
                    </p>

                    <p>
                      Codigo postal: <span className="fw-bold"> {sale?.codigoPostal}</span>
                    </p>

                    <p>
                      País del envío: <span className="fw-bold"> {sale?.envioPais}</span>
                    </p>
                    <p>
                      Fecha de la venta: <span className="fw-bold"> {sale?.fechaVenta}</span>
                    </p>
                    <p>
                      Hora de la venta: <span className="fw-bold"> {sale?.horaVenta}</span>
                    </p>
                    <p>
                      Estado:<span className="fw-bold"> {sale?.estado}</span>
                    </p>
                    <p>
                      Ciudad del envío: <span className="fw-bold">{sale?.envioCiudad}</span>
                    </p>

                    {
                      sale?.notasPedido && (
                        <p>
                          Notas de la pedido: <span className="fw-bold">{sale?.notasPedido}</span>
                        </p>
                      )
                    }
                    <h6 className="fw-bold mb-3">
                      Total: ${sale?.total}
                    </h6>
                  </div>
                  <div className="col-lg-4">
                    <h5 className="fw-bold mb-3">
                      Datos del cliente:
                    </h5>
                    <p>
                      Nombre: <span className="fw-bold">{sale?.clienteNombre} {sale?.clienteApellido}</span>
                    </p>
                    <p>
                      Dirección:: <span className="fw-bold">{sale?.clienteDireccion}</span>
                    </p>
                    <p>
                      Teléfono: <span className="fw-bold">{sale?.clienteNumeroTelefono}</span>
                    </p>
                    <p>
                      Correo: <span className="fw-bold">{sale?.clienteCorreo}</span>
                    </p>
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="order-details" style={{ marginTop: "2rem" }}>
              <h4>Productos comprados</h4>
              <ul className="list-group">
                {
                  sale?.productos?.map((item) => (
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SaleDetail