import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ImCoinDollar } from "react-icons/im";
import { FaWallet } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

export default function PatientDashboardCards() {

  const [sessionCount, setSessionCount] = useState(0);
  const [coinAmount, setCoinAmount] = useState(0);
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }

    axios.get("http://localhost:3000/api/wallet/get_patient_wallet", {
        headers: { Authorization: `Bearer ${token}` }
    }).then((res)=>{
        setCoinAmount(res.data.coins);
    })
},[])

    const cards = [
      { label: "Total Sessions", value: sessionCount, change: "+12%", positive: true },
      { label: "Upcoming Sessions", value: 5, change: "+2", positive: true }
    ]; 

    useEffect(() => {
      const token = localStorage.getItem("token");
      
      axios.get("http://localhost:3000/api/session/get_all_sessions", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setSessionCount(res.data.length)
        console.log(res.data.length)
      })
      
      .catch(() => setSessionCount(0));
    }, []);

  
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 h-35 w-full">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">{card.label}</h3>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>

              
            </div>
            <span className={`text-sm ${card.positive ? 'text-green-500' : 'text-red-500'}`}>
                {card.change} from last week
              </span>
          </div>
        ))}
        <div className="w-[300px] bg-white rounded-xl flex relative shadow">
          <span className="absolute left-[15px] top-[10px] text-[22px] text-blue-600 font-[poppins] font-bold">ZenWallet</span>
          <span className="absolute left-[15px] top-[38px] text-[13px] text-gray-600 font-[poppins]">Balance</span>
          <span className="absolute right-[20px] top-[6px] text-[32px] text-gray-600 font-[poppins] font-bold">{coinAmount}</span>
          
          <Link className="absolute bottom-[10px] left-[15px] text-blue-600 text-[12px] font-semibold ">ZenCoin?</Link>
          <button className="bg-blue-600 text-white rounded-lg p-1.5 absolute bottom-[10px] right-[10px] font-semibold cursor-pointer w-[100px] text-[14px]"
          onClick={() => {
            navigate('/patient_wallet')
          }}
          >Wallet</button>
        </div>
      </div>
    );
  }