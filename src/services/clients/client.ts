"use server"
import { cookies } from "next/headers"
import { CLIENTS_URL } from "./urls"
import { redirect } from "next/navigation"

export const getClients = async (token: string) => {
  try {
    const apiUrl = CLIENTS_URL.all

    const response = await fetch(apiUrl, {
      headers: new Headers({
        "Authorization": `Bearer ${token}`
      })
    })

    const clients = await response.json()

    return clients
  } catch (error) {
    if (error) {}
  }
}

export const createClient = async (body) => {

  const cookiesStore = cookies()
  const accessToken = cookiesStore.get('accessToken')?.value
  if (!accessToken) {
    redirect("/")
    return
  }

  try {
    const apiUrl = CLIENTS_URL.create

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