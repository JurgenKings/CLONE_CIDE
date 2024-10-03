import { USERS_URL } from "./urls"

export const registerUser = async (body) => {
  try {
    const apiUrl = USERS_URL.register

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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

export const login = async (body) => {
  try {
    const apiUrl = USERS_URL.login

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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