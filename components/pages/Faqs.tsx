'use client'

import { useState } from 'react'

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: "What is EGPT?",
      answer: "EGPT (English Global Preparation Test) is an international English proficiency assessment designed to measure reading, listening, and writing skills accurately. It provides scaled scores to reflect true ability levels and supports long-term English development."
    },
    {
      question: "What age groups does EGPT cover?",
      answer: "EGPT is structured into different levels:\n\n• EGPT Primary – For young learners\n• EGPT Junior – Typically for students aged 11–17\n• EGPT Senior (SR) – For advanced secondary-level learners\n\nEach level is age-appropriate and aligned with academic progression."
    },
    {
      question: "Can a student register individually for EGPT Primary, Junior, or Senior?",
      answer: "No. EGPT Primary, Junior, and Senior are institution-based assessments.\n\nStudents cannot appear independently. Registration is done only through schools, academic institutions, or authorized partner centers. This ensures proper test administration, academic integrity, and structured evaluation."
    },
    {
      question: "Is EGPT a pass/fail examination?",
      answer: "No. EGPT is a developmental assessment, not a pass/fail exam.\n\nScores are scaled rather than raw, ensuring consistency across different test versions. The focus is on measuring proficiency levels and tracking progress over time, not labeling students as pass or fail."
    },
    {
      question: "Why should institutions choose EGPT?",
      answer: "Because our tests are designed by 75+ assessment specialists across 45+ countries.\n\nThis global expertise ensures:\n• International quality standards\n• Cultural and academic relevance\n• Reliable and standardized scoring\n• Globally benchmarked assessment frameworks\n\nEGPT reflects international testing practices while remaining academically practical for institutions."
    },
    {
      question: "How does EGPT benefit young learners?",
      answer: "Young learners feel motivated when their progress is clearly measured. EGPT provides certificates and detailed score reports that:\n\n• Boost confidence\n• Encourage a positive attitude toward English\n• Develop strong test-taking habits early\n• Reduce exam pressure due to its non-pass/fail format"
    },
    {
      question: "How does EGPT support future exams like TOEFL or IELTS?",
      answer: "Asia dominates registrations for exams like TOEFL and IELTS due to increasing demand for English proficiency in international education programs. Regions such as the Middle East, Lebanon, Europe, and Latin America also show growing demand.\n\nEGPT builds the foundational skills required for higher-level exams such as:\n• EGPT iBT\n• IELTS\n• TOEFL\n• Other academic English assessments\n\nIt enables a smoother transition to globally recognized examinations."
    },
    {
      question: "How can institutions use EGPT results?",
      answer: "EGPT results can be used for:\n\n• Graduation or promotion requirements\n• English placement decisions\n• Tracking student progress over time\n• Strengthening bilingual or international programs\n• Academic benchmarking"
    },
    {
      question: "What makes EGPT different from other English tests?",
      answer: "• Institution-based structure\n• No pass/fail system\n• Globally designed assessment framework\n• Scaled scoring consistency\n• Clear progression pathway to advanced English exams\n\nEGPT is not just a test — it is a structured English development system."
    }
  ]

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section className="animate-fadeIn max-w-full mx-auto mt-8 scroll-mt-20">
      <div className="glass-card p-8 md:p-16 lg:p-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            EGPT – <span className="bg-theme-gradient-text">Frequently Asked Questions</span> (FAQ)
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Everything you need to know about the English Global Preparation Test and how it can benefit your institution and students.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`glass-card overflow-hidden transition-all duration-300 border ${openIndex === index
                ? 'border-[var(--color-primary)] shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]'
                : 'border-white/10 hover:border-white/20'
                }`}
            >
              <button
                className="w-full px-8 py-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-white group-hover:text-[var(--color-primary)] transition-colors">
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index
                    ? 'bg-[var(--color-primary)] text-white rotate-180'
                    : 'bg-white/5 text-gray-400'
                    }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${openIndex === index
                  ? 'max-h-[1000px] opacity-100 pb-6 px-8'
                  : 'max-h-0 opacity-0 px-8'
                  }`}
              >
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed border-t border-white/10 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faqs
