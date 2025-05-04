import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/navigationBar";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserDoctor } from "react-icons/fa6";
import { PiMedalBold } from "react-icons/pi";
import { FaFileLines } from "react-icons/fa6";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { MdPermContactCalendar } from "react-icons/md";


export default function TherapistOverview() {
  const { id } = useParams();
  const [loading, setLoading] = useState("loading");
  const [therapist, setTherapist] = useState({});
  const [activeTab, setActiveTab] = useState("about");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/therapist/getTherapist/${id}`)
      .then((res) => {
        setTherapist(res.data);
        setLoading("loaded");
      })
      .catch(() => setLoading("error"));
  }, [id]);

  function handleSessionRequest(therapistId) {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      toast.error("You must be logged in to send a session request.");
      return;
    }
    axios
      .post(
        "http://localhost:3000/api/session/request",
        { therapistId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        navigate("/session_requests");
        toast.success("Session request sent successfully!");
      })
      .catch((err) => {
        const msg =
          err.response?.data?.message || "Failed to send session request.";
        toast.error(msg);
      });
  }

  if (loading === "loading") return <div>Loading...</div>;
  if (loading === "error") return <div>Error loading therapist details.</div>;

  const {
    name,
    bio,
    email,
    phone,
    address,
    licenseNumber,
    licenseIssuingAuthority,
    licenseExpiry,
    certifications,
    specialties,
    experience,
    education,
    website,
    linkedinProfile,
    profilePicture,
    registeredAt,
  } = therapist;

  // Format specialties as an array if it's a comma-separated string
  const specialtiesList = specialties
    ? typeof specialties === "string"
      ? specialties.split(",").map((s) => s.trim())
      : specialties
    : [];

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 flex justify-center py-10">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header with green gradient and profile image */}
          <div className="w- relative bg-gradient-to-r from-blue-300 to-blue-700 h-36">
            <div className="absolute left-1/2 top-20 transform -translate-x-1/2">
              <img
                src={
                  profilePicture
                    ? `http://localhost:3000/${profilePicture.replace(/\\/g, "/")}`
                    : "/doc.png"
                }
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/doc.png";
                }}
                alt={name}
                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg bg-white"
              />
            </div>
          </div>
          {/* Main Info */}
          <div className="flex flex-col items-center mt-20 px-6 pb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dr. {name}</h1>
            <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold mt-2 mb-2">
              Licensed Therapist
            </span>
            <p className="text-gray-600 text-center max-w-xl mb-4">{bio}</p>
            {/* Contact, Website, LinkedIn Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 text-gray-700 font-medium"
                onClick={() => window.open(`mailto:${email}`, "_blank")}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M16 12H8m0 0l4-4m-4 4l4 4" /></svg>
                Contact
              </button>
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 text-gray-700 font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                  Website
                </a>
              )}
              {linkedinProfile && (
                <a
                  href={linkedinProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 text-gray-700 font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.38v4.59h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
                  LinkedIn
                </a>
              )}
            </div>
            {/* Tabs */}
            <div className="flex w-full mb-6">
              {["about", "credentials", "contact"].map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 py-2 text-sm font-semibold border-b-2 transition ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-700 bg-blue-50"
                      : "border-transparent text-gray-500 bg-transparent"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            {activeTab === "about" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Professional Background */}
                <div className="bg-gray-50 rounded-xl shadow p-5">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 ">
                    <span role="img" aria-label="Experience"><FaUserDoctor /></span> Professional Background
                  </h3>
                  <p className="text-gray-700 text-sm mb-1">
                    <span className="font-semibold">Experience:</span> {experience || "N/A"}
                  </p>
                  <p className="text-gray-700 text-sm mb-1">
                    <span className="font-semibold">Education:</span> {education || "N/A"}
                  </p>
                  <p className="text-gray-700 text-sm mb-1">
                    <span className="font-semibold">Member Since:</span>{" "}
                    {registeredAt ? new Date(registeredAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                {/* Specializations */}
                <div className="bg-gray-50 rounded-xl shadow p-5">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span role="img" aria-label="Specializations"><PiMedalBold /></span> Specializations
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {specialtiesList.length > 0
                      ? specialtiesList.map((spec, idx) => (
                          <span
                            key={idx}
                            className="bg-teal-50 text-teal-700 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {spec}
                          </span>
                        ))
                      : <span className="text-gray-700 text-sm">N/A</span>
                    }
                  </div>
                  <p className="text-gray-700 text-sm mb-1">
                    <span className="font-semibold">Certifications:</span> {certifications || "N/A"}
                  </p>
                </div>
              </div>
            )}
            {activeTab === "credentials" && (
              <div className="w-full bg-gray-50 rounded-xl shadow p-5">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span role="img" aria-label="Credentials"><FaFileLines /></span> Professional Credentials
                </h3>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">License :</span> {licenseNumber}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">Issuing Authority:</span> {licenseIssuingAuthority || "N/A"}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">License Expiry:</span>{" "}
                  {licenseExpiry ? new Date(licenseExpiry).toLocaleDateString() : "N/A"}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">Certifications:</span> {certifications || "N/A"}
                </p>
              </div>
            )}
            {activeTab === "contact" && (
              <div className="w-full bg-gray-50 rounded-xl shadow p-5">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span role="img" aria-label="Contact"><MdPermContactCalendar /></span> Contact
                </h3>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">Email:</span> {email}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">Phone:</span> {phone}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">Address:</span> {address || "N/A"}
                </p>
              </div>
            )}
            {/* Session Request Button */}
            <button
              className="mt-8 px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:from-teal-600 hover:to-emerald-600 transition w-full max-w-3xl"
              onClick={() => handleSessionRequest(therapist._id)}
            >
              Request a Session
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
