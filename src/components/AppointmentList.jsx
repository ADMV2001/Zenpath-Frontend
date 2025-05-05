import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [viewReqModel, setViewReqModel] = useState(false);
  const [singleSession, setSingleSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const nav = useNavigate();
  

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await axios.get("http://localhost:3000/api/session/getReccentSessions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched appointments:", response.data);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);
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
            setViewReqModel(true);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching events:", err);
            setLoading(false);
        });
    
  }
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
    .then(res => {
        nav(`/session/${sessionId}`);
    })
    .catch(err => {
        console.error("Error fetching events:", err);
        setLoading(false);
    });


    
  }

  
    return (
      <div className="bg-white p-6 rounded-lg shadow mt-20 max-h-[250px] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>

          {
            appointments ? (
              <p className="text-gray-500 text-sm">You have {appointments.length} upcoming sessions scheduled.</p>
            ) : (
              <p className="text-gray-500 text-sm">No upcoming sessions scheduled.</p>
            )
          }
        </div>
        {
  appointments && appointments.length > 0 ? (
    appointments.map((apt, index) => (
      <div key={index} className="flex justify-between items-center mb-1 p-4 border border-gray-200 rounded-lg">
        <div>
          <p className="font-medium text-gray-700">
            {apt.sessionType + " Session with " + apt.userId.name}
          </p>
          <p className="text-sm text-gray-500">
            {apt.sessiondate} • {apt.sessionTime} ({apt.sessionDuration}) • {apt.sessionType}
          </p>
        </div>
        <div className="flex gap-2">
          {apt.state === "Confirmed" ? (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Confirmed
            </span>
          ) : (
            <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              Started
            </span>
          )}
          <button className="bg-blue-800 text-white text-sm px-4 py-2 rounded hover:scale-105 transition" onClick={()=>{handleViewClick(apt._id)}}>
            View
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-sm">No upcoming sessions scheduled.</p>
  )
}


                {/* Session Model View */}
                {viewReqModel && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-4">
                          <h2 className="text-2xl font-bold text-blue-800">Session with {singleSession.userId.name}</h2>
                          <button
                            onClick={() => setViewReqModel(false)}
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
                            <p><strong>Name:</strong> {singleSession.userId.name}</p>
                            <p><strong>Email:</strong> {singleSession.userId.email}</p>
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
                            className="transparentn text-blue-800 border border-blue-800 px-4 py-2 rounded-md hover:bg-blue-100 transition" onClick={() => setViewReqModel(false)}
                          >
                            Cancel
                          </button>

                          {singleSession.state === "Confirmed" && singleSession.sessionType === "online" && (
                          <button
                            className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={() => {startMeeting(singleSession._id,singleSession.roomName)}}
                          >
                            Start Session

                          </button>
                          )}
                          {singleSession.state === "Started" && (
                            <button
                            className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={() => {startMeeting(singleSession._id,singleSession.roomName)}}
                          >
                            Join Session

                          </button>
                          )}
                        </div>
                      </div>
                    </div>
                )}
        
      </div>
    );
  }