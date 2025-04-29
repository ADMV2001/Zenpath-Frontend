import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navigationBar";

export default function Sessions() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:5000/api/session/my-requests", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setRequests(res.data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <NavBar />
      <div className="max-w-3xl mx-auto mt-8 bg-white rounded shadow p-6 font-[Poppins]">
        <h2 className="text-2xl font-semibold mb-4">Session Requests</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Therapist</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">No session requests found.</td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req._id} className="hover:bg-blue-50">
                    <td className="p-2 border">
                      {new Date(req.createdAt).toLocaleString()}
                    </td>
                    <td className="p-2 border">
                      Dr. {req.therapistId?.name || "Unknown"}
                    </td>
                    <td className="p-2 border">
                      {req.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
