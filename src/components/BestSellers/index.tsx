import { getProducts } from "@/services/products/products"
import React from "react"
import ProductCardRounded from "../ProductCardRounded"

async function BestSellers() {

  const productsData = await getProducts("all", 1)
  const products = productsData.data

  const getBestSellersProducts = (products, numFeatured) => {
    const productsCopy = [...products]
    const featuredProducts = []

    while (featuredProducts.length < numFeatured && productsCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * productsCopy.length)
      featuredProducts.push(productsCopy.splice(randomIndex, 1)[0])
    }

    return featuredProducts
  }

  const BestSellers = getBestSellersProducts(products, 9)

  return (
    <>
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "700px" }}>
            <h1 className="display-4">Productos Más Vendidos</h1>
          </div>
          <div className="row g-4">
            {
              BestSellers.map((item) => (
                <ProductCardRounded product={item} key={item.documentId}/>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default BestSellers