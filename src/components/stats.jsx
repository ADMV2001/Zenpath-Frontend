import React, { useEffect, useState, useRef } from "react";
import { ToggleLeft, Quote, Globe } from "lucide-react";

const stats = [
  { id: 1, icon: <ToggleLeft className="w-10 h-10 text-indigo-500" />, count: 40000, label: "Users" },
  { id: 2, icon: <Quote className="w-10 h-10 text-indigo-500" />, count: 70000, label: "Therapists" },
  { id: 3, icon: <Globe className="w-10 h-10 text-indigo-500" />, count: 149, label: "Countries" },
];

const CounterCard = ({ icon, targetCount, label, startCounting }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let start = 0;
    const end = targetCount;
    const duration = 2000; // 2 seconds
    const increment = Math.ceil(end / (duration / 30));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [targetCount, startCounting]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-white p-2 rounded-lg shadow-md">{icon}</div>
      <h3 className="text-3xl font-bold text-gray-900 mt-3">{count.toLocaleString()}+</h3>
      <p className="text-indigo-500 font-semibold">{label}</p>
      <p className="text-gray-5S00 text-sm mt-1">Many desktop publishing packages and web page editors now use Pinky as their default model text.</p>
    </div>
  );
};

const StatsSection = () => {
  const [startCounting, setStartCounting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect(); // Stop observing after animation starts
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-20 flex flex-col items-center">
      {/* Heading and Subheading Centered */}
      <div className="text-center mb-10 max-w-xl">
        <h2 className="text-4xl font-bold text-gray-900">Our Achievements</h2>
        <p className="text-gray-600 mt-2">See what we've accomplished over the years</p>
      </div>

      {/* Stats Section with White Shadowed Box */}
      <div ref={sectionRef} className="bg-white shadow-lg rounded-xl p-10 flex space-x-10">
        {stats.map((stat) => (
          <CounterCard key={stat.id} icon={stat.icon} targetCount={stat.count} label={stat.label} startCounting={startCounting} />
        ))}
      </div>
    </div>
  );
};

export default StatsSection;