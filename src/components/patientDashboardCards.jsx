import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function PatientDashboardCards() {

  const [sessionCount, setSessionCount] = useState(0);

    const cards = [
      { label: "Total Sessions", value: sessionCount, change: "+12%", positive: true },
      { label: "Upcoming Sessions", value: 5, change: "+2", positive: true },
      { label: "Zen Wallet", value: 5, change: "+2", positive: true },
      { label: "Zen Hours", value: 32.5, change: "-4%", positive: false },
      
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

        

      </div>
    );
  }