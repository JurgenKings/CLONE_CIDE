"use client"
import React, { useState } from "react"
import { registerUser } from "@/services/users/users"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./Registro.css"
import { validateAge, validateEmail, validateFullName, validatePassword } from "@/utils/validationSchema"
import Loading from "@/components/Loading"
import { handleRegister } from "@/actions"

function RegisterPage(): React.JSX.Element {

  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    lastName: '',
    birthDate: '',
    termsAccepted: false,
    gender: '',
    esDistribuidor: false,
    esResponsableVentas: false
  })

  const notify = (type: string) => {
    if (type === "success") toast.success("Cuenta creada exitosamente")
    else if (type === "serverError") toast.error("Ocurrió un error al crear la cuenta")
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (!validateEmail(formData.email)) {
      setError("El correo electrónico no es válido. Verifique el formato e intente de nuevo.")
      return
    }

    if (!validatePassword(formData.password)) {
      setError("La contraseña debe tener entre 8 y 20 caracteres, e incluir al menos un número, una letra mayúscula, una minúscula y un carácter especial.")
      return
    }

    if (!validateFullName(formData.fullName)) {
      setError("El campo nombre solo acepta letras, de 3 a 50 caracteres")
      return
    }

    if (!validateFullName(formData.lastName)) {
      setError("El campo apellido solo acepta letras, de 3 a 50 caracteres")
      return
    }

    if (!validateAge(formData.birthDate)) {
      setError("Debe ser mayor de 18 años para registrarse.")
      return
    }

    setLoading(true)

    try {
      const body = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        name: formData.fullName,
        birthDate: formData.birthDate,
        gender: formData.gender,
        apellido: formData.lastName,
        esDistribuidor: formData.esDistribuidor,
        esResponsableVentas: formData.esResponsableVentas,
      }
      
      const response = await registerUser(body)

      if (response) {
        notify("success")
        handleRegister(response.jwt)
      } else {
        notify("serverError")
      }
    } catch (error) {
      if (error) { }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="text-primary display-6 text-center mb-4">
            Crear cuenta
          </h2>
          {
            loading ? (
              <div
                className="mb-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Loading />
              </div>
            ) : (
              <>
                <div className="register-inputs-container">
                  <input
                    name="username"
                    placeholder="Nombre de usuario"
                    maxLength={50}
                    required
                    className="form-control border-0 py-3 mb-4"
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    required
                    className="form-control border-0 py-3 mb-4"
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    required
                    className="form-control border-0 py-3 mb-4"
                    onChange={handleChange}
                  />
                  <input
                    name="fullName"
                    placeholder="Nombre completo"
                    maxLength={50}
                    required
                    className="form-control border-0 py-3 mb-4"
                    onChange={handleChange}
                  />
                  <input
                    name="lastName"
                    placeholder="Apellido(s)"
                    required
                    className="form-control border-0 py-3 mb-4"
                    onChange={handleChange}
                  />
                  <input
                    name="birthDate"
                    type="date"
                    required
                    className="form-control border-0 py-3 mb-4"
                    onChange={handleChange}
                  />
                  <select
                    name="gender"
                    className="form-control border-0 py-3 mb-4"
                    onChange={handleChange}
                  >
                    <option value="">Género (opcional)</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </div>
                <label className="register-checkbox-container mb-4">
                  <input
                    name="termsAccepted"
                    type="checkbox"
                    required
                    className="register-checkbox"
                    onChange={handleChange}
                  />
                  Acepto los términos y condiciones
                </label>
                {error && <div className="error-message mb-4" style={{ color: "red" }}>{error}</div>}
              </>
            )
          }
          <button
            className="btn form-control border-secondary py-3 bg-white text-primary mb-4"
            type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </>
  )
}

export default RegisterPage