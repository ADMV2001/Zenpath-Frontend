import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientAppointmentList() {

    const [sessions, setSessions] = useState([])
    const [viewModel, setViewModel] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
      const token = localStorage.getItem("token");

      if(!token){
        navigate("/login");
        return;
      }

      axios.get("http://localhost:3000/api/session/get_upcoming_sessions", {
        headers : { Authorization : `Bearer ${token}` }
      }).then((res)=>{
        setSessions(res.data)
        console.log(res.data)
      }).catch((err)=>{
        console.error("Fetch profile error:", err);
        setSessions([])
      })
    },[])

    const startMeeting = (sessionId,roomName) => {
      console.log(roomName);

      const token = localStorage.getItem("token");
      if (!token) {
          navigate("/login");
          return;
      }
      axios.post("http://localhost:3000/api/session/updateSessionState",{sessionId,state:"Started"}, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
      .then((res) => {
          navigate(`/patient_session/${sessionId}`);
      })
      .catch((err) => {
          console.error("Error fetching events:", err);
          setLoading(false);
      });  
    }
  
    return (
      <div className="bg-white p-6 rounded-lg shadow mt-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Sessions</h2>
          
        </div>

      <div className="max-h-[250px] overflow-y-auto">
        {sessions.map((session, index) => (
          <div key={session._id || index} className="flex justify-between items-center mb-1 p-4 border border-gray-200 rounded-lg ">
            <div>
              <p className="font-medium text-gray-700">{session.therapistId?.name || "Therapist"}</p>
              <p className="text-sm text-gray-500">
                {session.sessionDate} • {session.sessionTime} ({session.sessionDuration}) • {session.sessionType}
              </p>
            </div>
            <div className="flex gap-30">
              {session.state === "Confirmed" && (
                <span className="w-[100px] bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm font-medium text-center">Confirmed</span>
              )}
              {session.state === "Pending" && (
                <span className="w-[100px] bg-yellow-100 text-yellow-700 px-3 py-2 rounded-full text-sm font-medium text-center">Pending</span>
              )}
              
              { session.state === "Started" && (
                <button className="bg-blue-800 text-white text-sm px-4 py-2 rounded-md hover:scale-105 transition"
                        onClick={() => {startMeeting(session._id,session.roomName)}}
                >Join</button>
              )}

              { session.state === "Confirmed" || session.state === "Pending" && (
                <button className="bg-blue-800 text-white text-sm px-4 py-2 rounded-md hover:scale-105 transition"
                onClick={() => navigate("/patient_appointments")}
                >View</button>
              )}
              
            </div>
          </div>
          
        ))}
         </div>

         
      </div>
    );
  }