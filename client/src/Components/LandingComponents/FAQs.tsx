import { useState } from "react";

export const FaqSection = () => {
  const faqs = [
    { question: "How do I purchase a course?", answer: "Simply sign up, browse the courses, and click 'Buy Now' to start learning instantly!" },
    { question: "Are there any free courses?", answer: "Yes, we offer some free introductory courses. Check the 'Free Courses' section on the dashboard." },
    { question: "Will I get a certificate after completing a course?", answer: "Yes! A certificate is issued upon successfully completing a course." },
    { question: "Can I access the courses offline?", answer: "Currently, our courses are designed for online access only." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-black text-white px-6 md:px-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-gray-700 pb-4">
            <button onClick={() => toggle(idx)} className="w-full text-left flex justify-between items-center">
              <span className="text-lg font-semibold">{faq.question}</span>
              <span>{openIndex === idx ? "-" : "+"}</span>
            </button>
            {openIndex === idx && (
              <p className="text-gray-400 mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
