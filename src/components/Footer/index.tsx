"use client"
import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { getCompany } from "@/services/companies/company"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from "next/image"

function Footer(): React.JSX.Element {

  const pathname = usePathname()
  const shouldShowHeader = (pathname === "/login" || pathname === "/registro")
  const [company, setCompany] = useState(null)

  const notify = () => {
    toast.error("Ocurrió un error inesperado")
  }

  useEffect(() => {
    const getsCompany = async () => {
      try {
        const companyData = await getCompany()
        setCompany(companyData)
      } catch (error) {
        if (error) { }
        notify()
      }
    }
    getsCompany()
  }, [])

  return (
    <>
      {!shouldShowHeader && (
        <>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
          />
          <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
            <div className="container py-5">
              <div className="pb-4 mb-4" style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}>
                <div className="row g-4">
                  <div className="col-lg-3">
                    <a href="#">
                      <h1 className="text-primary mb-0">Cidepym</h1>
                      <p className="text-secondary mb-0">
                        Productos frescos
                      </p>
                    </a>
                  </div>
                  <div className="col-lg-6">

                  </div>
                  <div className="col-lg-3">
                    <div className="d-flex justify-content-end pt-3">
                      <a className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-twitter"></i></a>
                      <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-facebook-f"></i></a>
                      <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-youtube"></i></a>
                      <a className="btn btn-outline-secondary btn-md-square rounded-circle" href=""><i className="fab fa-linkedin-in"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-5">
                <div className="col-lg-3 col-md-6">
                  <div className="footer-item">
                    <h4 className="text-light mb-3">
                      ¡Por qué a la gente le gustamos!
                    </h4>
                    <p className="mb-4">typesetting, remaining essentially unchanged. It was
                      popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.</p>
                    <Link href="/nosotros" className="btn border-secondary py-2 px-4 rounded-pill text-primary">
                      Ver más
                    </Link>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="d-flex flex-column text-start footer-item">
                    <h4 className="text-light mb-3">
                      Información de la tienda
                    </h4>
                    <Link className="btn-link" href="/nosotros">
                      Nosotros
                    </Link>
                    <Link className="btn-link" href="/contacto">
                      Contactanos
                    </Link>
                    <Link className="btn-link" href="/preguntas-frecuentes">
                      Preguntas frecuentes
                    </Link>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="d-flex flex-column text-start footer-item">
                    <h4 className="text-light mb-3">Cuenta</h4>
                    <a className="btn-link" href="">Mi cuenta</a>
                    <a className="btn-link" href="">Carrito</a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="footer-item">
                    <h4 className="text-light mb-3">Contacto</h4>
                    <p>Dirección: {company?.direccionTitulo}, {company?.direccion}</p>
                    <p>Correo: {company?.correo}</p>
                    <p>Teléfono: {company?.phone}</p>
                    <p>Pagos Aceptados</p>
                    <Image
                      src="/images/payment.png"
                      alt="Pagos Aceptados"
                      width={200}
                      height={50}
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Footer