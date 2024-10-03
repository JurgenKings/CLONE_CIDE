import React from "react"
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"
import { ISendEmail } from "@/interfaces/ISendEmail"

export default function ContactFormEmail({
  email,
  name,
  numOrder = "",
  message
}: ISendEmail) {
  return (
    <Html>
      <Head />
      <Preview>Nuevo mensaje</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                Soporte al cliente
              </Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>Datos del cliente:</Text>
              <Text>Nombre: {name}</Text>
              <Text>Correo: {email}</Text>
              {
                numOrder && (
                  <Text>Número de pedido: #{numOrder}</Text>
                )
              }
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}