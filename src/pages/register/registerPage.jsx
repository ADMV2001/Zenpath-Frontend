import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/navigationBar";
import Footer from "../../components/footer";
import axios from 'axios';
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerData = {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/patient/register", registerData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      if (response.status === 200) {
        navigate("/login"); // Redirect to login page after successful registration
        
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "An error occurred during registration.");
      } else {
        setErrorMessage("An error occurred during registration.");
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-[calc(100vh-70px)] flex items-center justify-center relative bg-gradient-to-r from-white to-blue-100">
        <div className="h-[600px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-4xl p-5 px-8 w-full max-w-md text-center mt-[40px] mb-[30px]">
          <h2 className="text-3xl text-[#03045E] mb-6 font-[poppins] font-semibold">Create Your Account</h2>

          <div className="flex justify-center items-center w-[150px] h-[150px] mx-auto">
            <img src="/register-animation-pic.jpg" alt="login_anime" className="w-full h-full object-contain" />
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[20px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mobile"
              className="w-full p-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF]"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-[#0077B6] text-white py-2 rounded-lg font-semibold hover:bg-[#023E8A] transition"
            >
              Register
            </button>
          </form>

          {errorMessage && (
            <div className="mt-4 text-sm text-red-600">{errorMessage}</div>
          )}

          
          

          <p className="mt-4 text-sm text-gray-600">
            Already have an account?
            <Link to="/login" className="text-[#0077B6] font-semibold hover:underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
