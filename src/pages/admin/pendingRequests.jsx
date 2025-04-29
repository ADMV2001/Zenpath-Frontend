import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/therapist/pending");
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching pending therapists:", err);
    }
  };

  const handleReview = (therapist) => {
    setSelectedTherapist(therapist);
    setShowModal(true);
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/therapist/approve/${id}`);
      toast.success("Therapist approved successfully!");
      setShowModal(false);
      fetchPending();
    } catch (err) {
      console.error("Approval failed:", err);
      toast.error("Failed to approve therapist.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/therapist/reject/${id}`);
      toast.success("Therapist Rejected!");
      setShowModal(false);
      fetchPending();
    } catch (err) {
      console.error("Rejection failed:", err);
      toast.error("Failed to reject therapist.");
    }
  };

  return (
    <div className="font-[poppins]">
      <h1 className="text-2xl font-bold mb-4 text-[#03045E]">Pending Therapist Requests</h1>

      <table className="w-full bg-white rounded-lg shadow-lg">
        <thead className="bg-blue-200">
          <tr>
            <th className="py-2 px-4 text-left">Request ID</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((therapist) => (
            <tr key={therapist._id} className="border-b">
              <td className="py-2 px-4">{therapist._id}</td>
              <td className="py-2 px-4">{new Date(therapist.registeredAt).toLocaleDateString()}</td>
              <td className="py-2 px-4 text-yellow-600 font-semibold">Pending</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleReview(therapist)}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-800"
                >
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Modal */}
      {showModal && selectedTherapist && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-800">Therapist Details</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-red-500 text-lg font-bold">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-800">
              <p><strong>Name:</strong> {selectedTherapist.name}</p>
              <p><strong>Email:</strong> {selectedTherapist.email}</p>
              <p><strong>Phone:</strong> {selectedTherapist.phone}</p>
              <p><strong>Address:</strong> {selectedTherapist.address}</p>
              <p><strong>Specialties:</strong> {selectedTherapist.specialties}</p>
              <p><strong>Experience:</strong> {selectedTherapist.experience} years</p>
              <p><strong>Education:</strong> {selectedTherapist.education}</p>
              <p><strong>Certifications:</strong> {selectedTherapist.certifications}</p>
              <p><strong>Website:</strong> <a href={selectedTherapist.website} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a></p>
              <p><strong>LinkedIn:</strong> <a href={selectedTherapist.linkedinProfile} target="_blank" rel="noreferrer" className="text-blue-600 underline">Profile</a></p>
              <p className="col-span-2"><strong>Bio:</strong> {selectedTherapist.bio}</p>
              <p><strong>License Number:</strong> {selectedTherapist.licenseNumber}</p>
              <p><strong>Issued By:</strong> {selectedTherapist.licenseIssuingAuthority}</p>
              <p><strong>Expiry Date:</strong> {new Date(selectedTherapist.licenseExpiry).toLocaleDateString()}</p>
            </div>

            {/* Documents Section */}
<div className="mt-6">
  <h4 className="font-semibold text-gray-800 mb-2">Documents:</h4>
  <ul className="text-blue-700 list-disc pl-6 space-y-2 text-sm">
    {selectedTherapist.cvOrResumeUrl && (
      <li>
        CV/Resume:
        <a
          href={`http://localhost:5000/${selectedTherapist.cvOrResumeUrl}`}
          target="_blank"
          rel="noreferrer"
          className="ml-2 underline"
        >
          View
        </a>{" "}
        |
        <a
          href={`http://localhost:5000/${selectedTherapist.cvOrResumeUrl}`}
          download
          className="ml-2 underline text-green-700"
        >
          Download
        </a>
      </li>
    )}
    {selectedTherapist.licenseDocument && (
      <li>
        License Document:
        <a
          href={`http://localhost:5000/${selectedTherapist.licenseDocument}`}
          target="_blank"
          rel="noreferrer"
          className="ml-2 underline"
        >
          View
        </a>{" "}
        |
        <a
          href={`http://localhost:5000/${selectedTherapist.licenseDocument}`}
          download
          className="ml-2 underline text-green-700"
        >
          Download
        </a>
      </li>
    )}
    
  </ul>
</div>


            {/* Actions */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleReject}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={() => handleApprove(selectedTherapist._id)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
