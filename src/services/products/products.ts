"use server"
import { cookies } from "next/headers"
import { PRODUCTS_URL } from "./urls"
import { redirect } from "next/navigation"

// TODO - checkout

export const getProducts = async (type: string, page: number) => {
  try {
    let apiUrl
    if (type === "page") apiUrl = `${PRODUCTS_URL.page}${page}&pagination[pageSize]=25&populate=*`
    else if (type === "all") apiUrl = PRODUCTS_URL.all

    console.log("MI URL", apiUrl)
  
    const response = await fetch(apiUrl, {})

    const products = await response.json()
    return products
  } catch (error) {
    if (error) {}
  }
}

export const getProductById = async (id: string) => {
  try {
    const apiUrl = `${PRODUCTS_URL.detailById}${id}?populate=*`

    const response = await fetch(apiUrl, {})

    const product = await response.json()

    return product.data
  } catch (error) {
    if (error) {}
  }
}

export const updateStockSaleConfirm = async (productsSale) => {
  const cookiesStore = cookies()
  const accessToken = cookiesStore.get('accessToken')?.value
  if (!accessToken) {
    redirect("/")
    return
  }

  try {
    for (const product of productsSale) {
      const apiUrl = `${PRODUCTS_URL.updateStock}${product.documentId}`
      const newStock = `${product.stock - product.quantity}`
      const res = await fetch(apiUrl, {
        method: 'PUT',
        headers: new Headers({
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          data: {
            stock: newStock
          }
        })
      })

      if (!res.ok) {
        throw new Error(`Error al actualizar el stock del producto ${product.name}`)
      }
    }

    return true
  } catch (error) {
    if (error) { }
    return false
  }
}

export const getProductsByCategory = async (categoryId: number) => {
  try {
    const apiUrl = `${PRODUCTS_URL.byCategory}${categoryId}`

    const response = await fetch(apiUrl, {})

    const filteredProductsByCategory = await response.json()

    return filteredProductsByCategory
  } catch (error) {
    if (error) {}
  }
}

export const getProductsByPriceRange = async (minPrice: number, maxPrice: number) => {
  try {
    const apiUrl = `${PRODUCTS_URL.byPriceRange}${minPrice}&filters[precioSinComision][$lte]=${maxPrice}`
    const response = await fetch(apiUrl, {})

    const filteredProductsByPriceRange = await response.json()

    return filteredProductsByPriceRange
  } catch (error) {
    if (error) {}
  }
}

export const getProductsByName = async (text: string) => {
  try {
    const apiUrl = `${PRODUCTS_URL.byName}${text}`
    const response = await fetch(apiUrl, {})

    const filteredProductsByName = await response.json()

    return filteredProductsByName
  } catch (error) {
    if (error) {}
  }
}

export const getSortProducts = async (method: string) => {
  try {
    let apiUrl = ""

    if (method === "priceASC") {
      apiUrl = `${PRODUCTS_URL.sortByPriceAsc}`
    } else if (method === "priceDESC") {
      apiUrl = `${PRODUCTS_URL.sortByPriceDesc}`
    }

    const response = await fetch(apiUrl, {})

    const sortProducts = await response.json()

    return sortProducts
  } catch (error) {
    if (error) {}
  }
}