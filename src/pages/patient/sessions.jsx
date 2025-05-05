import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/navigationBar";
import { RiDeleteBin6Line } from "react-icons/ri";
import PatientSidebar from "../../components/patientSideBar";
import toast from "react-hot-toast";

export default function Sessions() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:3000/api/session/my-requests", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const deleteSession = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.delete(`http://localhost:3000/api/session/delete_session_request/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setRequests(requests.filter(req => req._id !== id));
        toast.success("Session request deleted successfully");
      })
      .catch(err => {
        console.error(err);
        toast.error("Error deleting session request");
      });
  };

  const statusBadge = (status) => {
    const colors = {
      Accepted: "bg-green-100 text-green-700",
      Rejected: "bg-red-100 text-red-700",
      Pending: "bg-yellow-100 text-yellow-700",
    };
    return (
      <span className={`px-3 py-1 text-sm rounded-full ${colors[status] || "bg-gray-100 text-gray-700"}`}>
        {status}
      </span>
    );
  };

  return (
    <>
      <NavBar />
      <div className="flex w-full h-screen bg-gray-50">
        <PatientSidebar prop="Requests" />

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold text-blue-800 text-[30px] mb-1">My Session Requests</h2>
            <span className="text-[15px] text-gray-400">Manage your requests send to the therapists.</span>

            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : requests.length === 0 ? (
              <p className="text-center text-gray-500">No session requests found.</p>
            ) : (
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Therapist</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr key={req._id} className="border-t border-gray-300 hover:bg-gray-50 transition">
                        <td className="px-4 py-3">{new Date(req.createdAt).toLocaleString()}</td>
                        <td className="px-4 py-3">{req.therapistId?.name ? `Dr. ${req.therapistId.name}` : "Unknown"}</td>
                        <td className="px-4 py-3">{statusBadge(req.status)}</td>
                        <td className="px-4 py-3 text-center">
                          <RiDeleteBin6Line
                            className="inline-block text-lg text-gray-600 hover:text-red-600 cursor-pointer transition"
                            onClick={() => deleteSession(req._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
