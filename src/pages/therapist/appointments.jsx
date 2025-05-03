import React  from "react";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import NavBar from "../../components/navigationBarTherapist";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const events = [
  { title: 'Meeting', date: '2025-05-05' },
  { title: 'Therapy Session', date: '2025-05-07' },
  { title: 'Another Therapy Session', date: '2025-05-07' }
];



export default function Appointments() {
    
  const handleDateClick = (arg) => {
    alert(`Date clicked: ${arg.dateStr}`);
    // You can also do: console.log(arg.date)
  };

  const handleEventClick = (arg) => {
    alert(`Event clicked: ${arg.event.title} on ${arg.event.startStr}`);
  };
return (
    <>
    <NavBar />
    <div className="flex w-full h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 "> 
    
    <Sidebar prop='Appointments' />
    
    <div className="max-w-xl max-h-xs mx-auto mt-6 p-4 bg-white shadow-md rounded-lg border border-blue-100 font-[Poppins]">
  <h2 className="text-xl font-semibold text-blue-700 mb-3 tracking-tight">📅 Your Calendar</h2>
  <FullCalendar
    plugins={[dayGridPlugin]}
    initialView="dayGridMonth"
    events={events}
    eventClick={handleEventClick}
    height="auto"
    headerToolbar={{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    }}
    contentHeight="auto"
    eventDisplay="block"
    eventColor="#4F46E5" // Indigo-600
    eventTextColor="#FFFFFF"
  />
</div>
    </div>
    </>
  );
}
