import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { BookOpen, Video, Users, UserCheck } from "lucide-react"; // 👈 Lucide icons

// Counter Component
const Counter = ({
  from = 0,
  to = 100,
  duration = 3
}: {
  from?: number;
  to: number;
  duration?: number;
}) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const count = useMotionValue(from);
  const [current, setCurrent] = useState(from);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, {
        duration,
        onUpdate(latest) {
          setCurrent(Math.floor(latest));
        }
      });
      return () => controls.stop();
    }
  }, [inView, count, to, duration]);

  return (
    <span ref={ref}>
      {current}
    </span>
  );
};

// Feature Section
export const FeatureSection = () => {
  const features = [
    {
      icon: <BookOpen className="w-10 h-10 mb-3 text-blue-400" />,
      title: "Courses",
      value: 15,
      description: "Covering Web Development, AI, Data Science, and more."
    },
    {
      icon: <Video className="w-10 h-10 mb-3 text-pink-400" />,
      title: "Videos",
      value: 2000,
      description: "In-depth tutorials and real-world projects."
    },
    {
      icon: <Users className="w-10 h-10 mb-3 text-green-400" />,
      title: "Students",
      value: 1000,
      description: "Join a growing community of tech learners."
    },
    {
      icon: <UserCheck className="w-10 h-10 mb-3 text-yellow-400" />,
      title: "Instructors",
      value: 50,
      description: "Learn from industry professionals."
    }
  ];

  return (
    <div className="py-20 bg-black text-white px-6 md:px-20">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
        Why Learn With Us?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="border-2 border-stone-900 rounded-2xl p-6 text-center shadow-lg hover:shadow-blue-500/20 transition"
          >
            {feature.icon}
            <h3 className="text-4xl font-bold mb-1">
              <Counter to={feature.value} />+
            </h3>
            <p className="text-xl font-semibold mb-2 text-stone-400">{feature.title}</p>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
