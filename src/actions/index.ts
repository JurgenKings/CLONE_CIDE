"use server"
import React from "react"
import { redirect } from "next/navigation"
import { cookies } from 'next/headers'
import { Resend } from "resend"
import ContactFormEmail from "@/components/EmailTemplate"
import { Iuser } from "@/interfaces/IUser"
import { ISendEmail } from "@/interfaces/ISendEmail"

export const handleLogin = async (token: string, user: Iuser) => {
  const cookiesStore = cookies()
  cookiesStore.set("accessToken", token, {
    path: "/",
    httpOnly: true,
    sameSite: "strict"
  })

  cookiesStore.set("user", JSON.stringify(user), {
    path: "/",
    httpOnly: true,
    sameSite: "strict"
  })

  if (token) {
    redirect('/')
  }
}

export const handleRegister = async (token: string) => {
  const cookiesStore = cookies()
  cookiesStore.delete("accessToken")
  cookiesStore.set("accessToken", token, {
    path: "/",
    httpOnly: true,
    sameSite: "strict"
  })

  if (token) {
    redirect('/')
  }
}



export const sendEmail = async (body: ISendEmail) => {

  const resend = new Resend(process.env.RESEND_API_KEY)

  let data
  try {
    data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: "erenkings.20.007@gmail.com",
      subject: "Mensaje para soporte",
      react: React.createElement(ContactFormEmail, {
        message: body.message,
        senderEmail: body.email,
        name: body.name,
        numOrder: body.numOrder || ""
      }),
    })
  } catch (error) {
    if (error) { }
  }

  return {
    data
  }
}