// src/components/Sidebar.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
PlusIcon
 
} from "@heroicons/react/24/outline";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";

const menuItems = [
  { name: "Overview", icon: HomeIcon, path: "/patient_dashboard" },
  { name: "Sessions", icon: CalendarIcon, path: "/patient_appointments",badge: 5 },

  { name: "Requests", icon: VscGitPullRequestNewChanges, path: "/session_requests" },
  { name: "profile", icon: Cog6ToothIcon, path: "/patient_profile" },
  { name: "Messages", icon: ChatBubbleBottomCenterTextIcon, path: "/patient_messages", badge: 5 },
];

export default function PatientSidebar(prop) {
  const navigate = useNavigate();

  const [logoutModel, setLogoutModel] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login") 
  }

  return (
    <div className="max-w-md h-screen bg-white  p-6 flex flex-col border-1 border-gray-200 ">
      {/* Logo */}
      

      <div className="">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 inline-block">ZenPath </h2>
          <p className="text-sm text-gray-400">Mental Health Platform</p>
        </div>

        {/* Menu */}
        <nav className="space-y-3">
          {menuItems.map((item) => (
            
            <div
              key={item.name}
              onClick={() => navigate(item.path)}

              className={`flex items-center p-3 rounded-md cursor-pointer hover:bg-blue-100 transition ${prop.prop === item.name ? 'bg-blue-100' : ''}`}            >
              <item.icon className="h-5 w-5 mr-3 text-blue-600" />
              <span className="text-gray-700 font-medium">{item.name}</span>
              {item.badge && (
                <span className="ml-auto bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
          
          {/* Logout */}
            <div
              className="flex flat-bottom p-3 rounded-md cursor-pointer hover:bg-red-100 transition"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-red-600" />
              <span className="text-red-600 font-medium" onClick={()=>{
                setLogoutModel(true);
              }}>Logout</span>
            </div>

            </nav>
          </div>

          {logoutModel && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-[400px] max-w-md p-8 flex flex-col items-center">
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Are you logging out?</h2>
                <p className="text-gray-600 mb-6 text-center">
                    You can always log back in at any time.
                </p>
                <div className="flex w-full gap-4">
                    <button
                    className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    onClick={handleLogout}
                    >
                    Logout
                    </button>
                    <button
                    className="flex-1 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
                    onClick={() => setLogoutModel(false)}
                    >
                    Cancel
                    </button>
                </div>
                </div>
            </div>
            )}




    </div>
  );
}