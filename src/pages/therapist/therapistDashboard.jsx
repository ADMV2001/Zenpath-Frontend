import { useEffect, useState } from "react";
import TherapistNavBar from "../../components/navigationBarTherapist";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TherapistDashboard(){

    const navigate = useNavigate();
    const [therapist, setTherapist] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
  
      axios.get("http://localhost:5000/api/therapist/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setTherapist(res.data))
        .catch((err) => {
          console.error("Fetch profile error:", err);
          navigate("/login");
        })
        .finally(() => setLoading(false));
    }, [navigate]);
  
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><p>Loading…</p></div>;
      }
    if (!therapist) {
        return <div className="min-h-screen flex items-center justify-center"><p>Unable to load profile.</p></div>;
      }

    return(
        <>
        <TherapistNavBar/>
        <div className="w-full h-full flex flex-col items-center  bg-gradient-to-r from-white to-blue-100">
            
            {/* middle section */}
            <div className="w-full mt-[20px] flex justify-center rounded-[20px] px-25 shadow-lg">
                {/* profile */}
                <div className="w-[49%] bg-white  p-2 rounded-[15px] m-5 flex flex-col items-center shadow-lg font-[poppins]">
                    <h1 className="text-center text-blue-800 font-semibold text-[22px]">Therapist Profile</h1>
                    <img src="/therapist_profile.png" alt="therapist_profile" className="w-[150px] h-[150px] rounded-full object-cover mt-8"/>

                    <div className="w-full mt-3 bg-transparent p-2">
                        <div className="flex flex-col rounded-[10px] gap-2 bg-gray-100 p-2 mb-2 shadow-sm">
                            <h1 className="text-[16px] text-blue-600 font-semibold font-[poppins]">Personal Details</h1>
                            <p className="text-[14px]"><span className="font-semibold">Full Name :</span>{" "}<span className="font-normal">{therapist.name}</span> </p>
                            <p className="text-[14px]"><span className="font-semibold">Email     :</span>{" "}<span className="font-normal">{therapist.email}</span> </p>
                            <p className="text-[14px]"><span className="font-semibold">Phone     :</span>{" "}<span className="font-normal">{therapist.phone}</span> </p>
                            <p className="text-[14px]"><span className="font-semibold">Address   :</span>{" "}<span className="font-normal">{therapist.address}</span> </p>
                        </div>

                        <div className="flex flex-col rounded-[10px] gap-2 bg-gray-100 p-2 mb-2">
                        <h1 className="text-[16px] text-blue-600 font-semibold font-[poppins]">Provable Document Details</h1>
                            <p className="text-[14px]"><span className="font-semibold"> License Number :  :</span>{" "}<span className="font-normal">{therapist.licenseNumber}</span> </p>
                            <p className="text-[14px]"><span className="font-semibold">License Issuing Authority :</span>{" "}<span className="font-normal">{therapist.licenseIssuingAuthority}</span> </p>
                            <p className="text-[14px]"><span className="font-semibold">License Expiry :</span>{" "}<span className="font-normal">{therapist.licenseExpiry.slice(0,10)}</span> </p>
                        </div>

                        <div className="flex flex-col rounded-[10px] gap-2 bg-gray-100 p-2 mb-2">
                        <h1 className="text-[16px] text-blue-600 font-semibold font-[poppins]">Certificates and Education</h1>
                            <p className="text-[14px]"><span className="font-semibold">Certifications :</span>{" "}<span className="font-normal">{therapist.certifications}</span> </p>
                            <p className="text-[14px]"><span className="font-semibold">Specialties :</span>{" "}<span className="font-normal">{therapist.specialties}</span> </p>
                            <p className="text-[14px]"><span className="font-semibold">Experience :</span>{" "}<span className="font-normal">{therapist.experience}</span> </p>
                            <p className="text-[14px]"><span className="font-semibold">Education :</span>{" "}<span className="font-normal">{therapist.education}</span> </p>
                            <p className="text-[14px]"><span className="font-semibold">Bio :</span>{" "}<span className="font-normal">{therapist.bio}</span> </p>
                        </div>

                       
                        <div className="flex flex-col rounded-[10px] gap-2 bg-gray-100 p-2 mb-2">
                        <h1 className="text-[16px] text-blue-600 font-semibold font-[poppins]">Social </h1>
                            <p className="text-[14px] hidden"><span className="font-semibold">Website :</span>{" "}<span className="font-normal">{therapist.website}</span> </p>
                            <p className="text-[14px] hidden"><span className="font-semibold">LinkedIn Profile :</span>{" "}<span className="font-normal">{therapist.linkedin}</span> </p>
                            
                            {/* Website */}
                            <p className="text-[14px]">
                            <span className="font-semibold">Website:</span>{" "}
                            {therapist.website ? (
                                <a
                                href={therapist.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-normal text-blue-600 hover:underline"
                                >
                                {therapist.website}
                                </a>
                            ) : (
                                <span className="font-normal text-gray-500">N/A</span>
                            )}
                            </p>

                            {/* LinkedIn */}
                            <p className="text-[14px]">
                            <span className="font-semibold">LinkedIn Profile:</span>{" "}
                            {therapist.linkedin ? (
                                <a
                                href={therapist.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-normal text-blue-600 hover:underline"
                                >
                                View on LinkedIn
                                </a>
                            ) : (
                                <span className="font-normal text-gray-500">N/A</span>
                            )}
                            </p>


                        </div>

                        <div className="flex flex-col rounded-[10px] gap-2 bg-gray-100 p-2 mb-2">
                        <h1 className="text-[16px] text-blue-600 font-semibold font-[poppins]">Status</h1>
                            <p className="text-[14px]"><span className="font-semibold">Account Status :</span>{" "}<span className="font-normal text-[13px] text-white p-1 bg-green-500 rounded-[8px]">{therapist.isApproved}</span> </p>
                            <p className="text-[14px]"><span className="font-semibold">Registered Date:</span>{" "}<span className="font-normal">{therapist.registeredAt.slice(0,10)}</span> </p>
                            <p className="text-[14px] flex items-center gap-2">
                                <span className="font-semibold">Add Profile Picture :</span>
                                <label className="cursor-pointer font-normal text-blue-600 hover:underline">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden "
                                />
                                Upload
                                </label>
                             </p>
                        </div>
   
                    </div>
                    
                </div>

                {/* Therapist Functions */}
                <div className="w-[49%] h-[400px] bg-blue-100 p-2 rounded-[15px] m-5 font-[poppins]">
                    <h1 className="text-blue-800 font-semibold text-[22px] mb-4 text-center">
                        Therapist Functions
                    </h1>
                    <div className="grid grid-cols-2 gap-4 mx-[20px] mt-[30px]">
                        {/* Patients */}
                        <div
                        onClick={() => navigate("/patients")}
                        className="bg-white hover:bg-blue-200 cursor-pointer rounded-xl p-6 flex items-center justify-center shadow transition"
                        >
                        <span className="text-blue-800  text-lg hover:text-white">
                            Patients
                        </span>
                        </div>

                        {/* Requests */}
                        <div
                        onClick={() => navigate("/requests")}
                        className="bg-white hover:bg-blue-200 cursor-pointer rounded-xl p-6 flex items-center justify-center shadow transition"
                        >
                        <span className="text-blue-800  text-lg">
                            Requests
                        </span>
                        </div>

                        {/* Articles */}
                        <div
                        onClick={() => navigate("/articles")}
                        className="bg-white hover:bg-blue-200 cursor-pointer rounded-xl p-6 flex items-center justify-center shadow transition"
                        >
                        <span className="text-blue-800  text-lg">
                            Articles
                        </span>
                        </div>

                        {/* Other */}
                        <div
                        onClick={() => navigate("/other")}
                        className="bg-white hover:bg-blue-200 cursor-pointer rounded-xl p-6 flex items-center justify-center shadow transition"
                        >
                        <span className="text-blue-800 text-lg">
                            Other
                        </span>
                        </div>
                    </div>
                </div>

            </div>
            


        </div>
        </>
    )
}