import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CountUp from 'react-countup';
export default function DashboardCards() {
    const [reqCount, setReqCount] = useState(0);
    const [sessions, setSessions] = useState(0);
    const [loading, setLoading] = useState(false);
    const [appointmentsCnt, setAppointmentsCnt] = useState([]);
    const [viewReqModel, setViewReqModel] = useState(false);
    const [sessionHours,setSessionHours]=useState(0);


    const navigate = useNavigate();
    const cards = [
      { label: "Total Patients", value: 128, change: "+12%", positive: true },
      { label: "Upcoming Sessions", value: 24, change: "+8%", positive: true },
      { label: "Total Session Hours", value: 32.5, change: "-4%", positive: false },
      { label: "Total Earnings", value: 9, change: "+18%", positive: true },
    ];

    useEffect(()=>{
      const token = localStorage.getItem("token")
      
      if(!token){
          navigate("/login")
          return
      }

      axios.get("http://localhost:3000/api/session/gettherapistpatients", {
          headers: { Authorization: `Bearer ${token}` }
      }).then((res)=>{
          setReqCount(res.data.length)
          

      }).catch((err)=>{
          console.error(err)
      })  
  },[]);

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
          setAppointmentsCnt(response.data.length);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };
      fetchAppointments();
    }, []);

    useEffect(()=>{
      const token = localStorage.getItem("token")
      
      if(!token){
          navigate("/login")
          return
      }

      axios.get("http://localhost:3000/api/session/getsessionhours", {
          headers: { Authorization: `Bearer ${token}` }
      }).then((res)=>{
        setSessionHours(res.data.totDuration)
      }).catch((err)=>{
          console.error(err)
      })  
  },[]);



  

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 h-35 w-full">
  
          <div  className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Patients in your care</h3>
            <div className="flex items-baseline justify-between mt-2">
                
              <p className="text-[40px] font-bold text-blue-600"><CountUp end={reqCount} duration={2} /></p>

              
            </div>

            


          </div>
          <div  className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Upcomming Sessions</h3>
            <div className="flex items-baseline justify-between mt-2">
                
              <p className="text-[40px] font-bold text-blue-600"><CountUp end={appointmentsCnt} duration={2} /></p>

              
            </div>

            


          </div>

          <div  className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Completed Session Hours</h3>
            <div className="flex items-baseline justify-between mt-2">
                
              <p className="text-[40px] font-bold text-blue-600"><CountUp end={Math.floor(sessionHours/60)} duration={2} /></p>

              
            </div>

            


          </div>

          <div className="w-[300px] bg-white rounded-xl flex relative shadow">
            
          <span className="absolute left-[15px] top-[10px] text-[22px] text-blue-600 font-[poppins] font-bold">ZenWallet</span>
          <span className="absolute left-[15px] top-[38px] text-[13px] text-gray-600 font-[poppins]">Zencoin Balance</span>
          <span className="absolute right-[20px] top-[6px] text-[32px] text-gray-600 font-[poppins] font-bold"><CountUp end={sessionHours/30} duration={2} /></span>
          
          <button className="bg-blue-600 text-white rounded-lg p-1.5 absolute bottom-[10px] right-[10px] font-semibold cursor-pointer w-[100px] text-[14px]"
          onClick={() => {
            navigate('/therapist_wallet')
          }}
          >Wallet</button>
        </div>

            




  


          

      </div>
    );
  }