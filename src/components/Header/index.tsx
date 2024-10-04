"use client"
import useCartStore from "@/hooks/useCartStore"
import useUserStore from "@/hooks/useUserStore"
import Link from "next/link"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import ModalSearchBar from "@/components/ModalSearchBar"
import { getCompany } from "@/services/companies/company"
import Drawer from "@/components/Drawer"

function Header(): React.JSX.Element {

  const itemCount = useCartStore((state) => state.cartItems.length)
  const userData = useUserStore((state) => state.userData)
  const [company, setCompany] = useState(null)

  const pathname = usePathname()
  const shouldShowHeader = (pathname === "/login" || pathname === "/registro")

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

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
          <div className="container-fluid fixed-top">
            <div className="container topbar bg-primary d-none d-lg-block">
              <div className="d-flex justify-content-between">
                <div className="top-info ps-2">
                  <small className="me-3">
                    <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
                    <Link href="/contacto" className="text-white">
                      {company?.direccionTitulo}, {company?.direccion}
                    </Link>
                  </small>
                  <small className="me-3">
                    <i className="fas fa-envelope me-2 text-secondary"></i>
                    <Link href="/contacto" className="text-white">
                      {company?.correo}
                    </Link>
                  </small>
                  <small className="me-3">
                    <i className="fas fa-clock me-2 text-secondary"></i>
                    <Link href="/contacto" className="text-white">
                      {company?.horario}
                    </Link>
                  </small>
                </div>
              </div>
            </div>
            <div className="container px-0">
              <nav className="navbar navbar-light bg-white navbar-expand-xl">
                <Link href="/" className="navbar-brand">
                  <h1 className="text-primary display-6">
                    Cidepym
                  </h1>
                </Link>
                <button
                  className="navbar-toggler py-2 px-3"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarCollapse"
                  onClick={toggleDrawer}
                >
                  <span className="fa fa-bars text-primary"></span>
                </button>
                <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                  <div className="navbar-nav mx-auto">
                    <Link href="/" className="nav-item nav-link active">
                      Home
                    </Link>
                    <Link href="/tienda" className="nav-item nav-link">
                      Tienda
                    </Link>
                    <Link href="/nosotros" className="nav-item nav-link">
                      Nosotros
                    </Link>
                    <Link href="/contacto" className="nav-item nav-link">
                      Contacto
                    </Link>
                    <Link href="/preguntas-frecuentes" className="nav-item nav-link">
                      Preguntas frecuentes
                    </Link>
                    {
                      userData.esResponsableVentas && (
                        <Link href="/ventas" className="nav-item nav-link">
                          Ventas
                        </Link>
                      )
                    }
                    {
                      !userData.email && (
                        <Link href="/login" className="nav-item nav-link">
                          Iniciar sesión
                        </Link>
                      )
                    }
                  </div>
                  <div className="d-flex m-3 me-0">
                    <ModalSearchBar />

                    <Link href="/carrito" className="position-relative me-4 my-auto">
                      <i className="fas fa-shopping-cart fa-2x"></i>
                      <span
                        className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                        style={{ top: "-5px", left: "25px", height: "20px", minWidth: "20px" }}>
                        {itemCount}
                      </span>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        </>
      )}

    </>
  )
}

export default Header