import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientAppointmentList() {

    const [sessions, setSessions] = useState([])
    const [viewModel, setViewModel] = useState(false)
    const [singleSession, setSingleSession] = useState(null);
    const [loading, setLoading] = useState(false)
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

    const handleViewClick = (sessionId) => {
        const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            setLoading(true);
            axios.post("http://localhost:3000/api/session/getSingleSession",{sessionId}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                setSingleSession(res.data);
                setViewModel(true);
                setLoading(false);
            })
            .catch(err => {
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
            <div className="flex gap-5">
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

              { (session.state === "Confirmed" || session.state === "Pending") && (
                <button className="bg-blue-800 text-white text-sm px-4 py-2 rounded-md hover:scale-105 transition"
                        onClick={()=>{handleViewClick(session._id)}}
                >View</button>
              )}
              
            </div>
          </div>
          
        ))}
         </div>

      {viewModel && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-4">
                          <h2 className="text-2xl font-bold text-blue-800">Session with Dr. {singleSession.therapistId.name}</h2>
                          <button
                            onClick={() => setViewModel(false)}
                            className="text-gray-400 hover:text-blue-800 hover:scale-120 transition cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                  
                        {/* Basic Details */} 
                        <div className="border-1 border-gray-300 rounded-md p-4 mb-4">    
                        <div>
                          <h3 className="text-lg font-semibold text-blue-800 mb-2">Patient Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-gray-700 text-sm">
                            <p><strong>Name:</strong> {singleSession.therapistId.name}</p>
                            <p><strong>Email:</strong> {singleSession.therapistId.email}</p>
                            </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-blue-800 mb-2 mt-2">Meeting Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-gray-700 text-sm">
                            <p><strong>Date:</strong></p> <p>{singleSession.sessionDate}</p>
                            <p><strong>Time:</strong></p> <p>{singleSession.sessionTime}</p>
                            <p><strong>Duration:</strong></p> <p>{singleSession.sessionDuration+" Minutes"}</p>
                        
                            <p><strong>Mode:</strong></p> <p>{singleSession.sessionType.charAt(0).toUpperCase() + singleSession.sessionType.slice(1)}</p>
                            <p><strong>Session State:</strong></p>
                            {singleSession.state === "Confirmed" ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium w-[100px]">
                           Confirmed
                          </span>
                        ) : singleSession.state === "Finished" ? (
                          <span className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm font-medium  w-[100px]">
                            Finished
                          </span>
                        ) : singleSession.state === "Started" ? (
                            <span className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-sm font-medium  w-[100px]">
                              Started
                            </span>
                          ) : (
                         <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium w-[100px]">
                            Pending
                          </span>
                        )}
                            
                            </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-blue-800 mb-2">Additional Notes</h3>
                          <p>{singleSession.sessionNote}</p>
                        </div>
                      </div>
                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4">

                          <button
                            className="transparentn text-blue-800 border border-blue-800 px-4 py-2 rounded-md hover:bg-blue-100 transition" onClick={() => setViewModel(false)}
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