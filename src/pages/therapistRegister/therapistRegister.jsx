import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navigationBar';
import Footer from '../../components/footer';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function TherapistRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    licenseNumber: '',
    licenseIssuingAuthority: '',
    licenseExpiry: '',
    licenseDocument: null,
    certifications: '',
    specialties: '',
    experience: '',
    education: '',
    bio: '',
    profilePicture: null,
    website: '', 
    linkedinProfile: '', 
    cvOrResumeUrl: null, 
    termsAccepted: false,
    isApproved : "Pending"
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
  
    try {
      const res = await axios.post("http://localhost:3000/api/therapist/register", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
      navigate("/home")
    } catch (err) {
      console.error("Registration Error:", err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <NavBar />
      
      <div className="w-full flex justify-center items-center bg-gradient-to-r from-white to-blue-100 p-5 ">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-xl rounded-xl mt-10 p-8">
  <h1 className="font-poppins font-bold text-2xl text-red-700 mb-3 flex items-center justify-center gap-2">
    <svg className="w-7 h-7 text-red-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
    </svg>
    Registration Instructions
  </h1>
  <p className="text-gray-600 mb-4">
    Please read these instructions carefully to ensure your registration request is processed smoothly and not rejected.
  </p>
  <ol className="list-decimal list-inside space-y-2 text-left text-gray-700">
    <li>
      <span className="font-semibold text-blue-800">License number:</span> This is <span className="underline">not</span> your driving license number. Use your therapist registration document number issued by <span className="font-medium">Sri Lanka Medical Council (SLMC)</span>.
    </li>
    <li>
      <span className="font-semibold text-blue-800">Document upload:</span> Take clear photos of <span className="underline">both sides</span> of your registration legal document and upload them.
    </li>
    <li>
      <span className="font-semibold text-blue-800">Certificates/Courses:</span> List all certificates or courses you have obtained.
    </li>
    <li>
      <span className="font-semibold text-blue-800">Specialties:</span> Enter your areas of expertise in mental health, <span className="italic">comma separated</span>.
    </li>
    <li>
      <span className="font-semibold text-blue-800">Education milestones:</span> Enter key milestones, e.g., <span className="italic">OL, AL, BSc, Masters, PhD, Doctor</span>.
    </li>
  </ol>
</div>

      </div>

      <div className="w-full min-h-screen bg-gradient-to-r from-white to-blue-100 p-10 ">
        <div className="max-w-3xl mx-auto h-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-200 mb-[20px] font-[poppins]">
          <h2 className="text-3xl font-semibold text-[#03045E] text-center">Therapist Registration</h2>
          <p className="text-center text-gray-500 mt-2">Join us and start helping people today.</p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            
            {/* Left Side Section */}
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px]" required />

              <label className="block text-gray-700 mt-4">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px]" required />

              <label className="block text-gray-700 mt-4">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px]" required />

              <label className="block text-gray-700 mt-4">Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px]" required />

              <label className="block text-gray-700 mt-4">Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px]" required />

              {/*Left Side Section */}
              <label className="block text-gray-700 mt-4">Website (Optional)</label>
              <input type="url" name="website" value={formData.website} onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px]" />

              <label className="block text-gray-700 mt-4">LinkedIn Profile (Optional)</label>
              <input type="url" name="linkedinProfile" value={formData.linkedinProfile} onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px]" />

              <label className="block text-gray-700 mt-4">Upload CV/Resume (Optional)</label>
              <input type="file" name="cvOrResumeUrl" onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px] file:cursor-pointer file:bg-blue-200 file:text-blue-700 file:rounded-lg file:px-4 file:py-[1px] file:border-none" accept=".pdf,.doc,.docx" />
            </div>

            {/* Right Side Section */}
            <div>
              <label className="block text-gray-700">License Number</label>
              <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px]" required />

              <label className="block text-gray-700 mt-4">License Issuing Authority</label>
              <input type="text" name="licenseIssuingAuthority" value={formData.licenseIssuingAuthority} onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px]" required />

              <label className="block text-gray-700 mt-4">License Expiry Date</label>
              <input type="date" name="licenseExpiry" value={formData.licenseExpiry} onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px]" required />

              <label className="block text-gray-700 mt-4">Upload License Document</label>
              <input type="file" name="licenseDocument" onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px] file:cursor-pointer file:bg-blue-200 file:text-blue-700 file:rounded-lg file:px-4 file:py-[1px] file:border-none" accept=".pdf,.jpg,.png" required />

              <label className="block text-gray-700 mt-4">Certifications (comma-separated)</label>
              <input type="text" name="certifications" value={formData.certifications} onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px]" required />

              <label className="block text-gray-700 mt-4">Specialties</label>
              <input type="text" name="specialties" value={formData.specialties} onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px]" required />

              <label className="block text-gray-700 mt-4">Years of Experience</label>
              <input type="number" name="experience" value={formData.experience} onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px]" required />

              <label className="block text-gray-700 mt-4">Educational Background</label>
              <input type="text" name="education" value={formData.education} onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px]" required />

              <label className="block text-gray-700 mt-4">Short Bio</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange}
                className="w-full py-1 px-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[10px]" rows="4" required></textarea>
            </div>

            

            {/* Terms and Conditions */}
            <div className="md:col-span-2 flex items-center">
              <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange}
                className="form-checkbox w-5 h-5 text-[#0077B6] rounded-md focus:ring-[#0077B6] cursor-pointer" required />
              <span className="ml-2 text-gray-600">
                I agree to the{' '}
                <a href="/terms" className="text-[#0077B6] font-semibold hover:underline">terms and conditions</a>
              </span>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button type="submit"
                className="w-full px-6 py-3 bg-[#0077B6] text-white font-semibold rounded-xl shadow-md hover:bg-[#023E8A] transition duration-300">
                Send Register Request
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
