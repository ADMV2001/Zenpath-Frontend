import { useEffect, useState } from "react";
import NavBar from "../../components/navigationBar";
import PatientSidebar from "../../components/patientSideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PatientProfile() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/api/patient/get_dashboard_patient", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPatient(res.data);

        if (res.data.name) {
          const [first = "", ...rest] = res.data.name.split(" ");
          setFirstName(first);
          setLastName(rest.join(" "));
        }
        setEmail(res.data.email || "");
        setMobile(res.data.mobile || "");
      })
      .catch((err) => {
        console.error("Fetch profile error:", err);
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading…</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Unable to load profile.</p>
      </div>
    );
  }

  async function handleUpdateProfile() {

  const token = localStorage.getItem("token");

  try {
    const res = await axios.put(
      "http://localhost:3000/api/patient/update_patient",
      {
        name: firstName + " " + lastName,
        mobile,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success(res.data.message || "Profile updated!");

    setPatient((prev) => ({ ...prev, name: firstName + " " + lastName, mobile }));
  } catch (err) {
    toast.error(err.response?.data?.message || "Error updating profile.");
  }
}

async function handleChangePassword() {
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        "http://localhost:3000/api/patient/change_patient_password",
        {
          currentPassword,
          newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Password updated!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating password.");
    }
  }

  return (
    <>
      <NavBar />
      <div className="flex w-full min-h-screen bg-gray-50 border-b border-gray-200">
        <PatientSidebar prop="profile" />
        <div className="flex-1 px-8 py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-1 text-blue-800">Settings</h1>
            <p className="text-gray-500 mb-6">Manage your account and preferences.</p>

            {/* Tabs */}
            <div className="flex border-b border-gray-300 mb-6 bg-[#fafafa]  overflow-hidden">
              <button
                className={`px-8 py-2 font-semibold  focus:outline-none ${
                  activeTab === "profile"
                    ? "bg-blue-100 border-gray-100 text-black"
                    : "bg-white text-gray-500"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
              <button
                className={`px-8 py-3 font-semibold  focus:outline-none ${
                  activeTab === "security"
                    ? "bg-gray-100 border-gray-200 text-black"
                    : "bg-white text-gray-500"
                }`}
                onClick={() => setActiveTab("security")}
              >
                Security
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow p-8">
              {activeTab === "profile" && (
                <>
                  <h2 className="text-xl font-bold mb-1 ">Personal Information</h2>
                  <p className="text-gray-500 mb-6">Update your personal details.</p>
                  <form className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-1">First Name</label>
                        <input
                          type="text"
                          className="w-full border-1 rounded-md px-4 py-2 border-gray-300 text-gray-600"
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                        <input
                          type="text"
                          className="w-full border-1 rounded-lg px-4 py-2 border-gray-300 text-gray-600"
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full border-1 rounded-lg px-4 py-2 border-gray-300 text-gray-600"
                        value={email}
                        readOnly
                      />
                      <span className={`inline-block mt-1 ml-0 px-2 py-1 rounded text-xs font-semibold ${patient.emailVerified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {patient.emailVerified ? "Verified" : "Not Verified"}
                      </span>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Phone</label>
                      <input
                        type="text"
                        className="w-full border-1 rounded-lg px-4 py-2 border-gray-300 text-gray-600"
                        value={mobile}
                        onChange={e => setMobile(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="mt-2 px-6 py-2 bg-blue-800 cursor-pointer text-white rounded hover:bg-gray-800 font-semibold"
                      onClick={handleUpdateProfile}
                    >
                      Save Changes
                    </button>
                  </form>
                </>
              )}

              {activeTab === "security" && (
                <>
                  <h2 className="text-xl font-bold mb-1">Change Password</h2>
                  <p className="text-gray-500 mb-6">Update your password to keep your account secure.</p>
                  <form className="space-y-6 max-w-4xl">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Current Password</label>
                      <input
                        type="password"
                        className="w-full border-1 border-gray-300 rounded-lg px-4 py-2 text-gray-600"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">New Password</label>
                      <input
                        type="password"
                        className="w-full border-1 border-gray-300 rounded-lg px-4 py-2"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full border-1 border-gray-300 rounded-lg px-4 py-2"
                        value={confirmNewPassword}
                        onChange={e => setConfirmNewPassword(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="mt-2 px-6 py-2 bg-blue-800 cursor-pointer text-white rounded hover:bg-gray-800 font-semibold"
                      onClick={handleChangePassword} 
                    >
                      Update Password
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
