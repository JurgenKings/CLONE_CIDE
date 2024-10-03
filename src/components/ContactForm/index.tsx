"use client"
import React, { useState } from "react"
import Loading from "@/components/Loading"
import { ToastContainer, toast } from 'react-toastify'
import { validateEmail, validateFullName } from "@/utils/validationSchema"
import { sendEmail } from "@/actions"
import 'react-toastify/dist/ReactToastify.css'

function ContactForm(): React.JSX.Element {

  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [numOrder, setNumOrder] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const notify = (type: string) => {
    if (type === "success") toast.success("Correo enviado exitosamente")
    else if (type === "serverError") toast.error("Ocurrió un error al enviar el correo")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (!validateEmail(email)) {
      setError("El correo electrónico no es válido. Verifique el formato e intente de nuevo.")
      return
    }

    if (!validateFullName(name)) {
      setError("El campo nombre solo acepta letras, de 3 a 50 caracteres")
      return
    }

    setLoading(true)

    try {
      const body = {
        email: email,
        name: name,
        numOrder: numOrder,
        message: message
      }

      const data = await sendEmail(body)

      if (data.data?.data?.id) {
        notify("success")
      } else {
        notify("serverError")
      }
    } catch (error) {
      if (error) { }
      notify("serverError")
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
      <div className="col-lg-7">
        <form className="" onSubmit={handleSubmit}>
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
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  required
                  value={name}
                  className="w-100 form-control border-0 py-3 mb-4"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Tu correo"
                  required
                  value={email}
                  className="w-100 form-control border-0 py-3 mb-4"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  name="numOrder"
                  placeholder="Número de pedido (opcional)"
                  value={numOrder}
                  className="w-100 form-control border-0 py-3 mb-4"
                  onChange={(e) => setNumOrder(e.target.value)}
                />
                <textarea
                  rows={5}
                  cols={10}
                  placeholder="Tu mensaje"
                  required
                  value={message}
                  className="w-100 form-control border-0 mb-4"
                  style={{ resize: "none" }}
                  onChange={(e) => setMessage(e.target.value)}
                >
                </textarea>
                {error && <div className="error-message mb-4" style={{ color: "red" }}>{error}</div>}
              </>
            )
          }
          <button
            className="w-100 btn form-control border-secondary py-3 bg-white text-primary"
            type="submit"
            disabled={loading}
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  )
}

export default ContactForm