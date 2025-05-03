import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/navigationBar";
import Footer from "../../components/footer";
import axios from "axios";

export default function TherapistLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/therapist/login", {
        email,
        password,
      });

      // Save token and user info to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.therapist));
      console.log("Login response:", res.data);


      alert("Login successful!");
      navigate("/"); // You can redirect to dashboard or homepage
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-gradient-to-r from-white to-blue-100 font-[poppins]">
        <div className="h-[500px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-4xl p-5 px-8 w-full max-w-md text-center mt-[40px]">
          <h2 className="text-3xl text-[#03045E] mb-6 font-semibold">Therapist Login</h2>

          <div className="flex justify-center">
            <img src="/login_animation.gif" alt="login_anime" />
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] mt-[20px] text-[13px]"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#90E0EF] text-[13px]"
              required
            />
            <button type="submit" className="w-full bg-[#0077B6] text-white py-2 rounded-lg font-semibold hover:bg-[#023E8A] transition">
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Become a therapist
            <Link to="/therapist_registration" className="text-[#0077B6] font-semibold hover:underline ml-1">
              Register Here
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
