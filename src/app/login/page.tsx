"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify'
import { validateEmail, validatePasswordLogin } from "@/utils/validationSchema"
import { login } from "@/services/users/users"
import Loading from "@/components/Loading"
import { handleLogin } from "@/actions"
import 'react-toastify/dist/ReactToastify.css'
import "./Login.css"
import useUserStore from "@/hooks/useUserStore"

function LoginPage(): React.JSX.Element {

  const router = useRouter()
  const saveUserData = useUserStore((state) => state.saveUserData)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }


  const notify = (type: string) => {
    if (type === "success") toast.success("Inicio de sesión exitoso")
    else if (type === "serverError") toast.error("Ocurrió un error al iniciar sesión")
    else toast.error("Credenciales incorrectas")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (!validateEmail(email)) {
      setError("El correo electrónico no es válido. Verifique el formato e intente de nuevo.")
      return
    }

    if (!validatePasswordLogin(password)) {
      setError("La contraseña debe tener entre 8 y 20 caracteres")
      return
    }

    setLoading(true)

    try {
      const body = {
        identifier: email,
        password: password
      }

      const response = await login(body)
      if (response) {
        notify("success")
        if (rememberMe) {
          localStorage.setItem('email', email)
          localStorage.setItem('password', password)
        } else {
          localStorage.removeItem('email')
          localStorage.removeItem('password')
        }
        saveUserData(response.user)
        handleLogin(response.jwt, response.user)
      } else {
        notify("error")
      }
    } catch (error) {
      if (error) { }
      notify("serverError")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const storedEmail = localStorage.getItem('email')
    const storedPassword = localStorage.getItem('password')

    if (storedEmail) {
      setEmail(storedEmail)
    }
    if (storedPassword) {
      setPassword(storedPassword)
    }
  }, [router])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="text-primary display-6 text-center mb-4">
            Cidepym
          </h1>
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
                <div className="contenedor-input-login">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    required
                    className={`w-100 input-login form-control border-0 py-3 mb-4 ${email ? "no-vacio " : ""}`}
                    id="login-email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="label-login" htmlFor="login-email">
                    Correo electrónico
                  </label>
                </div>
                <div className="contenedor-input-login">

                  <input
                    // type="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    id="login-password"
                    className={`w-100 input-login form-control border-0 py-3 mb-4 ${password ? "no-vacio " : ""}`}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="label-login" htmlFor="login-password">
                    Contraseña
                  </label>
                </div>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <i className="fas fa-eye"></i>
                  ) : (
                    <i className="fas fa-eye-slash"></i>
                  )}
                </button>
                <label className="login-checkbox-container mb-4">
                  <input
                    name="rememberMe"
                    type="checkbox"
                    className="login-checkbox"

                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  Recordarme
                </label>
                {error && <div className="error-message mb-4" style={{ color: "red" }}>{error}</div>}
              </>
            )
          }
          <button className="w-100 btn form-control border-secondary py-3 bg-white text-primary mb-4" type="submit" disabled={loading}>
            Iniciar Sesión
          </button>
          <p className="text-center">
            <Link href="/registro">
              ¿No tienes cuenta? Registrate
            </Link>
          </p>
        </form>
      </div >
    </>
  )
}

export default LoginPage