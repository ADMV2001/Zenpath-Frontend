import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/navigationBar";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function TherapistOverview(){
    
    const {id} = useParams()

    const [loading, setLoading] = useState("loading")
    const [therapist, setTherapist] = useState({})

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/therapist/getTherapist/${id}`).then((res)=>{
            console.log(res.data)
            setTherapist(res.data)
            setLoading("loaded")
        }).catch((err)=>{
            setLoading("error")
        })
    },[id])

    function handleSessionRequest(therapistId) {
        const token = localStorage.getItem("token");
        
        if (!token) {
          navigate("/login");
          toast.error("You must be logged in to send a session request.");
          return;
        }

        axios.post("http://localhost:5000/api/session/request",
          { therapistId },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(res => {
          navigate("/session_requests")
          toast.success("Session request sent successfully!")
        })
        .catch(err => {
            const msg = err.response?.data?.message || "Failed to send session request.";
            toast.error(msg);
        });
      }

    return(
        <>
      <NavBar />
      {loading === "loading" && <div>Loading...</div>}
      {loading === "error" && <div>Error loading therapist details.</div>}
      {loading === "loaded" && (
        <div className="w-full h-screen bg-blue-200">
        <img
            src={
                therapist.profilePicture
                ? `http://localhost:5000/${therapist.profilePicture.replace(/\\/g, "/")}`
                : "/doc.png"
            }
            onError={e => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/doc.png";
            }}
            alt="Therapist"
            className="w-28 h-28 object-contain rounded-full border border-gray-300 mb-4"
        />

          <h1 className="text-2xl font-bold">{therapist.name}</h1>
          <p>{therapist.description}</p>
          <p>{therapist.email}</p>
          <p>{therapist.phone}</p>
          <button className="p-2 rounded-md bg-blue-300 cursor-pointer text-blue-700"
            onClick={()=>{
                handleSessionRequest(therapist._id)
            }}
          >Request a Session</button>

        </div>
      )}
    </>
    )
}