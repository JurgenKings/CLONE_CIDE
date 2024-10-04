import React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Breadcrumb from "@/components/Breadcrumb"

async function MyAccountPage() {
  const cookiesStore = cookies()
  const accessToken = cookiesStore.get('accessToken')?.value
  if (!accessToken) {
    redirect("/login")
  }

  // const user = cookiesStore.get('user')?.value
  // const userData = JSON.parse(user)

  return (
    <>
      <Breadcrumb title="Mi Cuenta" />

      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <h2 className="mb-4">
              Historial de pedidos
            </h2>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Total</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>

                  {/* {
                    cartItems.map((item) => (
                      <tr key={item.documentId}>
                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <img
                              src={`${domain}${item.imagenes[0].url}`}
                              className="img-fluid me-5 rounded-circle"
                              style={{ width: "80px", height: "80px" }}
                              alt=""
                            />
                          </div>
                        </th>
                        <td>
                          <p className="mb-0 mt-4">
                            {item.nombre}
                          </p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">
                            ${(((item.precioAlMayor * (item.tasaComisionPorcentual * 0.01))) + item.precioAlMayor).toFixed(2)}
                          </p>
                        </td>
                        <td>
                          <div className="input-group quantity mt-4" style={{ width: "100px" }}>
                            <div className="input-group-btn">
                              <button className="btn btn-sm btn-minus rounded-circle bg-light border"
                                onClick={() => {
                                  // changeQuantity(item.documentId, -1, item.stock, notify)
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
                                  // changeQuantity(item.documentId, 1, item.stock, notify)
                                }}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">
                            ${((((item.precioAlMayor * (item.tasaComisionPorcentual * 0.01))) + item.precioAlMayor) * item.quantity).toFixed(2)}
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
                      </tr>
                    ))
                  } */}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default MyAccountPage