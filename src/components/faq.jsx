import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = {
  patients: [
    { question: "How do I book an appointment?", answer: "You can book an appointment through our website or mobile app by selecting a preferred doctor and available time slot." },
    { question: "Is my medical data secure?", answer: "Yes, we prioritize your privacy with advanced encryption and security protocols." },
    { question: "Can I consult a doctor online?", answer: "Absolutely! We offer secure video consultations with qualified doctors." },
    { question: "What payment methods are available?", answer: "We accept credit cards, debit cards, and various online payment options." },
    { question: "Do I need insurance to use this service?", answer: "No, you can access our services with or without insurance." },
    { question: "How do I book an appointment?", answer: "You can book an appointment through our website or mobile app by selecting a preferred doctor and available time slot." },
    { question: "Is my medical data secure?", answer: "Yes, we prioritize your privacy with advanced encryption and security protocols." },
    { question: "Can I consult a doctor online?", answer: "Absolutely! We offer secure video consultations with qualified doctors." },
    { question: "What payment methods are available?", answer: "We accept credit cards, debit cards, and various online payment options." },
    { question: "Do I need insurance to use this service?", answer: "No, you can access our services with or without insurance." },
  ],
  doctors: [
    { question: "How do I register as a doctor?", answer: "You can sign up on our platform by submitting your credentials for verification." },
    { question: "Can I set my consultation fees?", answer: "Yes, doctors have the flexibility to set their consultation charges." },
    { question: "How are payments processed?", answer: "Payments are securely processed and transferred to your account on a scheduled basis." },
    { question: "What specialties are supported?", answer: "We support a wide range of medical specialties for doctors to list their services." },
    { question: "How can I manage my appointments?", answer: "You can manage appointments through our intuitive dashboard with scheduling features." }, { question: "How do I register as a doctor?", answer: "You can sign up on our platform by submitting your credentials for verification." },
    { question: "Can I set my consultation fees?", answer: "Yes, doctors have the flexibility to set their consultation charges." },
    { question: "How are payments processed?", answer: "Payments are securely processed and transferred to your account on a scheduled basis." },
    { question: "What specialties are supported?", answer: "We support a wide range of medical specialties for doctors to list their services." },
    { question: "How can I manage my appointments?", answer: "You can manage appointments through our intuitive dashboard with scheduling features." },
  ],
};

const FAQSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("patients");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mb-24 mt-12 mx-10">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-gray-900 text-center">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-gray-600 mt-2">
        If you can’t find an answer, feel free to contact us.
      </p>

      {/* Category Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => setSelectedCategory("patients")}
          className={`px-4 py-2 rounded-full border-2 text-sm font-semibold transition ${
            selectedCategory === "patients" ? "bg-black text-white" : "border-2 border-gray-700 text-gray-700"
          }`}
        >
          For Users
        </button>
        <button
          onClick={() => setSelectedCategory("doctors")}
          className={`px-4 py-2 rounded-full border-2 text-sm font-semibold transition ${
            selectedCategory === "doctors" ? "bg-black text-white" : "border-2 border-gray-700 text-gray-700"
          }`}
        >
          For Therapists
        </button>
      </div>

      {/* FAQ List */}
      <div className="mt-6 space-y-3">
        {faqs[selectedCategory].map((faq, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
            <button
              className="w-full flex justify-between items-center font-semibold text-gray-900"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? (
                <ChevronUp className="w-6 h-6 text-gray-700" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-700" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 mt-2 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;