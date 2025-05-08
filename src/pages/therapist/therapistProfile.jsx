import { useEffect, useState } from "react";
import TherapistNavBar from "../../components/navigationBarTherapist";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TherapistProfile() {
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

        axios.get("http://localhost:3000/api/therapist/me", {
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
        <div className="min-h-screen bg-[#FDFEFE]">
      <TherapistNavBar isLogged={loggedIn} />
      <div className="flex">
      <div className="w-[205px]">

        <Sidebar prop="Profile" />
        </div>
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-semibold text-blue-800 mb-4">
              Therapist Profile
            </h1>
            <div className="flex items-center mb-6">
              <img
                src="/therapist_profile.png"
                alt="Therapist"
                className="w-32 h-32 rounded-full object-cover mr-6"
              />
              <div>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">Full Name:</span> {therapist.name}
                </p>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">Email:</span> {therapist.email}
                </p>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">Phone:</span> {therapist.phone}
                </p>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">Address:</span> {therapist.address}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Provable Document Details */}
              <div className="bg-blue-50 bg-opacity-20 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">
                  Provable Document Details
                </h2>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">License Number:</span> {therapist.licenseNumber}
                </p>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">Issuing Authority:</span> {therapist.licenseIssuingAuthority}
                </p>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">Expiry Date:</span> {therapist.licenseExpiry.slice(0, 10)}
                </p>
              </div>

              {/* Certificates and Education */}
              <div className="bg-blue-50 bg-opacity-20 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">
                  Certificates and Education
                </h2>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">Certifications:</span> {therapist.certifications}
                </p>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">Specialties:</span> {therapist.specialties}
                </p>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">Experience:</span> {therapist.experience}
                </p>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">Education:</span> {therapist.education}
                </p>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">Bio:</span> {therapist.bio}
                </p>
              </div>

              {/* Social */}
              <div className="bg-blue-50 bg-opacity-20 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">Social</h2>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">Website:</span>{" "}
                  {therapist.website ? (
                    <a
                      href={therapist.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2471A3] hover:underline"
                    >
                      {therapist.website}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">LinkedIn:</span>{" "}
                  {therapist.linkedin ? (
                    <a
                      href={therapist.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2471A3] hover:underline"
                    >
                      View Profile
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>

              {/* Status */}
              <div className="bg-blue-50 bg-opacity-20 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">Status</h2>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">Account Status:</span>{" "}
                  <span className={`inline-block px-2 py-1 rounded ${
                    therapist.isApproved ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {therapist.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </p>
                <p className="text-[#2C3E50]">
                  <span className="font-semibold">Registered Date:</span>{" "}
                  {therapist.registeredAt.slice(0, 10)}
                </p>
                <div className="mt-2">
                  <label className="block text-[#2C3E50] font-semibold mb-1">
                    Add Profile Picture:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-[#2C3E50] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#F4D03F] file:text-[#2C3E50] hover:file:bg-[#F7DC6F]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
