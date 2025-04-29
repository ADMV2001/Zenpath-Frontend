import { MdSpaceDashboard } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaUserMd } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import PendingRequests from "./pendingRequests";

export default function AdminPanel() {
  return (
    <>
    
    <div className="w-full h-screen flex font-[poppins]">
      {/* Sidebar */}
      <div className="w-[250px] h-full bg-[#0077B6] shadow-lg">
        <button className='w-full h-[60px] text-white text-[22px] font-bold flex justify-center items-center gap-2 border-b border-blue-300'>
          <MdSpaceDashboard />
          Dashboard
        </button>

        <Link to="/admin/requests" className='w-full h-[50px] text-white text-[18px] font-medium flex justify-center items-center gap-2 hover:bg-[#023E8A] transition'>
          <FaClipboardList />
          Requests
        </Link>

        <Link to="/admin/users" className='w-full h-[50px] text-white text-[18px] font-medium flex justify-center items-center gap-2 hover:bg-[#023E8A] transition'>
          <FaUserFriends />
          Users
        </Link>

        <Link to="/admin/therapists" className='w-full h-[50px] text-white text-[18px] font-medium flex justify-center items-center gap-2 hover:bg-[#023E8A] transition'>
          <FaUserMd />
          Therapists
        </Link>

    
      </div>

      {/* Main Content */}
      <div className="w-[calc(100vw-250px)] bg-blue-50 overflow-auto p-6">
        <Routes>
          <Route path="/requests" element={<PendingRequests />} />
        </Routes>
      </div>
    </div>
    </>
  );
}
