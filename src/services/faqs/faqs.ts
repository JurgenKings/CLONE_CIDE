import { FAQ_URL } from "./urls"

export const getFAQs = async () => {
  try {
    const apiUrl = FAQ_URL.all

    const response = await fetch(apiUrl, {})
  
    const faqs = await response.json()
    
    return faqs.data
  } catch (error) {
    if (error) {}
  }
}