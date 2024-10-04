"use server"
import { cookies } from "next/headers"
import { SALES_URL } from "./urls"
import { redirect } from "next/navigation"


export const getSales = async (token: string, type: string, page: number) => {
  try {
    let apiUrl
    if (type === "page") apiUrl = `${SALES_URL.page}${page}&pagination[pageSize]=25&populate=*`
    else if (type === "all") apiUrl = SALES_URL.all

    const response = await fetch(apiUrl, {
      headers: new Headers({
        "Authorization": `Bearer ${token}`
      })
    })

    const sales = await response.json()

    return sales
  } catch (error) {
    if (error) { }
  }
}

export const getSaleById = async (token: string, id: string) => {
  try {
    const apiUrl = `${SALES_URL.detailById}${id}?populate=*`

    const response = await fetch(apiUrl, {
      headers: new Headers({
        "Authorization": `Bearer ${token}`
      })
    })

    const sale = await response.json()

    return sale.data
  } catch (error) {
    if (error) { }
  }
}

export const createSale = async (body) => {

  const cookiesStore = cookies()
  const accessToken = cookiesStore.get('accessToken')?.value
  if (!accessToken) {
    redirect("/")
    return
  }

  try {
    const apiUrl = SALES_URL.create

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const res = await response.json()
    return res
  } catch (error) {
    if (error) { }
  }
}

export const updateStateSaleById = async (id: string, newState: string, proofPayment, newEncargado: string) => {

  const cookiesStore = cookies()
  const accessToken = cookiesStore.get('accessToken')?.value
  if (!accessToken) {
    redirect("/")
    return
  }

  try {
    const apiUrl = SALES_URL.updateState

    const response = await fetch(`${apiUrl}${id}?populate=*`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        data: {
          estado: newState,
          encargado: newEncargado,
          comprobantePago: proofPayment.id
        }
      })
    })
    const RES = await response.json()
    return RES
  } catch (error) {
    if (error) { }
  }
}

export const getSalesByEncargado = async (accessToken: string, encargado: string) => {
  try {
    const apiUrl = `${SALES_URL.byEncargado}${encargado}`
    const response = await fetch(apiUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
    })

    const filteredSalesByEncargado = await response.json()

    return filteredSalesByEncargado
  } catch (error) {
    if (error) {}
  }
}