import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TherapistNavBar from "../../components/navigationBarTherapist";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";
import { H2Icon,CalendarDaysIcon,UserCircleIcon,PaperAirplaneIcon,ChatBubbleOvalLeftIcon} from "@heroicons/react/24/outline";

export default function Patients(){

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [modelOpen, setModelOpen] = useState(false)
    const [requests, setRequests] = useState([])
    const [patientDetails, setPatientDetails] = useState({})
    const [patientReq, setPatientReq] = useState("")
    const [reqCount, setReqCount] = useState(0)
    const [constpatientDetails, setConstPatientDetails] = useState({})
    const [modelSessionOpen, setModelSessionOpen] = useState(false)
    const [sessionDate, setSessionDate] = useState("")
    const [sessionTime, setSessionTime] = useState("")
    const [sessionDuration, setSessionDuration] = useState("")
    const [sessionType, setSessionType] = useState("")
    const [sessionNote, setSessionNote] = useState("")

    useEffect(()=>{
        const token = localStorage.getItem("token")
        
        if(!token){
            navigate("/login")
            return
        }
        setLoading(true)

        axios.get("http://localhost:3000/api/session/gettherapistpatients", {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res)=>{
            console.log(res.data)
            setRequests(res.data)
            setLoading(false)
            setReqCount(res.data.length)
            setConstPatientDetails(res.data)
        }).catch((err)=>{
            console.error(err)
            setLoading(false)
        })   
    },[]);


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
  function handleSearch(e){
    const searchTerm = e.target.value.toLowerCase();
    const filteredRequests = requests.filter(request => {
        return request.userId.name.toLowerCase().includes(searchTerm);
    });
    if(searchTerm === ""){
        setRequests(constpatientDetails)

    }
    else{
      setRequests(filteredRequests);
    }

        

  }

  function handleSession(userId){

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
        setModelSessionOpen(true)
        setPatientDetails(res.data)
        setLoading(false)


  }).
  catch((err)=>{
      console.error(err)
  }
  )
  }

  function sessionAddHandle(){
    console.log(sessionDate, sessionTime, sessionDuration, sessionType, sessionNote)
    console.log(patientDetails.patient._id)
    setModelSessionOpen(false)
  }


    return(
        <>
            <TherapistNavBar/>
            <div className="flex w-full h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 "> 
            <Sidebar prop="Patients"/>
            <div className="min-h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 w-500 px-10 py-8">
            <h1 className="text-3xl font-bold text-blue-900">Patients</h1>
            <p className="text-gray-600 mb-6 mt-2">you have <span className="text-xl text-blue-800 font-semibold" >{reqCount} </span> Patients in your care</p>
            <div className="bg-white p-6 rounded-lg shadow mt-10 h-[600px]">
            <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-semibold text-gray-800">Patients in care</h2>
            
              
            </div>
            <input type="text" placeholder="Search Patients By Name ..." className="border border-gray-300 rounded-lg px-4 py-2 w-[600px]" onChange={(e)=> handleSearch(e)}/>
         <div >
         {loading && (<p className="text-center text-blue-800 text-lg">Loading...</p>)}
    
         {requests.length > 0 && (
          <div className="rounded-lg overflow-hidden border border-gray-200 mt-4 overflow-y-auto max-h-[400px]">

  <table className="w-full text-left">
    <thead className="border border-gray-200 rounded-xl bg-gray-100">
      <tr >
        <th className="p-3 font-medium text-gray-500">Patient Name</th>
        <th className="p-3 font-medium text-gray-500 ">Prev Session</th>
        <th className="p-3 font-medium text-gray-500">Next Session</th>
        <th className="p-3 font-medium text-gray-700"></th>
  
      </tr>
    </thead>
    <tbody >
      {requests.map((request, index) => (
        
        <tr key={index} className="mb-1 border border-gray-200 rounded-lg">
          <td className="p-4">
            <p className="font-medium text-gray-700">{request.userId?.name}</p>
          </td>
          <td className="p-4">
            <p className="font-light text-gray-700">22/04/2025</p>
          </td>
          <td className="p-4">
            <p className="font-light text-gray-700">23/04/2025</p>
          </td>
          <td className="p-4">
            
            <div className="flex gap-10 justify-end">
              <button
                className="bg-transparent cursor-pointer hover:scale-110 transition"
                onClick={() => handleView(request._id, request.userId)}
              >
                 <UserCircleIcon className="h-6 w-6 text-blue-800" />
                
              </button>
              <button
                className="bg-transparent cursor-pointer hover:scale-110 transition"
                onClick={() => handleSession(request.userId)}
              >
               
                <CalendarDaysIcon className="h-6 w-6 text-blue-800"/>
              </button>
              <button
                className="bg-transparent cursor-pointer hover:scale-110 transition"
                onClick={() => handleView(request._id, request.userId)}
              >
                <ChatBubbleOvalLeftIcon className="h-6 w-6 text-blue-800" />
              </button>
              
            </div>
          </td>
        </tr>
        
        
      ))}
    </tbody>
  </table>
  </div>
)}
    {requests.length === 0 && (
        <div className="flex justify-center items-center h-full mt-50">
            <p className="text-gray-500">No Patients has asigned to you.</p>
            </div>
    )}
      </div>
    </div>
                      </div>
                      
                    </div>
                    {/* View Patient Details Modal */}
                    
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
                                <div>
                                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Basic Information</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-gray-700 text-sm">
                                    <p><strong>Name:</strong> {patientDetails.basicInfo.name}</p>
                                    <p><strong>Email:</strong> {patientDetails.basicInfo.email}</p>
                                    <p><strong>Phone:</strong> {patientDetails.patient.mobile}</p>
                                    <p><strong>Gender:</strong> {patientDetails.basicInfo.gender}</p>
                                    <p><strong>Age:</strong> {patientDetails.basicInfo.age}</p>
                                    <p><strong>Country:</strong> {patientDetails.basicInfo.country}</p>
                                    <p><strong>Employment Status:</strong> {patientDetails.basicInfo.employmentStatus}</p>
                                    <p><strong>Relationship Status:</strong> {patientDetails.basicInfo.relationshipStatus}</p>
                                    <p><strong>Sexual Orientation:</strong> {patientDetails.basicInfo.sexualOrientation}</p>
                                    
                                  </div>
                                </div>
                          
                                {/* PHQ Results */}
                                <div>
                                  <h3 className="text-lg font-semibold text-blue-800 mb-2 mt-5">Mental Status</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
                                    
                                    <p><strong>PHQ-9 Score:</strong> {patientDetails.phqResults.length > 0 && ( patientDetails.phqResults[0].score)} {patientDetails.phqResults.length == 0 && ('N/A')}</p>
                                    
                                    <p><strong>Depression Status:</strong>{ patientDetails.phqResults.length > 0 && (patientDetails.phqResults[0].status === "No depression" && <span className="text-green-500"> No Depression</span>)} 
                                    {patientDetails.phqResults.length > 0 && (patientDetails.phqResults[0].status !== "No depression" && patientDetails.phqResults[0].status)}  {patientDetails.phqResults.length == 0 && ("N/A")}</p>
                                    
                                    <p><strong>Taking Mental Support :</strong>{patientDetails.basicInfo.mentalHealthSupport}</p>
                                  </div>
                                </div>
                          </div>
                                {/* Action Buttons */}
                               
                              </div>
                            </div>
                          )}

                          {/*Add a session model*/}
                          {modelSessionOpen && (
                            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                              <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl space-y-6">
                                {/* Header */}
                                <div className="flex items-center justify-between pb-4">
                                  <h2 className="text-2xl font-bold text-blue-800">Add a Session for {patientDetails.basicInfo.name}</h2>
                                  <button
                                    onClick={() => setModelSessionOpen(false)}
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
                                    <p><strong>Name:</strong> {patientDetails.basicInfo.name}</p>
                                    <p><strong>Email:</strong> {patientDetails.basicInfo.email}</p>
                                    </div>
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-blue-800 mb-2 mt-2">Meeting Details</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-gray-700 text-sm">
                                    <p><strong>Date:</strong></p> <input type="date" className="border border-gray-300 rounded-md px-2 py-1 w-full" id='session_date' onChange={(e) => setSessionDate(e.target.value)}/>
                                    <p><strong>Time:</strong></p> <input type="time" className="border border-gray-300 rounded-md px-2 py-1 w-full" id='session_time' onChange={(e)=>setSessionTime(e.target.value)}/>
                                    <p><strong>Duration:</strong></p> <select className="border border-gray-300 rounded-md px-2 py-1 w-full" id='session_duration' onChange={(e)=>setSessionDuration(e.target.value)}>
                                      <option value="30">30 minutes</option>
                                      <option value="60">1 hour</option>
                                      <option value="90">1.5 hours</option>
                                      <option value="120">2 hours</option>
                                    </select>
                                    <p><strong>Mode:</strong></p> <select className="border border-gray-300 rounded-md px-2 py-1 w-full" id='session_type' onChange={(e)=>setSessionType(e.target.value)}>
                                    <option value="video" >Online</option>
                                      <option value="in-person">In-Person</option>
                                      
                                    </select>
                                    
                                    </div>
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Additional Notes</h3>
                                  <textarea className="border border-gray-300 rounded-md px-2 py-1 w-full h-24" placeholder="Add any notes here..." id='session_note' onChange={(e)=>setSessionNote(e.target.value)}></textarea>
                                </div>
                              </div>
                                {/* Action Buttons */}
                                <div className="flex justify-end">
                                  <button
                                    onClick={() => sessionAddHandle()}
                                    className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                  >
                                    Add Session
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
           
        </>
    )
}

