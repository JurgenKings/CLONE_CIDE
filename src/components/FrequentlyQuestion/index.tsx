"use client"
import React, { useState } from "react"

function FrequentlyQuestion({ faq }): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleAnswer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className="col-12">
        <div
          className="faq-question-container"
          onClick={toggleAnswer}
        >
          <span>
            {faq.question}
          </span>
          <span
            style={{
              backgroundColor: "#d3dae0",
              width: "1.7rem",
              height: "1.6rem",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i className={`fas fa-${isOpen ? 'minus' : 'plus'} fa-1x`}></i>
          </span>
        </div>
        <div className={`faq-answer ${isOpen ? 'show' : ''}`}>
          {faq.answer}
        </div>
      </div>
    </>
  )
}

export default FrequentlyQuestion