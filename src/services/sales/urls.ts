import { domain } from "../enviroments"

export const SALES_URL = {
  all: `${domain}/api/ventas?populate=*`,
  page: `${domain}/api/ventas?pagination[page]=`,
  detailById: `${domain}/api/ventas/`,
  create: `${domain}/api/ventas`,
  byEncargado: `${domain}/api/ventas?populate=*&filters[encargado][$contains]=`, 
  updateState: `${domain}/api/ventas/`,
}