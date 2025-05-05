import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TherapistNavBar from "../../components/navigationBarTherapist";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";

export default function PatientRequests(){

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [requests, setRequests] = useState([])
    const [reqCount, setReqCount] = useState(0)
    const [modelOpen, setModelOpen] = useState(false)
    const [patientDetails, setPatientDetails] = useState({})
    const [patientReq, setPatientReq] = useState({})

    useEffect(()=>{
        const token = localStorage.getItem("token")
        
        if(!token){
            navigate("/login")
            return
        }
        setLoading(true)

        axios.get("http://localhost:3000/api/session/therapist-requests", {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res)=>{
            setRequests(res.data)
            setLoading(false)
            setReqCount(res.data.length)
        }).catch((err)=>{
            console.error(err)
            setLoading(false)
        })   
    },[]);

    function handleApproval(request_id){
        const token = localStorage.getItem("token")
        
        if(!token){
            navigate("/login")
            return
        }

        axios.post(`http://localhost:3000/api/session/approve/`, {requestId:request_id}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res)=>{
            setRequests(requests.filter((request)=>request._id !== request_id))
            setReqCount(reqCount-1)
            toast.success("Request Approved!")
        }).catch((err)=>{
            console.error(err)
            toast.error("Error approving request.")
        })
    }

    function handleReject(request_id){
        const token = localStorage.getItem("token")
        
        if(!token){
            navigate("/login")
            return
        }

        axios.post(`http://localhost:3000/api/session/reject/`, {requestId:request_id}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res)=>{
            setRequests(requests.filter((request)=>request._id !== request_id))
            setReqCount(reqCount-1)
            toast.success("Request Declined!")
        }).catch((err)=>{
            console.error(err)
            toast.error("Error Declining request.")
        })
    }

    function handleView(request_id, userId){
        const token = localStorage.getItem("token")
        
        if(!token){
            navigate("/login")
            return
        }
        setLoading(true)

        axios.post(`http://localhost:3000/api/patient/get_patient`, {userId:userId}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res)=>{
            console.log(res)
            setModelOpen(true)
            setPatientDetails(res.data)
            setPatientReq(request_id)
            setLoading(false)
            
        }).catch((err)=>{
            console.error(err)
            
        })


    }

    return(
        <>
            <TherapistNavBar/>
            <div className="flex w-full h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 "> 
            <Sidebar prop='Patient Requests'/>
            <div className="min-h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 w-500 px-10 py-8">
            <h1 className="text-3xl font-bold text-blue-900">Patient Requests</h1>
            <p className="text-gray-600 mb-6 mt-2">you have <span className="text-xl text-blue-800 font-semibold" >{reqCount} </span>New patient Requests</p>
            <div className="bg-white p-6 rounded-lg shadow mt-10 h-[600px]">
            <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-semibold text-gray-800">Patient Requests</h2>
            </div>
         <div className="overflow-y-auto max-h-[500px]">
         {loading && (<p className="text-center text-blue-800 text-lg">Loading...</p>)}
    
    {requests.length > 0 && (
      requests.map((request, index) => (
        <div key={index} className="flex justify-between items-center mb-1 p-4 border border-gray-200 rounded-lg ">
          <div>
            
            <p className="font-medium text-gray-700">{request.userId?.name}</p>
            <p className="text-sm text-gray-500">{request.createdAt.slice(0, 10)}</p>
          </div>
          <div className="flex gap-2">
           
            <button className="bg-blue-800 text-white text-sm px-4 py-2 rounded  cursor-pointer hover:scale-105  transition" onClick={()=>{handleView(request._id,request.userId)}}>View</button>
          </div>
        </div>
      ))
    )}
    {requests.length === 0 && (
        <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">No requests available.</p>
            </div>
    )}
      </div>
    </div>
                      </div>
                      
                    </div>
                    
                        {modelOpen && (
                            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                              <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl space-y-6">
                                {/* Header */}
                                <div className="flex items-center justify-between pb-4">
                                  <h2 className="text-2xl font-bold text-blue-800">Patient Details</h2>
                                  <button
                                    onClick={() => setModelOpen(false)}
                                    className="text-gray-400 hover:text-blue-800 hover:scale-120 transition cursor-pointer"
                                  >
                                    ✕
                                  </button>
                                </div>
                          
                                {/* Basic Details */} 
                                <div className="border-1 border-gray-300 rounded-md p-4 mb-4">    
                                {/* Basic Details */}
                                {patientDetails.basicInfo ? (
                                <div>    
                                    <div>
                                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Basic Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-gray-700 text-sm">
                                        <p><strong>Name:</strong> {patientDetails.basicInfo.name}</p>
                                        <p><strong>Email:</strong> {patientDetails.basicInfo.email}</p>
                                        <p><strong>Phone:</strong> {patientDetails.patient?.mobile}</p>
                                        <p><strong>Gender:</strong> {patientDetails.basicInfo.gender}</p>
                                        <p><strong>Age:</strong> {patientDetails.basicInfo.age}</p>
                                        <p><strong>Country:</strong> {patientDetails.basicInfo.country}</p>
                                        <p><strong>Employment Status:</strong> {patientDetails.basicInfo.employmentStatus}</p>
                                        <p><strong>Relationship Status:</strong> {patientDetails.basicInfo.relationshipStatus}</p>
                                        <p><strong>Sexual Orientation:</strong> {patientDetails.basicInfo.sexualOrientation}</p>
                                    </div>
                                    </div>
                                </div>
                                ):(
                                    <div>    
                                    <div>
                                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Basic Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-gray-700 text-sm">
                                    <p><strong>Name:</strong> {patientDetails.patient.name}</p>
                                        <p><strong>Email:</strong> {patientDetails.patient.email}</p>
                                        <p><strong>Phone:</strong> {patientDetails.patient.mobile}</p>


                                    </div>
                                    </div>
                                </div>
                                )
                                
                                }
                          
                                {/* PHQ Results */}
                                <div>
                                  <h3 className="text-lg font-semibold text-blue-800 mb-2 mt-5">Mental Status</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
                                    
                                    <p><strong>PHQ-9 Score:</strong> {patientDetails.phqResults.length > 0 && ( patientDetails.phqResults[0].score)} {patientDetails.phqResults.length == 0 && ('N/A')}</p>
                                    
                                    <p><strong>Depression Status:</strong>{ patientDetails.phqResults.length > 0 && (patientDetails.phqResults[0].status === "No depression" && <span className="text-green-500"> No Depression</span>)} 
                                    {patientDetails.phqResults.length > 0 && (patientDetails.phqResults[0].status !== "No depression" && patientDetails.phqResults[0].status)}  {patientDetails.phqResults.length == 0 && ("N/A")}</p>
                                    
                                    {patientDetails.basicInfo && (<p><strong>Taking Mental Support :</strong>{patientDetails.basicInfo.mentalHealthSupport}</p>)}
                                  </div>
                                </div>
                          </div>
                                {/* Action Buttons */}
                                <div className="flex justify-end gap-3 pt-4 ">
                                 
                                  <button
                                    onClick={() => {
                                        handleReject(patientReq)
                                        setModelOpen(false)}}
                                    className="border border-blue-800 text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-md transition cursor-pointer"
                                  >
                                    Reject Request
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleApproval(patientReq)
                                      setModelOpen(false);
                                    }}
                                    className="bg-blue-800 text-white hover:bg-blue-900 px-4 py-2 rounded-md transition cursor-pointer"
                                  >
                                    Accept As a Patient
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
           
        </>
    )
}

