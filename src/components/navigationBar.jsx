import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";  // Import icons for menu toggle

export default function NavBar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);  // Toggle state for mobile menu

  return (
    <header className="relative w-full h-[70px] flex items-center justify-between md:px-10 lg:px-16 font-[poppins] sticky top-0 bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 z-50">
      {/* Left Side - Logo */}
      <div className="flex items-center">
        <img src="/logo.png" alt="logo" className="w-[50px] h-[50px] object-cover ml-2 md:ml-10 lg:ml-20 xl:ml-28" />
        <h1 className="ml-2 font-bold text-[22px] md:text-[25px] text-[#023E8A]">ZenPath</h1>
      </div>


      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-6">
        <Link to="/home" className=" text-[16px] text-[#0077B6] hover:text-[#03045E] hover:scale-110 transition duration-400 ease-in-out">Home</Link>
        <Link to="/about" className=" text-[16px] text-[#0077B6] hover:text-[#03045E] hover:scale-110 transition duration-400 ease-in-out">About Us</Link>
        <Link to="/contact" className=" text-[16px] text-[#0077B6] hover:text-[#03045E] hover:scale-110 transition duration-400 ease-in-out">Contact</Link>
        <Link to="/history" className=" text-[16px] text-[#0077B6] hover:text-[#03045E] hover:scale-110 transition duration-400 ease-in-out">History</Link>
        <Link to="/profile" className=" text-[16px] text-[#0077B6] hover:text-[#03045E] hover:scale-110 transition duration-400 ease-in-out">Profile</Link>
      </nav>

      {/* Right Side - Buttons */}
      <div className="hidden md:flex items-center gap-4 mr-27">
        <button onClick={() => navigate("/login")} className="rounded-[5px] bg-white py-1 px-4 text-[#023E8A] border-1 font-medium">
          Login
        </button>
        <button
          onClick={() => navigate("/therapist_list")}
          className="bg-[#0077B6] px-4 py-1 rounded-[5px] text-white font-semibold hover:bg-[#005f99]"
          >
             Find your Therapist
          </button>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-[#0077B6] text-2xl absolute right-[15px]" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white shadow-md flex flex-col items-center py-4 md:hidden">
          <Link to="/home" className="py-2 text-[#0077B6] font-semibold">Home</Link>
          <Link to="/treatments" className="py-2 text-[#0077B6] font-semibold">Treatments</Link>
          <Link to="/about" className="py-2 text-[#0077B6] font-semibold">About Us</Link>
          <Link to="/contact" className="py-2 text-[#0077B6] font-semibold">Contact</Link>
          <Link to="/resources" className="py-2 text-[#0077B6] font-semibold">Resources</Link>
          <button onClick={() => navigate("/login")} className="mt-3 rounded-[5px] bg-blue-300 py-1 px-6 text-[#023E8A] font-medium">
            Login
          </button>
          <button
          onClick={() => navigate("/therapist_list")}
          className="bg-[#0077B6] px-4 py-1 rounded-[5px] text-white font-semibold hover:bg-[#005f99]"
          >
             Find your Therapist
          </button>

        </div>
      )}
    </header>
  );
}
