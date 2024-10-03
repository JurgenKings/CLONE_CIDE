import { domain } from "../enviroments"

export const SALES_URL = {
  all: `${domain}/api/ventas?populate=*`,
  detailById: `${domain}/api/ventas/`,
  create: `${domain}/api/ventas`,
  updateState: `${domain}/api/ventas/`,
}