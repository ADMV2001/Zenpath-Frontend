// src/components/Sidebar.jsx
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
PlusIcon
 
} from "@heroicons/react/24/outline";

const menuItems = [
  { name: "Overview", icon: HomeIcon, path: "/therapist_dashboard" },
  { name: "Patients", icon: UsersIcon, path: "/patients" },
  { name: "Patient Requests", icon: PlusIcon, path: "/patient_requests" },

  { name: "Appointments", icon: CalendarIcon, path: "/appointments",badge: 5 },
  { name: "Messages", icon: ChatBubbleBottomCenterTextIcon, path: "/messages", badge: 5 },
  { name: "Profile", icon: Cog6ToothIcon, path: "/therapistProfile" },
];

export default function Sidebar(prop) {
  const navigate = useNavigate();

  return (
    <div className=" max-w-md h-screen bg-white  p-6 flex flex-col border-1 border-gray-200 ">
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
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="flex flat-bottom p-3 rounded-md cursor-pointer hover:bg-red-100 transition"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-red-600" />
              <span className="text-red-700 font-medium">Logout</span>
            </div>

            </nav>
          </div>


    </div>
  );
}