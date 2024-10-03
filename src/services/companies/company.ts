import { COMPANY_URL } from "./urls"

export const getCompany = async () => {
  try {
    const apiUrl = COMPANY_URL.one

    const response = await fetch(apiUrl, {})
  
    const company = await response.json()
    
    return company.data
  } catch (error) {
    if (error) {}
  }
}