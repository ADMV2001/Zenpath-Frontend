import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TherapistNavBar from "../../components/navigationBarTherapist";
import toast from "react-hot-toast";

export default function PatientRequests(){

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [requests, setRequests] = useState([])

    useEffect(()=>{
        const token = localStorage.getItem("token")
        
        if(!token){
            navigate("/login")
            return
        }

        axios.get("http://localhost:5000/api/session/therapist-requests", {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res)=>{
            setRequests(res.data)
            setLoading(false)
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

        axios.post(`http://localhost:5000/api/session/approve/${request_id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res)=>{
            setRequests(requests.filter((request)=>request._id !== request_id))
            toast.success("Request Approved!")
        }).catch((err)=>{
            console.error(err)
            toast.error("Error approving request.")
        })
    }

    return(
        <>
        <div>
            <TherapistNavBar/>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4 flex justify-center">Patient Requests</h1>
                <div className="overflow-x-auto rounded-[25px] px-40 ">
                    <table className="min-w-full bg-white border border-gray-200 rounded-[15px]">
                    <thead className="bg-gray-50 ">
                        <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                            Date
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                            Patient Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                            Action
                        </th>
                        
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {requests.map((request) => (
                        <tr key={request._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{request.createdAt.slice(0, 10)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{request.userId?.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-600">{request.status}</td>
                            <td>
                                <button className="px-2 bg-green-200 rounded-md py-1 text-green-700 font-semibold cursor-pointer mr-2"
                                        onClick={()=>{handleApproval(request._id)}}
                                >Approve</button>

                                <button className="px-2 bg-red-200 rounded-md py-1 text-red-600 font-semibold cursor-pointer"
                                        onClick={()=>{handleRejection(request._id)}}
                                >Reject</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}