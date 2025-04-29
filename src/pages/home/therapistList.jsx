import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navigationBar";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function TherapistList() {
  const [therapists, setTherapists] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      toast.error('You must be logged in to view this page.');
      return;
    }

    const fetchTherapists = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/therapist/approved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTherapists(res.data);
      } catch (err) {
        console.error("Error fetching therapists:", err);
        toast.error('Failed to load therapist list.');
      }
    };

    fetchTherapists();
  }, []);

  if (error) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-800 font-semibold font-[Poppins]">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <p>{error}</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Go to Login
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-r from-white to-blue-100 p-6 font-[Poppins]">
        <h2 className="text-3xl font-semibold text-center text-black mb-8">Meet Our Therapists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {therapists.map((therapist) => (
            <div
              key={therapist._id}
              className="bg-white rounded-lg shadow-lg p-5 flex flex-col items-center text-center"
            >
             <img
              src={
                therapist.profilePicture
                  ? `http://localhost:5000/${therapist.profilePicture.replace(/\\/g, "/")}`
                  : "/doc.png"
              }
              onError={e => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/doc.png";
              }}
              alt="Therapist"
              className="w-28 h-28 object-contain rounded-full border border-gray-300 mb-4"
            />
              <h3 className="text-xl font-semibold text-[#0077B6]">Dr. {therapist.name}</h3>
              <p className="text-gray-700 text-[13px] font-semibold">{therapist.specialties || "Not Provided"}</p>
              <p className="text-gray-700 text-[13px]"><span>Experience :</span>{therapist.experience || "Not Provided"} years</p>
              
              <button className="p-2 bg-blue-100 rounded-md text-[14px] text-blue-800 mt-[10px] cursor-pointer hover:scale-105">View Therapist</button>
            </div> 
          ))}
          
        </div>
        
      </div>
      <Footer />
    </>
  );
}
