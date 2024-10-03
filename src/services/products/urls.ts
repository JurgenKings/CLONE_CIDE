import { domain } from "../enviroments"

export const PRODUCTS_URL = {
  all: `${domain}/api/products?populate=*`,
  page: `${domain}/api/products?pagination[page]=`,
  detailById: `${domain}/api/products/`,
  updateStock: `${domain}/api/products/`,
  byCategory: `${domain}/api/products?populate=*&filters[category][id][$eq]=`, 
  byPriceRange: `${domain}/api/products?populate=*&filters[precioSinComision][$gte]=`,
  byName: `${domain}/api/products?populate=*&filters[name][$contains]=`, 
  sortByPriceAsc: `${domain}/api/products?populate=*&sort=precioSinComision:asc`, 
  sortByPriceDesc: `${domain}/api/products?populate=*&sort=precioSinComision:desc` 
}