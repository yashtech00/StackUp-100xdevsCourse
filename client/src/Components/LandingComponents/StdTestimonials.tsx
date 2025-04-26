import { motion } from "framer-motion";

export const StudentTestimonials = () => {
  const testimonials = [
    {
      name: "Ayesha Patel",
      feedback: "These courses helped me land my first frontend developer job! The real-world projects are game-changers.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rohan Singh",
      feedback: "Super affordable and packed with knowledge. The instructors are top-notch and explain every concept clearly.",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Sara Malik",
      feedback: "I loved the project-based learning style. I built a fullstack app after completing the web development track!",
      image: "https://randomuser.me/api/portraits/women/47.jpg",
    },
  ];

  return (
    <section className="py-16 text-white px-6 md:px-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">What Our Students Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="border-2 border-stone-900 p-6 rounded-2xl shadow-lg"
          >
            <div className="flex flex-col items-center text-center">
              <img src={testimonial.image} className="w-20 h-20 rounded-full mb-4" alt={testimonial.name} />
              <p className="text-gray-300 mb-4">"{testimonial.feedback}"</p>
              <h4 className="font-bold">{testimonial.name}</h4>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
