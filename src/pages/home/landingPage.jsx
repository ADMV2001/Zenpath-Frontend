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

      
    <StatsSection /> 

    <FAQSection/> 

    </div>
  );
}