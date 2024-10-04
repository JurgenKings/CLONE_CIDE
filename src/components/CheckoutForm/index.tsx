"use client"
import React, { ChangeEvent, useEffect, useState } from "react"
import axios from "axios"
import useCartStore from "@/hooks/useCartStore"
import { domain } from "@/services/enviroments"
import { validateEmail, validateFullName } from "@/utils/validationSchema"
import { useRouter } from "next/navigation"
import useSaleData from "@/hooks/useSaleData"
import Loading from "../Loading"
import Image from "next/image"

function CheckoutForm(): React.JSX.Element {

  const router = useRouter()
  const cartItems = useCartStore((state) => state.cartItems)
  const itemCount = useCartStore((state) => state.cartItems.length)
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedShipping, setSelectedShipping] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

  // const saveSaleData = useSaleData((state) => state.saveSaleData)
  const saveSaleData = useSaleData((state) => state.saveSaleData)

  const fixedRate = 15
  const localShipping = 8

  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    fullName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: 0,
    phoneNumber: '',
    email: '',
    orderNotes: ''
  })

  useEffect(() => {
    if (itemCount === 0) {
      router.push(`/tienda`)
    }
  }, [itemCount, router])


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const total = cartItems.reduce((sum, product) => sum + ((((product.precioAlMayor * (product.tasaComisionPorcentual * 0.01))) + product.precioAlMayor)) * product.quantity, 0)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (!validateEmail(formData.email)) {
      setError("El correo electrónico no es válido. Verifique el formato e intente de nuevo.")
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

    setLoading(true)

    try {
      const body = {
        fullName: formData.fullName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        orderNotes: formData.orderNotes,
        selectedCountry: selectedCountry,
        selectedShipping: selectedShipping,
        selectedPaymentMethod: selectedPaymentMethod,
        total: total,
        cartItems: cartItems
      }
      // saveSaleData(body)
      saveSaleData(body)

      // if (response) {
      //   notify("success")
      //   handleRegister(response.jwt)
      // } else {
      //   notify("serverError")
      // }
      router.push("/procesar-compra")
    } catch (error) {
      if (error) { }
    } finally {
      setLoading(false)
    }
  }


  const handleShippingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedShipping(e.target.value)
  }

  const handlePaymentMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(e.target.value)
  }


  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries((response.data).sort((a, b) => (a.name.common.localeCompare(b.name.common))))
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row g-5">
          <div className="col-md-12 col-lg-6 col-xl-7">
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
                  <div className="row">
                    <div className="col-md-12 col-lg-6">
                      <div className="form-item w-100">
                        <label className="form-label my-3">
                          Nombre<sup>*</sup>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          maxLength={50}
                          required
                          className="form-control"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="form-item w-100">
                        <label className="form-label my-3">
                          Apellido<sup>*</sup>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          maxLength={50}
                          required
                          className="form-control"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      Dirección<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Casa Número Calle Nombre"
                      maxLength={100}
                      required
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      País<sup>*</sup>
                    </label>
                    <select className="form-control" onChange={(e) => setSelectedCountry(e.target.value)}>
                      <option value="">Seleccione un país</option>
                      {countries?.map((country) => (
                        <option key={country.cca3} value={country.name.common}>
                          {country.name.common}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      Ciudad<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="city"
                      maxLength={50}
                      required
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-item">
                    <label className="form-label my-3">
                      Código postal<sup>*</sup>
                    </label>
                    <input
                      type="number"
                      name="zipCode"
                      maxLength={50}
                      required
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      Número de teléfono<sup>*</sup>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      maxLength={50}
                      required
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      Correo electrónico<sup>*</sup>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>

                  <hr />
                  <div className="form-item">
                    <textarea
                      name="orderNotes"
                      className="form-control"
                      spellCheck="false"
                      cols={30}
                      rows={11}
                      placeholder="Notas de pedido (opcional)"
                      onChange={handleChange}
                    >
                    </textarea>
                  </div>
                </>
              )
            }

            {error && <div className="error-message mb-4" style={{ color: "red" }}>{error}</div>}
          </div>


          <div className="col-md-12 col-lg-6 col-xl-5">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    cartItems?.map((item) => (
                      <tr key={item.documentId}>
                        <th scope="row">
                          <div className="d-flex align-items-center mt-4">
                            <Image
                              src={`${domain}${item?.imagenes[0]?.url}`}
                              alt=""
                              width={90}
                              height={75}
                              className="img-fluid rounded-circle"
                              style={{height: "75px"}}
                            />
                          </div>
                        </th>
                        <td className="py-5">
                          {item.nombre}
                        </td>
                        <td className="py-5">
                          ${(((item.precioAlMayor * (item.tasaComisionPorcentual * 0.01))) + item.precioAlMayor).toFixed(2)}
                        </td>
                        <td className="py-5">
                          {item.quantity}
                        </td>
                        <td className="py-5">
                          ${((((item.precioAlMayor * (item.tasaComisionPorcentual * 0.01))) + item.precioAlMayor) * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  }

                  <tr>
                    <th scope="row">
                    </th>
                    <td className="py-5"></td>
                    <td className="py-5"></td>
                    <td className="py-5">
                      <p className="mb-0 text-dark py-3">
                        Subtotal
                      </p>
                    </td>
                    <td className="py-5">
                      <div className="py-3 border-bottom border-top">
                        <p className="mb-0 text-dark">
                          ${total.toFixed(2)}
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                    </th>
                    <td className="py-5">
                      <p className="mb-0 text-dark py-4">
                        Envío
                      </p>
                    </td>
                    <td colSpan={3} className="py-5">
                      <div className="form-check text-start">
                        <input
                          type="radio"
                          className="form-check-input bg-primary border-0"
                          id="Shipping-1"
                          name="shipping"
                          value="Envío gratis"
                          required
                          onChange={handleShippingChange}
                        />
                        <label className="form-check-label" htmlFor="Shipping-1">
                          Envío Gratis
                        </label>
                      </div>
                      <div className="form-check text-start">
                        <input
                          type="radio"
                          className="form-check-input bg-primary border-0"
                          id="Shipping-2"
                          name="shipping"
                          value={`Tarifa fija: $${fixedRate.toFixed(2)}`}
                          required
                          onChange={handleShippingChange}
                        />
                        <label className="form-check-label" htmlFor="Shipping-2">
                          Tarifa fija: ${fixedRate.toFixed(2)}
                        </label>
                      </div>
                      <div className="form-check text-start">
                        <input
                          type="radio"
                          className="form-check-input bg-primary border-0"
                          id="Shipping-3"
                          name="shipping"
                          value={`Envío local: $${fixedRate.toFixed(2)}`}
                          required
                          onChange={handleShippingChange}
                        />
                        <label className="form-check-label" htmlFor="Shipping-3">
                          Envío local: ${localShipping.toFixed(2)}
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                    </th>
                    <td className="py-5">
                      <p className="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                    </td>
                    <td className="py-5"></td>
                    <td className="py-5"></td>
                    <td className="py-5">
                      <div className="py-3 border-bottom border-top">
                        <p className="mb-0 text-dark">${total.toFixed(2)}</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
              <div className="col-12">
                <div className="form-check text-start my-3">
                  <input
                    type="radio"
                    className="form-check-input bg-primary border-0"
                    id="Transfer-1"
                    name="paymentMethod"
                    value="Pago bancario"
                    required
                    onChange={handlePaymentMethodChange}
                  />
                  <label className="form-check-label" htmlFor="Transfer-1">
                    Pago bancario
                  </label>
                </div>
                <p className="text-start text-dark">
                  Realice su pago directamente en nuestra cuenta bancaria. Utilice su ID de pedido como referencia de pago. Su pedido no será enviado hasta que los fondos se hayan liquidado en nuestra cuenta
                </p>
              </div>
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
              <div className="col-12">
                <div className="form-check text-start my-3">
                  <input
                    type="radio"
                    className="form-check-input bg-primary border-0"
                    id="Paypal-1"
                    name="paymentMethod"
                    value="Paypal"
                    required
                    onChange={handlePaymentMethodChange}
                  />
                  <label className="form-check-label" htmlFor="Paypal-1">
                    Paypal
                  </label>
                </div>
              </div>
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center pt-4">
              <button
                type="submit"
                className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
              >
                Realizar Compra
              </button>
            </div>
          </div>
        </div>
      </form >
    </>
  )
}

export default CheckoutForm