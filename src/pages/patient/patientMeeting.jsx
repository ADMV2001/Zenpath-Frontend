// MeetingPage.jsx
import { useParams } from 'react-router-dom';
import { use, useEffect, useState } from 'react';
import JitsiMeet from '../../components/Jitsimeeting';
import MeetingNavBar from '../../components/meetingNavbar';
import axios from 'axios';

const PatientMeetingPage = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null); // your logged-in user
  const [roomName, setRoomName] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }
    const sessionId = id;
    axios.post("http://localhost:3000/api/session/getSingleSession",{sessionId}, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  })
  .then(res => {
      setSession(res.data);
      setRoomName(res.data.roomName);
      setUser(res.data.userId.name);
    })
  .catch(err => {
      console.error("Error fetching events:", err);
  });
    

  }, []);
  const room = id;
  return (
    <div>
                  <MeetingNavBar actor="patient" />
                  <div className=" w-full h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 ">  
                    <div className=" w-full h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 p-10">

                  {roomName && (
                  <JitsiMeet roomName={roomName} displayName={user || 'Guest'} />
                  )}
                  </div>
                  </div>

     
    </div>
  );
};

export default PatientMeetingPage;