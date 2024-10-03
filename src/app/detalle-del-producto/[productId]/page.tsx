import React from "react"
import Breadcrumb from "@/components/Breadcrumb"
import { getProductById, getProducts } from "@/services/products/products"
import { domain } from "@/services/enviroments"
import { getCategories } from "@/services/categories/category"
import ButtonCategory from "@/components/ButtonCategory"
import AddToCartBtn from "@/components/AddToCartBtn"
import Link from "next/link"
import Image from "next/image"
import { IProductDetailParams } from "@/interfaces/IProductDetailParams"
import { IProduct } from "@/interfaces/IProduct"
import { ICategory } from "@/interfaces/ICategory"

interface ProductDetailProps {
  params: IProductDetailParams
}

const ProductDetail: React.FC<ProductDetailProps> = async ({ params }) => {

  const { productId } = params

  const product = await getProductById(productId)
  const categoriesData = await getCategories()
  const productsData = await getProducts("all", 1)
  const products = productsData.data
  const categories = categoriesData.data

  const getFeaturedProducts = (products: IProduct[], numFeatured: number) => {
    const productsCopy = [...products]
    const featuredProducts = []

    while (featuredProducts.length < numFeatured && productsCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * productsCopy.length)
      featuredProducts.push(productsCopy.splice(randomIndex, 1)[0])
    }

    return featuredProducts
  }

  const featuredProducts = getFeaturedProducts(products, 4)

  return (
    <>
      <Breadcrumb title="Detalle del producto" />

      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-8 col-xl-9">
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="border rounded">
                    <Image
                      src={`${domain}${product.images[0].url}`}
                      layout="responsive"
                      width={500}
                      height={300}
                      className="img-fluid rounded"
                      alt="Image"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <h4 className="fw-bold mb-3">
                    {product.name}
                  </h4>
                  <p className="mb-3">
                    Categoría: {product.category.name}
                  </p>
                  <p className="mb-3">
                    Existencia:
                    {
                      product.stock === 0
                        ? " Agotado"
                        : ` (${product.stock} Und)`
                    }
                  </p>
                  <h5 className="fw-bold mb-3">
                    ${(((product.priceAlMayor * (product.tasaComisionPorcentual * 0.01))) + product.priceAlMayor).toFixed(2)}
                  </h5>
                  <p className="mb-4">
                    {product.description}
                  </p>

                  <AddToCartBtn product={product} />

                </div>
                <div className="col-lg-12">
                  <nav>
                    <div className="nav nav-tabs mb-3">
                      <button
                        className="nav-link active border-white border-bottom-0"
                        type="button"
                      >
                        Descripcion
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content mb-5">
                    <div
                      className="tab-pane active"
                    >
                      {product?.descripcionDetallada}
                      <div className="px-2 mt-4">
                        <div className="row g-4">
                          <div className="col-6">
                            <div className="row bg-light align-items-center text-center justify-content-center py-2">
                              {
                                product?.peso && (
                                  <>
                                    <div className="col-6">
                                      <p className="mb-0">Peso</p>
                                    </div>

                                    <div className="col-6">
                                      <p className="mb-0">{product?.peso}</p>
                                    </div>
                                  </>
                                )
                              }
                            </div>
                            {
                              product?.paisOrigen && (
                                <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                  <div className="col-6">
                                    <p className="mb-0">País de origen</p>
                                  </div>

                                  <div className="col-6">
                                    <p className="mb-0">{product?.paisOrigen}</p>
                                  </div>
                                </div>
                              )
                            }
                            {
                              product?.calidad && (
                                <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                  <div className="col-6">
                                    <p className="mb-0">Calidad</p>
                                  </div>

                                  <div className="col-6">
                                    <p className="mb-0">{product?.calidad}</p>
                                  </div>
                                </div>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-xl-3">
              <div className="row g-4 fruite">
                <div className="col-lg-12">
                  <div className="mb-4">
                    <h4>Categorías</h4>
                    <ul className="list-unstyled fruite-categorie">
                      {
                        categories.map((category: ICategory) => (
                          <ButtonCategory
                            key={category.id}
                            category={category}
                          />
                        ))
                      }
                    </ul>
                  </div>
                </div>

                <div className="col-lg-12">
                  <h4 className="mb-4">
                    Productos destacados
                  </h4>
                  {
                    featuredProducts.map((item) => (
                      <div key={item.documentId} className="d-flex align-items-center justify-content-start">
                        <div className="rounded" style={{ width: "100px", height: "100px" }}>
                          <Image
                            src={`${domain}${item.images[0].url}`}
                            layout="fixed"
                            width={80}
                            height={80}
                            className="img-fluid rounded"
                            alt="Image"
                            style={{
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                        <div>
                          <h6 className="mb-2">
                            {item.name}
                          </h6>
                          <div className="d-flex mb-2">
                            <h5 className="fw-bold me-2">
                              ${(((item.priceAlMayor * (item.tasaComisionPorcentual * 0.01))) + item.priceAlMayor).toFixed(2)}
                            </h5>
                          </div>
                        </div>
                      </div>
                    ))
                  }

                  <div className="d-flex justify-content-center my-4">
                    <Link href="/tienda" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">
                      Ver Más
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default ProductDetail