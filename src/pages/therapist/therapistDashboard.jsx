import { useEffect, useState } from "react";
import TherapistNavBar from "../../components/navigationBarTherapist";
import DashboardCards from "../../components/DashboardCards";
import AppointmentList from "../../components/AppointmentList";
import Sidebar from "../../components/Sidebar";    

import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function TherapistDashboard() {
  const navigate = useNavigate();
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    } else {
      setLoggedIn(true);
    }

    axios
      .get("http://localhost:3000/api/therapist/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTherapist(res.data))
      .catch((err) => {
        console.error("Fetch profile error:", err);
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading…</p></div>;
  }

  if (!therapist) {
    return <div className="min-h-screen flex items-center justify-center"><p>Unable to load profile.</p></div>;
  }
  return (
     <>

        <TherapistNavBar isLogged={loggedIn} />

      <div className="flex w-full h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 "> 
      <Sidebar/>

        <div className="min-h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 w-500 px-10 py-8">
          <h1 className="text-3xl font-bold text-blue-900">Welcome back, Dr. {therapist.name || "Johnson"}</h1>
          <p className="text-gray-600 mb-6">Here's an overview of your practice today.</p>

          <DashboardCards />
          <AppointmentList />
        </div>
      </div>
    </>
 
  );
}