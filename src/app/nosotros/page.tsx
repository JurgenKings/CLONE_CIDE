import React from "react"
import Breadcrumb from "@/components/Breadcrumb"
import Features from "@/components/Features"
import Link from "next/link"
import { getCompany } from "@/services/companies/company"
import { domain } from "@/services/enviroments"
import Image from "next/image"

async function AboutPage() {

  const company = await getCompany()

  return (
    <>
      <Breadcrumb title="Nosotros" />

      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">

                <div className="row g-10 align-items-center" style={{
                  justifyContent: "center",
                  backgroundColor: "#e0ebe6",
                  padding: "3rem 2rem"
                }}>
                  <div className="col-md-12 col-lg-5">
                    <h2 className="text-primary">
                      Misión
                    </h2>
                    <p className="mb-4">
                      {
                        company.mision
                      }
                    </p>
                  </div>
                  <div className="col-md-12 col-lg-4">
                    <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                      <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active rounded">
                          <Image
                            src={`${domain}${company?.imagenMision?.url}`}
                            layout="responsive"
                            width={800} 
                            height={600} 
                            className="img-fluid w-100 h-100 bg-secondary rounded"
                            alt="Image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row g-10 align-items-center" style={{
                  justifyContent: "center",
                  backgroundColor: "#e0f5eb",
                  padding: "3rem 2rem"
                }}>
                  <div className="col-md-12 col-lg-4">
                    <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                      <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active rounded">
                          <Image
                            src={`${domain}${company?.imagenVision?.url}`}
                            layout="responsive"
                            width={800} 
                            height={600} 
                            className="img-fluid w-100 h-100 bg-secondary rounded"
                            alt="Image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-5">
                    <h2 className="text-primary">
                      Visión
                    </h2>
                    <p className="mb-4">
                      {
                        company.vision
                      }
                    </p>
                  </div>
                </div>

                <div className="row g-10 align-items-center" style={{
                  justifyContent: "center",
                  backgroundColor: "#e0ebe6",
                  padding: "3rem 2rem"
                }}>
                  <div className="col-md-12 col-lg-5">
                    <h2 className="text-primary">
                      Valores
                    </h2>
                    <p className="mb-4">
                      {
                        company.valores
                      }
                    </p>
                  </div>
                  <div className="col-md-12 col-lg-4">
                    <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                      <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active rounded">
                          <Image
                            src={`${domain}${company?.imagenValores?.url}`}
                            layout="responsive"
                            width={800} 
                            height={600} 
                            className="img-fluid w-100 h-100 bg-secondary rounded"
                            alt="Image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row g-10 align-items-center" style={{
                  justifyContent: "center",
                  backgroundColor: "#e0f5eb",
                  padding: "3rem 2rem"
                }}>
                  <div className="col-md-12 col-lg-4">
                    <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                      <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active rounded">
                          <Image
                            src={`${domain}${company?.imagenHistoria?.url}`}
                            layout="responsive"
                            width={800} 
                            height={600} 
                            className="img-fluid w-100 h-100 bg-secondary rounded"
                            alt="Image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-5">
                    <h2 className="text-primary">
                      Historia
                    </h2>
                    <p className="mb-4">
                      {
                        company.historia
                      }
                    </p>
                  </div>
                </div>

              </div>

              <Features about={true} />

              <h2 className="mb-4">
                Contáctanos
              </h2>
              <div className="row g-10 align-items-center" style={{
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                padding: "0",
                flexWrap: "wrap"
              }}>
                <div className="d-flex p-2 rounded bg-white col-md-12" style={{
                  width: "314px"
                }}>
                  <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>
                      {
                        company.direccionTitulo
                      }
                    </h4>
                    <p className="mb-2">
                      {
                        company.direccion
                      }
                    </p>
                  </div>
                </div>
                <div className="d-flex p-2 rounded bg-white col-md-12" style={{
                  width: "314px"
                }}>
                  <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                  <div>
                    <h4>
                      Correo
                    </h4>
                    <p className="mb-2">
                      {
                        company.correo
                      }
                    </p>
                  </div>
                </div>
                <div className="d-flex p-2 rounded bg-white col-md-12" style={{
                  width: "314px"
                }}>
                  <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Teléfono</h4>
                    <p className="mb-2">
                      {
                        company.phone
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-5">
                <Link
                  href={`/contacto`}
                  className='btn btn-primary mt-3'
                >
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage