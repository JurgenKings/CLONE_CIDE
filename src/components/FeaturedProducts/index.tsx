import { getProducts } from "@/services/products/products"
import React from "react"
import ProductCard from "../ProductCard"

async function FeaturedProducts() {

  const productsData = await getProducts("all", 1)
  const products = productsData.data

  const getFeaturedProducts = (products, numFeatured) => {
    const productsCopy = [...products]
    const featuredProducts = []

    while (featuredProducts.length < numFeatured && productsCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * productsCopy.length)
      featuredProducts.push(productsCopy.splice(randomIndex, 1)[0])
    }

    return featuredProducts
  }

  const featuredProducts = getFeaturedProducts(products, 8)

  return (
    <>
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="tab-class text-center">
            <div className="row g-4">
              <div className="col-lg-4 text-start mb-4">
                <h1>Más populares</h1>
              </div>
            </div>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      {
                        featuredProducts.map((item) => (
                          <ProductCard key={item.id} product={item} isTienda={false}/>
                        ))
                      }
                    </div>
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

export default FeaturedProducts