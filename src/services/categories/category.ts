import { CATEGORIES_URL } from "./urls"

export const getCategories = async () => {
  try {
    const apiUrl = CATEGORIES_URL.all

    const response = await fetch(apiUrl, {})
  
    const categories = await response.json()
    
    return categories
  } catch (error) {
    if (error) {}
  }
}