import React, { useState, useRef, useEffect } from "react";
import NavBar from "../../components/navigationBar";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png";
import { v4 as uuidv4 } from "uuid";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import PatientSidebar from "../../components/patientSideBar";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const formatMessageTime = (timestamp) => {
  const date = dayjs(timestamp);
  // console.log(timestamp);
  if (date.isToday()) return `Today at ${date.format("h:mm A")}`;
  if (date.isYesterday()) return `Yesterday at ${date.format("h:mm A")}`;
  return date.format("MMM D, YYYY [at] h:mm A");
};

export default function PatientMessages() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [prevLastID, setPrevLastID] = useState(null);
  const [currentLastID, setCurrentLastID] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [manual, setManual] = useState(false);
  const [constUser, setConstUser] = useState([]);
  const [unreadUsers,setUnreadUsers]=useState([])
  const [unreadUserArr,setUnreadUserArr]=useState([])
  const [userClickedUsers, setUserClickedUsers] = useState([]);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const isUserAtBottom = () => {
    const container = chatContainerRef.current;
    if (!container) return false;
    const threshold = 150;
    const position = container.scrollTop + container.clientHeight;
    const height = container.scrollHeight;
    return height - position < threshold;
  };

  const scrollToBottom = () => {
    if (isUserAtBottom()) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
      
  }
  
  function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    console.log(searchTerm);
    if (searchTerm === "") {
      setUsers(constUser);
      return;
    }
    else{   
      const filteredResults = constUser.filter(user => {
      return user.name && user.name.toLowerCase().includes(searchTerm);
    });
    setUsers(filteredResults);

  }
  
  }

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      { _id: uuidv4(), senderId: currentUser._id, message: newMessage, createdAt: new Date() },
    ]);
    setNewMessage("");
    insertIntoDb(currentUser._id, selectedUser.id, newMessage);
  };

  const fetchFromDb = (user1, user2,manual) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setPrevLastID(messages[messages.length - 1]?._id);
    axios
      .post(
        "http://localhost:3000/api/chat/get-messages",
        { user1, user2 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setMessages(res.data);
        scrollToBottom();
        setCurrentLastID(res.data[res.data.length - 1]?._id);
        
      })
      .catch((err) => {
        console.error("Error Fetching Data", err);
      });
  };

  const insertIntoDb = (senderId, receiverId, message) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .post(
        "http://localhost:3000/api/chat/send-message",
        { senderId, receiverId, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log("Inserted message", res.data);
      })
      .catch((err) => {
        console.error("Error Inserting Data", err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    scrollToBottom();
    axios
      .get("http://localhost:3000/api/session/getacceptedReqs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios
          .get("http://localhost:3000/api/patient/get_dashboard_patient", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            // console.log("Current User", res.data);
            
            setCurrentUser(res.data);
          })
          .catch((err) => {
            console.error("Error fetching patient:", err);
          });
          // console.log("Therapist List", res.data);
        const therapists = res.data.map((therapist) => ({
          id: therapist.therapistId._id,
          name: therapist.therapistId.name
        }));
        setUsers(therapists);
        setConstUser(therapists);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      });
  }, []);

  useEffect(() => {
    if (!selectedUser.id || !currentUser._id) return;
    fetchFromDb(currentUser._id, selectedUser.id);
    const interval = setInterval(() => {
      fetchFromDb(currentUser._id, selectedUser.id);
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedUser, currentUser]);

  useEffect(() => {
    if (isUserAtBottom()) {
      scrollToBottom();
    }
  }, [messages]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages([]);
    setUserClickedUsers((prev) => [...prev, user.id]);
   
    fetchFromDb(currentUser._id, user.id,manual);
    setManual(true)
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login')
      return
    }
    axios
      .get("http://localhost:3000/api/chat/get-unread-users", {
        headers: {
            Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setUnreadUsers(res.data.unreadUsers);
            let unreadUserArr=res.data.unreadUsers.map((user)=>{
              return user.senderId
            })
            setUnreadUserArr(unreadUserArr);
          })
          .catch((err) => {
            console.error("Error fetching :", err);
          });
  }, []);


  return (
    <>
      <NavBar />
      <div className="flex w-full h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 overflow-hidden">
        <PatientSidebar prop="Messages" />

        <div className="flex flex-col flex-grow p-6 overflow-hidden">
          <h1 className="text-3xl font-bold text-blue-900">Message</h1>
          <p className="text-gray-600 mb-6 mt-2">Connect with your therapist in ease</p>

          <div className="flex flex-grow bg-white rounded shadow overflow-hidden">
            {/* Left: User list */}
            <div className="w-1/4 bg-gray-100 border-r border-gray-200 p-4">
              <h2 className="text-lg font-semibold mb-3">Therapists</h2>
              <input
                type="text"
                placeholder="Search for therapists..."
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
                onChange={(e)=> handleSearch(e)}
                />
              <ul>
                <div className=" mb-2 max-h-[500px] overflow-y-auto">
                {  users
                  .sort((a, b) => {
                    const aIsUnread = unreadUserArr.includes(a.id);
                    const bIsUnread = unreadUserArr.includes(b.id);
                    
                    if (aIsUnread && !bIsUnread) return -1;  // 'a' is unread, so place it before 'b'
                    if (!aIsUnread && bIsUnread) return 1;   // 'b' is unread, so place it before 'a'
                    return 0;  // If both are unread or both are read, keep their order as is
                 }).map((user) => (
                  <li
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    className={`p-2 mb-2 cursor-pointer rounded ${
                      selectedUser.id === user.id ? "bg-blue-200" : "hover:bg-gray-200"
                    }`}
             
                  >
              {
                    unreadUserArr.includes(user.id) && user.id!=selectedUser.id && !(userClickedUsers.includes(user.id)) ? (
                      <div>
                        <span className="font-semibold ">{user.name}</span>
                        <span className="text-xs text-blue-600 float-right bg-blue-100 rounded-xl p-1 pl-2 pr-2 ">
                          
                          {
                            unreadUsers.find(item => item.senderId === user.id)?.unreadCount
                          }
                        </span>
                      </div>
                    ) : (
                      <span>{user.name}</span>
                    )
                  }
                  </li>
                ))}
                </div>
              </ul>
            </div>

            {/* Right: Chat area */}
            <div className="flex flex-col w-3/4 border-l border-gray-300">
              {/* Chat header */}
              <div className="px-4 py-3 border border-gray-200 bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">{selectedUser.name}</h3>
              </div>

              {selectedUser.id ? (
                <div
                  ref={chatContainerRef}
                  className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-2"
                >
                  {messages.map((msg) => {
                    const isSender = msg.senderId?.toString() === currentUser._id?.toString();
                    return (
                      <div
                        key={msg._id}
                        className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`px-4 py-2 rounded-lg max-w-xs ${
                            isSender
                              ? "bg-blue-500 text-white"
                              : "bg-gray-300 text-gray-800"
                          }`}
                        >
                          {msg.message}
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          {formatMessageTime(msg.timestamp)}
                        </span>
                      </div>
                    );
                  })}
                  
                  <div ref={messagesEndRef} />
                  <button
                onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="absolute bottom-10 right-10 bg-transparent text-blue-800 hover:bg-blue-300  hover:text-white px-3 py-2 rounded-full shadow-lg cursor-pointer"
              >
                ↓
              </button>
                </div>
              ) : (
                <div className="flex-1 p-4 flex items-center justify-center bg-gray-50">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-48 h-48 mb-4 rounded-full inline-block transition-transform transform hover:scale-105 duration-300 opacity-40"
                  />
                </div>
              )}

              {/* Message input */}
              {selectedUser.id ? (
                <div className="p-4 border-t border-gray-300 bg-white flex">
                  <input
                    className="flex-1 border border-gray-300 rounded-l px-4 py-2 outline-none"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <button
                    onClick={handleSend}
                    className="bg-blue-500 text-white px-6 rounded-r hover:bg-blue-600 cursor-pointer"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-white flex">
                  <input
                    className="flex-1 border border-gray-300 rounded px-4 py-2 outline-none"
                    placeholder="Select a therapist to start the chat"
                    disabled
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}