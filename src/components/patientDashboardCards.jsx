import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';
export default function PatientDashboardCards() {
    const cards = [
      { label: "Total Patients", value: 128, change: "+12%", positive: true },
      { label: "Weekly Sessions", value: 24, change: "+8%", positive: true },
      { label: "Session Hours", value: 32.5, change: "-4%", positive: false },
      { label: "New Inquiries", value: 9, change: "+18%", positive: true },
    ];
  
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
            <div className="w-full mt-2 h-2 color-gray-200 mt-10"> 
                    <LinearProgress variant="determinate" value={card.value} />
                </div>
          </div>
        ))}

      </div>
    );
  }