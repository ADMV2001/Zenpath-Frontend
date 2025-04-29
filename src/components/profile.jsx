import React from "react";
import NavBar from "./navigationBar";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const name = user?.name || "Not available";
  const email = user?.email || "Not available";
  const mobile = user?.mobile || "Not provided";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleHistory = () => {
    navigate("/history");
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-r from-white to-blue-100 flex items-center justify-center px-4 py-12 font-[Poppins]">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-4xl text-gray-500 mb-6">
            👤
          </div>

          <h2 className="text-2xl font-semibold text-[#03045E] mb-6">Your Profile</h2>

          <div className="text-left text-gray-700 space-y-3">
            <p><span className="font-medium">Name:</span> {name}</p>
            <p><span className="font-medium">Email:</span> {email}</p>
            <p><span className="font-medium">Mobile:</span> {mobile}</p>
          </div>

          <div className="flex justify-between mt-10">
            <button
              onClick={handleHistory}
              className="w-[48%] py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              History
            </button>
            <button
              onClick={handleLogout}
              className="w-[48%] py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
