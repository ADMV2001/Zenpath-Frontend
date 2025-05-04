import { useEffect, useState } from "react";
import PatientAppointmentList from "../../components/patientAppointmentsList";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import PatientSidebar from "../../components/patientSideBar";
import NavBar from "../../components/navigationBar";
import PatientDashboardCards from "../../components/patientDashboardCards";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
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
      .get("http://localhost:3000/api/patient/get_dashboard_patient", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPatient(res.data))
      .catch((err) => {
        console.error("Fetch profile error:", err);
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading…</p></div>;
  }

  if (!patient) {
    return <div className="min-h-screen flex items-center justify-center"><p>Unable to load profile.</p></div>;
  }
  return (
     <>

     <NavBar isLogged={loggedIn} />

      <div className="flex w-full h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 "> 
      <PatientSidebar prop='Overview' />

        <div className="min-h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 w-500 px-10 py-8">
          <h1 className="text-3xl font-bold text-blue-900">Welcome Back, {patient.name || "Johnson"}</h1>
          <p className="text-gray-600 mb-6">Here's an overview of your practice today.</p>

          <PatientDashboardCards/>
          <PatientAppointmentList/>
        </div>
      </div>
    </>
 
  );
}