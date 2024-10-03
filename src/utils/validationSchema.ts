const validateFullName = (name: string) => {
  if (name === "") return false
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,50}$/
  return nameRegex.test(name)
}

const validateEmail = (email: string) => {
  if (email === "") return false
  const emailRegex = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/
  return emailRegex.test(email) && email.length <= 100
}

const validatePassword = (password) => {
  if (password === "") return false
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,20})/
  return passwordRegex.test(password)
}

const validatePasswordLogin = (password: string) => {
  if (password === "") return false
  return password.length >= 8 && password.length <= 20
}

const validateAge = (birthDate) => {
  if (birthDate === "") return false
  const today = new Date()
  const birthDateObj = new Date(birthDate)
  let age = today.getFullYear() - birthDateObj.getFullYear()
  const m = today.getMonth() - birthDateObj.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
    age--
  }
  return age >= 18
}

const validatePhoneNumber = (num) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,20})/
  return re.test(num)
}

export { validateFullName, validateEmail, validatePassword, validatePasswordLogin, validateAge, validatePhoneNumber }