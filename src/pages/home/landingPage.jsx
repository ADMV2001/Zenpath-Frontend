import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StatsSection from '../../components/stats';
import FAQSection from "../../components/faq";

export default function LandingPage() {
  // Testimonials Data
  const testimonials = [
    {
      name: "Sohan",
      text: "Instead of just texting my friends, I text my therapist and there's no judgment on what I say.",
      image: "/sohan.png",
      bgColor: "bg-orange-200",
    },
    {
      name: "Imal",
      text: "The therapist I'm working with gives me thoughtful feedback and is very prompt with responses.",
      image: "/imal.png",
      bgColor: "bg-blue-200",
    },
    {
      name: "Isuru",
      text: "I got connected to a provider from the same area, someone that looks like me and understands my issue.",
      image: "/isuru.png",
      bgColor: "bg-green-200",
    },
    {
      name: "Pehan",
      text: "Zenpath has given me a reason not to give up on myself. It helped me see things differently.",
      image: "/pehan.png",
      bgColor: "bg-pink-200",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-6 md:px-16 bg-gradient-to-r from-white to-blue-100 font-[poppins]">
      {/* Hero Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center text-center md:text-left py-16 max-w-6xl mt-[-50px]">
        {/* Left Side - Text */}
        <div className="md:w-1/2">
          <h1 className="text-6xl font-bold text-[#03045E] leading-tight">
            A Place to <br />
            <span className="text-[#0077B6]">calm</span> <br />
            <span className="text-[#0077B6]">yourself</span>
          </h1>
          <ul className="mt-6 space-y-1 text-gray-700 text-lg">
            <li>Convenient access anytime, anywhere</li>
            <li>Professional support from licensed therapists</li>
            <li>Flexible options tailored to your needs and budget</li>
          </ul>
          <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/get-started"
              className="px-6 py-2 font-semibold bg-[#0077B6] text-white rounded-md text-lg shadow-md hover:bg-[#03045E]"
            >
              Let's Begin
            </Link>
            <Link
              to="/therapist_registration"
              className="px-6 py-2 font-semibold bg-white text-[#0077B6] rounded-md text-lg shadow-md border-1 hover:scale-110 transition duration-300 ease-in-out"
            >
              Be a Therapist
            </Link>
          </div>
        </div>

        {/* Right Side - GIF */}
        <div className="md:w-1/2">
          <img
            src="home1.svg" // Replace with actual GIF URL
            alt="Therapy Session"
            className="w-full rounded-xl"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full max-w-6xl mx-auto text-center py-16 px-6 mt-[-50px]">
      <motion.h2
        className="text-4xl font-bold text-[#03045E]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Testimonials
      </motion.h2>
      <motion.p
        className="text-gray-700 mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        See why people love us. {" "}
        <Link to="#" className="text-[#0096C7] font-semibold hover:underline">
          See all reviews
        </Link>
      </motion.p>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="mt-8"
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="p-6 rounded-xl shadow-lg bg-white flex flex-col items-center text-center border border-gray-200"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 shadow-md"
              />
              <p className="text-gray-800 mt-4 italic">"{t.text}"</p>
              <p className="text-gray-900 font-semibold mt-2">{t.name}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>

    <StatsSection /> 

    <FAQSection/> 

    </div>
  );
}