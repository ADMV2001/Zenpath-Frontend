import { MdSpaceDashboard } from "react-icons/md";
import { FaUserFriends, FaClipboardList, FaUserMd } from "react-icons/fa";
import { Link, useLocation, Route, Routes, useNavigate } from "react-router-dom";
import PendingRequests from "./pendingRequests";
import PatientAdmin from "./adminPatients";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import TherapistAdmin from "./adminTherapists";

export default function AdminPanel() {
  const location = useLocation();
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token || role !== "admin") {
      navigate("/login");
      toast.error("Please login to get access!");
      return;
    }
  })

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/patient/get_all_patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Error fetching patients:", err));
  }, []);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/therapist/pending");
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching pending therapists:", err);
    }
  };

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

  const navLinks = [
    {
      label: "Requests",
      to: "/admin/requests",
      icon: <FaClipboardList size={20} />,
      count: requests.length,
    },
    {
      label: "Users",
      to: "/admin/users",
      icon: <FaUserFriends size={20} />,
      count: patients.length,
    },
    {
      label: "Therapists",
      to: "/admin/therapists",
      icon: <FaUserMd size={20} />,
      count: therapists.length,
    },
  ];

  function handleLogout(){
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Admin Logged out successfully.");
  }

  return (
    <div className="w-full h-screen flex font-[poppins] bg-gradient-to-tr from-blue-50 to-blue-100">
      {/* Sidebar */}
      <aside className="w-[260px] h-full bg-gradient-to-b from-[#0077B6] to-[#023E8A] shadow-2xl flex flex-col py-6 px-2">
        <div className="mb-8 flex items-center justify-center gap-2">
          <span className="text-white font-extrabold text-2xl tracking-wide">Admin Panel</span>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`flex items-center justify-between px-5 py-3 rounded-lg text-lg font-medium transition 
                ${
                  location.pathname === link.to
                    ? "bg-white/90 text-[#0077B6] shadow-md"
                    : "text-white hover:bg-white/10 hover:text-blue-200"
                }`}
            >
              <div className="flex items-center gap-3">
                {link.icon}
                <span>{link.label}</span>
              </div>
              {link.count > 0 && (
                <span className="bg-white text-[#0077B6] text-sm font-bold px-2 py-0.5 rounded-full shadow">
                  {link.count}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto mb-4 px-5">
          <button className="w-full py-2 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 transition"
                  onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#023E8A] tracking-tight">Welcome, Admin</h1>
            <p className="text-gray-500 mt-2">
              Manage requests, users, and therapists from your dashboard.
            </p>
          </div>

          <div className="bg-white/90 rounded-2xl shadow-lg p-8 min-h-[500px]">
            <Routes>
              <Route path="/requests" element={<PendingRequests />} />
              <Route path="/users" element={<PatientAdmin />} />
              <Route path="/therapists" element={<TherapistAdmin/>} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}
