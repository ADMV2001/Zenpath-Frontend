import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";  // Import icons for menu toggle

export default function MeetingNavBar({ actor }) {
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");

  return (
    <header className="relative w-full h-[70px] flex items-center justify-between md:px-10 lg:px-16 font-[poppins] sticky top-0 bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 z-50">
      {/* Left Side - Logo */}
      <div className="flex items-center">
        <img src="/logo.png" alt="logo" className="w-[50px] h-[50px] object-cover ml-2 md:ml-10 lg:ml-20 xl:ml-28" />
        <h1 className="ml-2 font-bold text-[22px] md:text-[25px] text-[#023E8A]">ZenPath | Live Session</h1>
      </div>

      {/* Right Side - Buttons */}
      <div className="hidden md:flex items-center gap-4 mr-27">

        {
          token && actor==="patient" && (
            <button onClick={() => navigate("/patient_dashboard")} className=" rounded-[5px] bg-white py-1 px-4 text-[#023E8A] border-1 font-medium">
              Go Back to dashboard
            </button>

          )
        }
                {
          token && actor==="therapist" && (
            <button onClick={() => navigate("/therapist_dashboard")} className=" rounded-[5px] bg-white py-1 px-4 text-[#023E8A] border-1 font-medium">
              Go Back to dashboard
            </button>

          )
        }
        
      </div>


    </header>
  );
}
