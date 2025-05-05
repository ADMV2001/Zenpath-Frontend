import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function TherapistAdmin() {
  
  const [therapists, setTherapists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      toast.error("You must be logged in to view this page.");
      return;
    }

    const fetchTherapists = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/therapist/approved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTherapists(res.data);
      } catch (err) {
        console.error("Error fetching therapists:", err);
        toast.error("Failed to load therapist list.");
      }
    };

    fetchTherapists();
  }, []);

  function deleteTherapist(id){
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .delete(`http://localhost:3000/api/therapist/delete_therapist/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setTherapists(therapists.filter((therapist) => therapist._id !== id));
        toast.success("Therapist deleted successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error deleting therapist");
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
          {therapists.length === 0 ? (
            <tr>
              <td colSpan="2" className="px-6 py-4 text-center text-gray-500">No patients found.</td>
            </tr>
          ) : (
            therapists.map((therapist) => (
              <tr key={therapist.id}>
                <td className="px-6 py-4">{therapist.name}</td>
                <td className="px-6 py-4">{therapist.email}</td>
                <td className="px-6 py-4">{therapist.phone}</td>
                <td className="px-6 py-4">
                  <RiDeleteBin6Line
                      className="inline-block text-lg text-gray-600 hover:text-red-600 cursor-pointer transition ml-[25px]"
                      onClick={() => deleteTherapist(therapist._id)}
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
