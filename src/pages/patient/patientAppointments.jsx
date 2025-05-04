import React  from "react";
import { useEffect, useState } from "react";
import NavBar from "../../components/navigationBar";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import PatientSidebar from "../../components/patientSideBar";
import axios from "axios";

const events = [
  { title: 'Meeting', date: '2025-05-05' },
  { title: 'Therapy Session', date: '2025-05-07' },
  { title: 'Another Therapy Session', date: '2025-05-07' }
];

export default function PatientAppointments() {

  const [constevents, setConstEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [costupcoming, setCostUpcoming] = useState([]);
    const [events, setEvents] = useState([]);
    const [upcomingCnt, setUpcomingCnt] = useState(0);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [sessionTitle, setSessionTitle] = useState("Upcoming");


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        setLoading(true);
        axios.get("http://localhost:3000/api/session/get_all_sessions", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            const upcomingevents = res.data.filter(event => event.state == "Confirmed");
            setConstEvents(res.data);
            
            console.log(res.data);
            let calevents = [];
            res.data.forEach((event, index) => {
                const startDate =  event.sessionDate
                const id= event._id
                const title= event.therapistId.name+" - "+event.sessionType+"Session"
                let color = "#2563eb"; // default color
                switch (event.state) {
                    case "Pending":
                        color = "#fbbf24"; // yellow
                        break;
                    case "Confirmed":
                        color = "#4ade80"; // green
                        break;
                    case "Finished":
                        color = "#ccc"; // red
                        break;
                    default:
                        color = "#2563eb"; // default color
                }
                calevents.push({
                    id: id,
                    title: title,
                    start: startDate,
                    color: color,
                    
                });
            });
            setCalendarEvents(calevents);
            setUpcomingCnt(upcomingevents.length);
            
            setCostUpcoming(upcomingevents);
            setEvents(upcomingevents);
        })
        .catch((err) => {
            console.error("Error fetching events:", err);
            setLoading(false);
        });
        setLoading(false);
    }, []);

    const handleStateFilter = (value) => {
        if (value === "all") {
            setEvents(constevents);
            setSessionTitle("Total");
        } else if (value === "Upcoming") {
            const upcoming = constevents.filter((event) => event.state === "Confirmed");
            setEvents(upcoming);
            setSessionTitle("Upcoming");
        } else if (value === "pending") {
            const pending = constevents.filter((event) => event.state === "Pending");
            setEvents(pending);
            setSessionTitle("Pending");
        } else if (value === "finished") {
            const finished = constevents.filter((event) => event.state === "Finished");
            setEvents(finished);
            setSessionTitle("Finished");
        } else {
            setEvents(constevents);
            setSessionTitle("Total");
        }
    }
    const handleModeFilter = (value) => {
        if (value === "all") {
            setEvents(events);
        } else if (value === "Video Call") {
            const online = events.filter((event) => event.sessionType === "online");
            setEvents(online);
        } else if (value === "In Person") {
            const inPerson = events.filter((event) => event.sessionType === "in-person");
            setEvents(inPerson);
        } else {
            setEvents(events);
        }
    }

  const handleEventClickOnCalendar = (arg) => {
    alert(`Event clicked: ${arg.event.title} on ${arg.event.id} `);
  };
    
  const handleDateClick = (arg) => {
    alert(`Date clicked: ${arg.dateStr}`);
    // You can also do: console.log(arg.date)
  };

  const handleEventClick = (arg) => {
    alert(`Event clicked: ${arg.event.title} on ${arg.event.startStr}`);
  };
return (
    <>
    <NavBar/>
    <div className="flex w-full h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 "> 
    
    <PatientSidebar prop='Sessions' />
    
    <div className="flex flex-col flex-grow p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-blue-900">Sessions</h1>
        <p className="text-gray-600 mb-6 mt-2">you have <span className="text-xl text-blue-800 font-semibold" >{upcomingCnt} </span> Upcomming Sessions</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
            {/* Calendar */}
            <div className="bg-white rounded-lg shadow-md border border-blue-100 p-4">
              <h3 className="text-xl font-semibold text-black mb-3">Calendar</h3>
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                eventClick={handleEventClickOnCalendar}
                height="auto"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,dayGridWeek'
                }}
                contentHeight="auto"
                eventDisplay="block"
                eventColor="#2563eb" 
                eventTextColor="#FFFFFF"
              />
            </div>
            {/* Appointment List */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <div>
                <h3 className="text-xl font-semibold text-black"> {sessionTitle} Sessions</h3>
                <span className="text-gray-500 text-sm">
                {events.length} {sessionTitle} sessions</span>
                </div>
                <div className="p-4 bg-white rounded-md  border border-gray-200">
  <div className="flex flex-col md:flex-row md:items-center gap-4">
    <p className="text-md text-gray-500">Filter </p>

    {/* Session State Filter */}
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <div>
        <p className="text-xs text-gray-500 mb-1">Session State</p>
      <select
        id="sessionState"
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        onChange={(e) => {handleStateFilter(e.target.value)}}
      >
        <option value="Upcoming">Upcoming</option>
        <option value="pending">Pending</option>
        <option value="finished">Finished</option>
        <option value="all">All</option>
      </select>
    </div>
    </div>

    {/* Session Type Filter */}

    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <div>
      <p className="text-xs text-gray-500 mb-1">Session Type</p>
      <select
        id="sessionType"
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        onChange={(e) => {handleModeFilter(e.target.value)}}
      >

        <option value="all">All</option>
        <option value="Video Call">Online</option>
        <option value="In Person">In Person</option>
      </select>

      
      </div>
      <button className="bg-gray-400 text-white text-sm px-4 py-2 rounded mt-5 cursor-pointer hover:scale-105 transition" onClick={() => {setEvents(constevents);setSessionTitle("Total")}}>Reset</button>
    </div>
  </div>
</div>
   
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {events.map((event, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-transparent rounded-lg border border-gray-300">
                    <div>
                      <p className="font-medium text-black">{event.userId.name}</p>
                      <p className="text-sm text-gray-500">
                        {
                        event.sessionDate === new Date().toISOString().slice(0, 10)
                            ? "Today"
                            : event.sessionDate === new Date(Date.now() + 86400000).toISOString().slice(0, 10)
                            ? "Tomorrow"
                            : event.sessionDate
                        } • {event.sessionTime} • ({event.sessionDuration/60+ " Hours"}) • {event.sessionType}
                      </p>
                    </div>
                    <div className="flex items-center gap-20">
                    {event.state === "Confirmed" ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                           Confirmed
                          </span>
                        ) : event.state === "Finished" ? (
                          <span className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm font-medium">
                            Finished
                          </span>
                        ) : (
                         <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                            Pending
                          </span>
                        )}
                    <button className="bg-blue-800 text-white text-sm px-4 py-2 rounded  cursor-pointer hover:scale-105  transition" >View</button>
                    </div>
                  </div>
                ))}
                {events.length === 0 && (
                    <div className="flex justify-center mt-60 items-center h-full">
                    <p className="text-gray-500">No sessions available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  );
}
