
import React from "react"
import Breadcrumb from "@/components/Breadcrumb"
import { getCompany } from "@/services/companies/company"
import ContactForm from "@/components/ContactForm"

async function ContactPage() {

  const company = await getCompany()

  return (
    <>
      <Breadcrumb title="Contacto" />

      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div className="text-center mx-auto" style={{ maxWidth: "700px" }}>
                  <h1 className="text-primary">
                    Ponte en contacto
                  </h1>
                </div>
              </div>

              <ContactForm />

              <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white">
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
                <div className="d-flex p-4 rounded mb-4 bg-white">
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
                <div className="d-flex p-4 rounded bg-white">
                  <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>
                      Teléfono
                    </h4>
                    <p className="mb-2">
                      {
                        company.phone
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ContactPage