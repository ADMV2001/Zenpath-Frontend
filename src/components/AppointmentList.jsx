export default function AppointmentList() {
    const appointments = [
      { name: "Alex Morgan", time: "10:00 AM", duration: "50 min", method: "Video Call", confirmed: true },
      { name: "Jamie Chen", time: "1:30 PM", duration: "50 min", method: "Video Call", confirmed: true },
      { name: "Taylor Smith", time: "3:00 PM", duration: "50 min", method: "In Person", confirmed: false },
      { name: "Sam Lee", time: "4:30 PM", duration: "50 min", method: "Video Call", confirmed: true },
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow mt-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
          <p className="text-gray-500 text-sm">You have {appointments.length} upcoming sessions scheduled.</p>
        </div>
        {appointments.map((apt, index) => (
          <div key={index} className="flex justify-between items-center mb-1 p-4 border border-gray-200 rounded-lg ">
            <div>
              <p className="font-medium text-gray-700">{apt.name}</p>
              <p className="text-sm text-gray-500">Today • {apt.time} ({apt.duration}) • {apt.method}</p>
            </div>
            <div className="flex gap-2">
              {apt.confirmed && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Confirmed</span>
              )}
              <button className="bg-blue-800 text-white text-sm px-4 py-2 rounded hover:scale-105 transition">Join</button>
            </div>
          </div>
        ))}
      </div>
    );
  }