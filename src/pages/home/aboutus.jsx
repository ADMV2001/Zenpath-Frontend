import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import illustration from '../../assets/couple-looking-outward.svg'; // Make sure this file exists
import NavBar from '../../components/navigationBar';
import Footer from '../../components/footer';

const AboutZenPath = () => {
  const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate();

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <>
    <NavBar/>
    <div className="w-full font-sans">
      {/* Top Section */}
      <div className="bg-[#e6f2fd] w-full px-6 md:px-24 pt-16 flex flex-col md:flex-row justify-between items-end">
        {/* Left Text */}
        <div className="md:w-1/2 pb-40 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e2b77] mb-4">
            About ZenPath
          </h1>
          <p className="text-[#1e2b77] text-base md:text-lg">
            For over two decades, individuals across Sri Lanka have placed their trust in
            ZenPath as a reliable platform for mental wellness support, guidance, and growth.
          </p>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <img
            src={illustration}
            alt="ZenPath Illustration"
            className="w-full h-auto max-w-[600px]"
          />
        </div>
      </div>

      {/* Middle Section with Expandable Items */}
      <div className="w-full py-16 px-6 md:px-24 grid md:grid-cols-2 gap-10 items-start">
        {/* Left Text Block */}
        <div className="text-[#1e2b77] text-base md:text-lg">
          <p className="mb-6">
            ZenPath is one of Sri Lanka’s most trusted and accessible mental health platforms. 
            We are honored by the confidence people place in us. With that trust comes a strong 
            commitment to truly listen, understand individual journeys, and provide meaningful support.
          </p>
          <p>
            We serve as an open and welcoming door for all: a place where anyone can find 
            connection, resources, and compassionate guidance — whether you're managing stress, 
            overcoming challenges, or seeking personal growth and healing.
          </p>
        </div>

        {/* Right: Dropdown Links */}
        <div className="space-y-4">
          {/* Strategy Dropdown */}
          <div>
            <button
              onClick={() => toggleSection('strategy')}
              className="flex items-center justify-between w-full border-b border-gray-300 text-blue-600 font-bold pb-2 hover:underline"
            >
              Our strategy
              <span>{openSection === 'strategy' ? '−' : '+'}</span>
            </button>
            {openSection === 'strategy' && (
              <div className="mt-2 text-[#1e2b77] text-sm font-semibold">
                ZenPath's strategy is rooted in inclusion, cultural sensitivity, and
                innovation. We aim to provide mental wellness solutions that are locally
                relevant, digitally accessible, and deeply empathetic.
              </div>
            )}
          </div>

          {/* Funding Dropdown */}
          <div>
            <button
              onClick={() => toggleSection('funding')}
              className="flex items-center justify-between w-full border-b border-gray-300 text-blue-600 font-bold pb-2 hover:underline"
            >
              Our funding
              <span>{openSection === 'funding' ? '−' : '+'}</span>
            </button>
            {openSection === 'funding' && (
              <div className="mt-2 text-[#1e2b77] text-sm font-semibold">
                ZenPath is supported by a blend of community partnerships, government grants,
                and private donors. This ensures we can offer services to Sri Lankans without
                financial barriers and with lasting impact.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Final Section: Online Counselling */}
      <div className="bg-[#f7fafe] px-6 md:px-24 py-20 text-center md:text-left">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-center md:text-4xl font-bold text-[#1e2b77] mb-6">
            Your Journey to Wellness Starts Here
          </h2>
          <p className="text-[#1e2b77] text-lg mb-6">
            ZenPath offers confidential and professional online counselling services designed
            for the people of Sri Lanka. Whether you're facing challenges or simply need someone 
            to talk to — our team is ready to support you with compassion and care.
          </p>
          <ul className="list-disc text-left text-[#1e2b77] pl-5 space-y-3 text-base">
            <li>Connect with trained counsellors from anywhere in Sri Lanka</li>
            <li>Completely confidential and judgment-free environment</li>
            <li>Personalized care for individuals, couples, and youth</li>
            <li>Available in Sinhala, Tamil, and English</li>
          </ul>
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/get-started")}
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition"
            >
              Start Your Session
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutZenPath;
