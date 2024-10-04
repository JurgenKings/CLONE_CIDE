import React from "react"
import Breadcrumb from "@/components/Breadcrumb"
import { getProducts, getProductsByCategory, getProductsByName, getProductsByPriceRange, getSortProducts } from "@/services/products/products"
import { getCategories } from "@/services/categories/category"
import ButtonCategory from "@/components/ButtonCategory"
import PriceRangeSelector from "@/components/PriceRangeSelector"
import SearchBar from "@/components/SearchBar"
import SortBar from "@/components/SortBar"
// import { cookies } from "next/headers"
import Link from "next/link"
import { domain } from "@/services/enviroments"
import ProductCard from "@/components/ProductCard"
import Pagination from "@/components/Pagination"
import Image from "next/image"

const getFilteredProducts = async (categoryId: number, minPrice, maxPrice, text: string, sortMethod: string, page) => {
  if (!categoryId && !minPrice && !text && !sortMethod) {
    return await getProducts("page", Number(page))
  }
  if (minPrice) {
    return await getProductsByPriceRange(minPrice, maxPrice)
  }
  if (sortMethod) {
    return await getSortProducts(sortMethod)
  }
  if (text) {
    return await getProductsByName(text)
  }
  return await getProductsByCategory(categoryId)
}

async function StorePage({ searchParams }) {

  // const cookiesStore = cookies()
  // const user = cookiesStore.get('user')?.value
  // let userData
  // if (user) {
  //   userData = JSON.parse(user)
  // } else {
  //   userData = {}
  // }

  const categoryId = searchParams.categoryId
  const minPrice = searchParams.minPrice
  const maxPrice = searchParams.maxPrice
  const text = searchParams.text
  const sortMethod = searchParams.sort
  const page = parseInt(searchParams.page) || 1

  const productsData = await getFilteredProducts(categoryId, minPrice, maxPrice, text, sortMethod, page)
  const productMeta = await getProducts("all", 1)
  const totalProduct = productMeta.meta.pagination.total
  const paginationData = productMeta.meta.pagination
  const categoriesData = await getCategories()
  const products = productsData.data
  const categories = categoriesData.data

  const getFeaturedProducts = (products, numFeatured) => {
    const productsCopy = [...products]
    const featuredProducts = []

    if (productsCopy.length < numFeatured) {
      return productsCopy
    }

    while (featuredProducts.length < numFeatured && productsCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * productsCopy.length)
      featuredProducts.push(productsCopy.splice(randomIndex, 1)[0])
    }

    return featuredProducts
  }

  const featuredProducts = getFeaturedProducts(products, 3)

  return (
    <>
      <Breadcrumb title="Tienda" />

      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <h1 className="mb-4">Tienda</h1>
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="row g-4">
                <SearchBar searchBy="nombre" />
                <div className="col-6"></div>
                <SortBar />
              </div>
              <div className="row g-4">
                <div className="col-lg-3">
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <h4>Categories</h4>
                        <ul className="list-unstyled fruite-categorie">
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <Link href={`/tienda`}>
                                <i className="fas fa-border-all me-2"></i>
                                Todas
                              </Link>
                              <span>({totalProduct})</span>
                            </div>
                          </li>
                          {
                            categories.map((category) => (
                              <ButtonCategory
                                key={category.id}
                                category={category}
                              />
                            ))
                          }
                        </ul>
                      </div>
                    </div>

                    <PriceRangeSelector />

                    <div className="col-lg-12">
                      <h4 className="mb-3">
                        Productos destacados
                      </h4>
                      {
                        featuredProducts.map((item) => (
                          <div key={item.documentId} className="d-flex align-items-center justify-content-start">
                            <div className="rounded me-4" style={{ width: "100px", height: "100px" }}>
                              <Image
                                src={`${domain}${item?.imagenes[0]?.url}`}
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
                              <Link href={`/detalle-del-producto/${item.documentId}`}>
                                <h6 className="mb-2">
                                  {item.nombre}
                                </h6>
                              </Link>
                              <div className="d-flex mb-2">
                                <h5 className="fw-bold me-2">
                                  ${(((item.precioAlMayor * (item.tasaComisionPorcentual * 0.01))) + item.precioAlMayor).toFixed(2)}
                                </h5>
                              </div>
                            </div>
                          </div>
                        ))
                      }

                      <div className="d-flex justify-content-center my-4">
                        <a href="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Ver Más</a>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <Image
                          src="/images/banner-fruits.jpg"
                          layout="responsive"
                          width={700}
                          height={475}
                          className="img-fluid w-100 rounded"
                          alt=""
                        />
                        <div className="position-absolute" style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row g-4 justify-content-center">
                    {
                      products.map((product) => (
                        <ProductCard key={product.id} product={product} isTienda={true} />
                      ))
                    }

                    <div className="col-12">
                      <div className="pagination d-flex justify-content-center mt-5">
                        <Pagination paginationData={paginationData} currentPage={page} />
                      </div>
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


export default StorePage