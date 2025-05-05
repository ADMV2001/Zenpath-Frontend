import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Navigate, useNavigate } from "react-router-dom";

export default function PatientAdmin() {
  const [patients, setPatients] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/patient/get_all_patients")
      .then((res) => {
        setPatients(res.data);
      })
      .catch((err) => {
        console.error("Error fetching patients:", err);
      });
  }, []);

  function deletePatient(id){
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .delete(`http://localhost:3000/api/patient/delete_patient/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setPatients(patients.filter((patient) => patient._id !== id));
        toast.success("Patient deleted successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error deleting patient");
      });
  }

  return (
    <section className="w-full min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-blue-900 mb-1">Patients</h1>
      <p className="text-gray-600 mb-6">Here's an overview of your practice today.</p>

      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-blue-100 text-left text-sm text-blue-900 uppercase">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Mobile</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm text-gray-700 divide-y divide-gray-200">
          {patients.length === 0 ? (
            <tr>
              <td colSpan="2" className="px-6 py-4 text-center text-gray-500">No patients found.</td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr key={patient.id}>
                <td className="px-6 py-4">{patient.name}</td>
                <td className="px-6 py-4">{patient.email}</td>
                <td className="px-6 py-4">{patient.mobile}</td>
                <td className="px-6 py-4 ">
                  <RiDeleteBin6Line
                      className="inline-block text-lg text-gray-600 hover:text-red-600 cursor-pointer transition ml-[25px]"
                      onClick={() => deletePatient(patient._id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
