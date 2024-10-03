import Image from "next/image"
import React from "react"

function HeroImage() {
  return (
    <>
      {/* <!-- Hero Start --> */}
      <div className="container-fluid py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-md-12 col-lg-7">
              <h4 className="mb-3 text-secondary">Alimentos 100% Orgánicos</h4>
              <h1 className="mb-5 display-3 text-primary">Alimentos orgánicos de frutas y verduras</h1>
            </div>
            <div className="col-md-12 col-lg-5">
              <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active rounded">
                    <Image
                      src="/images/hero-img-1.png"
                      alt="First slide"
                      width={500}
                      height={500} 
                      className="img-fluid w-100 h-100 bg-secondary rounded"
                    />
                    <a href="#" className="btn px-4 py-2 text-white rounded">Frutas</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Hero End --> */}
    </>
  )
}

export default HeroImage