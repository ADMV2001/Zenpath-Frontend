import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PatientEmailVerification() {

  const token = localStorage.getItem("token");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

  const didSendRef = useRef(false);

  // send OTP on mount
  useEffect(() => {
    if (!didSendRef.current) {
      sendOtp();
      didSendRef.current = true;
    }
  }, []);

  // countdown logic
  useEffect(() => {
    if (resendDisabled && timer > 0) {
      const id = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(id);
    }
    if (timer === 0) setResendDisabled(false);
  }, [timer, resendDisabled]);

  //send_otp
  const sendOtp = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/patient/send_otp",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("OTP sent to your email");
      setResendDisabled(true);
      setTimer(60);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP");
    }
  };

  // POST /verify_patient_email
  const handleVerifyEmail = async () => {
    if (otp.length < 6) return;
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/patient/verify_patient_email",
        { otp },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Email verified successfully");
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 text-sm">
          Enter the 6‑digit code we emailed you.
        </p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center text-lg tracking-widest"
          placeholder="● ● ● ● ● ●"
        />

        <div className="flex justify-between items-center">
          <button
            onClick={sendOtp}
            disabled={resendDisabled}
            className="text-sm hover:underline disabled:text-gray-400"
          >
            {resendDisabled ? `Resend in ${timer}s` : "Resend Code"}
          </button>

          <button
            onClick={handleVerifyEmail}
            disabled={loading || otp.length < 6}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
}
