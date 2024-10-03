import React from "react"
import Breadcrumb from "@/components/Breadcrumb"
import { getFAQs } from "@/services/faqs/faqs"
import FrequentlyQuestion from "@/components/FrequentlyQuestion"
import "./FrequentlyQuestions.css"

async function FAQPage() {

  const faqs = await getFAQs()

  return (
    <>
      <Breadcrumb title="Preguntas frecuentes" />

      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div
                  className="faq-container"
                >
                  {faqs.map((faq) => (
                    <FrequentlyQuestion key={faq.documentId} faq={faq}/>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default FAQPage