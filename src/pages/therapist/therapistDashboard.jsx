import { useEffect, useState } from "react";
import TherapistNavBar from "../../components/navigationBarTherapist";
import DashboardCards from "../../components/DashboardCards";
import AppointmentList from "../../components/AppointmentList";
import Sidebar from "../../components/Sidebar";    

import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function TherapistDashboard() {
  const navigate = useNavigate();
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [prevSession, setPrevSession] = useState({});
  const [isprevSession, setIsPrevSession] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    } else {
      setLoggedIn(true);
    }

    axios
      .get("http://localhost:3000/api/therapist/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {setTherapist(res.data)
        axios.get("http://localhost:3000/api/session/prevSessions",{headers: { Authorization: `Bearer ${token}` }})
        .then((res)=>{
            setPrevSession(res.data.sessions);
            setIsPrevSession(res.data.isprevSession);
            console.log(res.data.sessions);
            console.log(res.data.isprevSession);
        }).catch((err)=>{
            console.error("Fetch session error:", err);
        }
        )

      })
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
    const FinishMeetingState = (sessionId) => {
        const token = localStorage.getItem("token");
        axios
        .post(
            "http://localhost:3000/api/session/finishSession",
            { sessionId },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
            setIsPrevSession(false);
        })
        .catch((err) => {
            console.error("Error finishing session:", err);
            setIsPrevSession(false);
        }
        );
    };
  return (
     <>

        <TherapistNavBar isLogged={loggedIn} />
        

      <div className="flex w-full h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 "> 
      <Sidebar prop='Overview' />

        <div className="min-h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 w-500 px-10 py-8">
          <h1 className="text-3xl font-bold text-blue-900">Welcome back, Dr. {therapist.name || "Johnson"}</h1>
          <p className="text-gray-600 mb-6">Here's an overview of your practice today.</p>

          <DashboardCards />
          <AppointmentList />
        </div>
      </div>
        
      {isprevSession && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl max-w-[600px] h-[250px] p-8 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-2 text-center">
            We found an unfinished meeting session.
            </h2>
            <p className="text-gray-600 mb-6 text-center mt-6">
            Was the previous session with {prevSession.userId.name} on {prevSession.sessionDate} at {prevSession.sessionTime} completed?
                        </p>
            <div className="flex w-full gap-4 mt-6">
            <button
                className="flex-1 py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
            onClick={() => FinishMeetingState(prevSession._id)}
            >
                Yes, It is Finished
                </button>
                <button
                className="flex-1 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition cursor-pointer"
                onClick={() => {
                    navigate(`/session/${prevSession._id}`);
                }}
             >
                No, Go Back to the Meeting
                    </button>
                </div>
                </div>
            </div>
            )}
    </>
 
  );
}