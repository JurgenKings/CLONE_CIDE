import Link from "next/link"
import React from "react"
import SearchBar from "../SearchBar"

function SaleTable({ sales }): React.JSX.Element {
  return (
    <>
      <SearchBar searchBy="encargado" />

      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Encargado</th>
            <th scope="col">Cliente</th>
            <th scope="col">Fecha</th>
            <th scope="col">Envío</th>
            <th scope="col">Estado</th>
            <th scope="col">Total</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>

          {
            sales.map((item) => (
              <tr key={item.documentId}>
                <th scope="row">
                  <p className="mb-0 mt-4">
                    {item.id}
                  </p>
                </th>
                <td>
                  <p className="mb-0 mt-4">
                    {item.encargado}
                  </p>
                </td>
                <td>
                  <p className="mb-0 mt-4">
                    {item.clienteNombre}
                  </p>
                </td>
                <td>
                  <p className="mb-0 mt-4">
                    {item.fechaVenta}
                  </p>
                </td>
                <td>
                  <p className="mb-0 mt-4">
                    {item.envioCiudad}
                  </p>
                </td>
                <td>
                  <p className="mb-0 mt-4">
                    {item.estado}
                  </p>
                </td>
                <td>
                  <p className="mb-0 mt-4">
                    ${item.total.toFixed(2)}
                  </p>
                </td>
                <td>
                  <Link
                    href={`detalle-de-venta/${item.documentId}`}
                    className="btn btn-md rounded-circle bg-light border mt-4"

                  >
                    {/* <i className="fa fa-times text-danger"></i> */}
                    <i className="fas fa-solid fa-eye"></i>
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default SaleTable