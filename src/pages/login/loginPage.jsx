import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/navigationBar";
import Footer from "../../components/footer";
import axios from 'axios';
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const loginData = {
      email: email,
      password: password,
    };
  
    try {
      const response = await axios.post("http://localhost:3000/api/patient/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const token = response.data.token;
      const user = {
        name: response.data.user.name,
        email: response.data.user.email,
        mobile: response.data.user.mobile,
        userRole: response.data.user.userRole,
        emailVerified: response.data.user.emailVerified
      };
      
      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userRole", user.userRole);

      // Check role first
if (user.userRole === "admin") {
  navigate("/admin/requests");
  toast.success('Admin Login Successful!');
} else if (user.userRole === "therapist") {
  navigate("/therapist_dashboard");
  toast.success('Therapist Login Successful!');
} else if (user.userRole === "patient") {
  // Only patients need email verification
  if (!user.emailVerified) {
    navigate("/email_verification");
    toast.error('Please verify your email before logging in.');
    return;
  } else {
    navigate("/patient_dashboard");
    toast.success('User Login Successful!');
  }
} else {
  setErrorMessage("Unknown user role");
}

  
    
      
  
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error('Invalid login credentials')
      } else {
        toast.error('An error occurred during login.')
      }
    }
  };
  

  return (
    <>
      <NavBar />
      <div className="min-h-[calc(100vh-70px)] flex item-center justify-center relative bg-gradient-to-r from-white to-blue-100 py-[20px]">
        <div className="h-[500px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-4xl p-5 px-8 w-full max-w-md text-center mt-[40px] md:mb-[20px]">
          <h2 className="text-3xl text-[#03045E] mb-6 font-[poppins] font-semibold">Let's Seek Peace in Mind</h2>

          <div className="flex justify-center items-center w-[150px] h-[150px] mx-auto">
            <img src="/login-animation-pic.png" alt="login_anime" className="w-full h-full object-contain" />
          </div>



          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[20px]"
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
            <button
              type="submit"
              className="w-full bg-[#0077B6] text-white py-2 rounded-lg font-semibold hover:bg-[#023E8A] transition"
            >
              Login
            </button>
          </form>

          {errorMessage && (
            <div className="mt-4 text-sm text-red-600">{errorMessage}</div>
          )}
          

          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?
            <Link to="/register" className="text-[#0077B6] font-semibold hover:underline ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
