import { useEffect, useState } from "react";
import Therapistnavbar from "../../components/navigationBarTherapist";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsCoin, BsBank } from "react-icons/bs";

export default function TherapistWallet() {
  const navigate = useNavigate();
  const [coinAmount, setCoinAmount] = useState(0);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/api/wallet/get_patient_wallet", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCoinAmount(res.data.coins);
      });
  }, [navigate]);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/wallet/withdraw",
        {
          coins: coinAmount,
          bankName,
          accountNumber,
          withdrawalAmount,
          accountHolder,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({ type: "success", text: response.data.message });
      // Optionally reset form
      setBankName("");
      setAccountNumber("");
      setWithdrawalAmount("");
      setAccountHolder("");
      setPassword("");
    } catch (error) {
      const errMsg = error.response?.data?.message || "Withdrawal failed.";
      setMessage({ type: "error", text: errMsg });
    }
  };

  const cashEquivalent = (coinAmount * 1000).toFixed(2);

  return (
    <>
      <Therapistnavbar isLogged={true} />
      <div className="min-h-screen bg-gradient-to-r from-white to-blue-100 flex flex-col">
        <div className="flex flex-1">
          <div className="w-[205px]">
            <Sidebar prop="Profile" />
          </div>

          <main className="flex-1 p-10">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">My Zen Wallet</h1>
            <p className="text-gray-600 mb-8">Withdraw your earned Zen coins to your bank account</p>

            {/* Wallet Overview */}
            <div className="bg-white rounded-xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg relative">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Earned Coins</h2>
                <p className="text-3xl font-bold text-blue-700">{coinAmount}</p>
                <BsCoin className="absolute left-[30px] top-[30px] w-[50px] h-[50px]" />
              </div>
              <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg relative">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Cash Equivalent</h2>
                <p className="text-3xl font-bold text-blue-700">LKR {cashEquivalent} </p>
                <BsBank className="absolute left-[30px] top-[30px] w-[50px] h-[50px]" />
              </div>
            </div>

            {/* Withdraw Form */}
            
            <form
              className="bg-white rounded-xl shadow p-6 w-full h-[350px] overflow-y-scroll ]"
              onSubmit={handleWithdraw}
            >
                <div className="min-h-[450px] bg-white">
              <h3 className="text-2xl font-bold mb-2 text-blue-800">Withdraw to Bank</h3>
                <p className="text-gray-400 mb-2 text-s">
                Please enter your bank details to proceed with the coin withdrawal. Ensure all information is accurate. A minimum balance of 5 coins is required to initiate a withdrawal.
            </p>

              {message && (
                <div className={`mb-4 p-4 rounded text-white ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                  {message.text}
                </div>
              )}

              <div className="mb-2">
                <label className="block text-gray-700 font-semibold mb-2">Bank Name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 font-semibold mb-2">Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 font-semibold mb-2">Withdrawal Amount</label>
                <input
                  type="text"
                  value={withdrawalAmount}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 font-semibold mb-2">Account Holder Name</label>
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>

              

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer float-right mt-4"
              >
                Withdraw Coins
              </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}