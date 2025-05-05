import { useEffect, useState } from "react";
import NavBar from "../../components/navigationBar";
import PatientSidebar from "../../components/patientSideBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { BsCoin } from "react-icons/bs";
import { IoMdTimer } from "react-icons/io";

export default function PatientWallet() {
  const navigate = useNavigate();
  const [coinAmount, setCoinAmount] = useState(0);
  const [buyCoins, setBuyCoins] = useState("");
  const [price, setPrice] = useState(0);
  const [hours, setHours] = useState(0);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      // Get pending coins from localStorage
      const coins = parseInt(localStorage.getItem("pendingCoins"), 10);
      if (coins && coins > 0) {
        const token = localStorage.getItem("token");
        axios.post(
          "http://localhost:3000/api/wallet/add_coins",
          { coins },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ).then(() => {
          setShowSuccess(true);
          localStorage.removeItem("pendingCoins");
          
          //reload wallet balance
          axios.get("http://localhost:3000/api/wallet/get_patient_wallet", {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => {
            setCoinAmount(res.data.coins);
          });
        });
      } else {
        setShowSuccess(true); // fallback
      }
      window.history.replaceState({}, document.title, "/patient_wallet");
    } else if (params.get("canceled") === "true") {
      setShowFail(true);
      window.history.replaceState({}, document.title, "/patient_wallet");
      localStorage.removeItem("pendingCoins");
    }
  }, []);
  

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

    // Update hours field dynamically as user types coin amount
    useEffect(() => {
        const coins = parseInt(buyCoins, 10);
        setHours(isNaN(coins) ? 0 : coins * 0.5);
        setPrice(isNaN(coins) ? 0 : coins * 1000); 
    }, [buyCoins]);

 

  async function makePayment(e) {
    e.preventDefault();
    
    const stripe = await loadStripe("pk_test_51RL3hG4ZqxWyRLox18oOnwknxptEL1BWffeCjDqiYPKeVL0uaaXYlYu4zY4WoQbaPXoxDSZDp5tMODZXVqyrJjbx00dwZS0Eo3");
    const token = localStorage.getItem("token");
    const coins = parseInt(buyCoins, 10);
    
    localStorage.setItem("pendingCoins", coins); // Store coins to be added after payment
  
    const response = await axios.post(
      "http://localhost:3000/api/wallet/create-checkout-session",
      { coins },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    window.location.href = response.data.url;
  }
  

  return (
    <>

        {showSuccess && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            <h2 className="text-2xl font-bold mb-2 text-green-700">Payment Successful!</h2>
            <p className="mb-4 text-gray-700">Your coins have been added to your wallet.</p>
            <button
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                onClick={() => setShowSuccess(false)}
            >
                Close
            </button>
            </div>
        </div>
        )}

        {showFail && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6"/>
            </svg>
            <h2 className="text-2xl font-bold mb-2 text-red-700">Payment Failed!</h2>
            <p className="mb-4 text-gray-700">Your payment was not completed. Please try again.</p>
            <button
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                onClick={() => setShowFail(false)}
            >
                Close
            </button>
            </div>
        </div>
        )}


      <NavBar />
      <div className="min-h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 flex flex-col">
        <div className="flex flex-1">
          <PatientSidebar prop="profile" />
          <main className="flex-1 p-10">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">My Zen Wallet</h1>
            <p className="text-gray-600 mb-8">Manage your wallet here</p>

            {/* Wallet Overview */}
            <div className="bg-white rounded-xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg relative">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Coins Available</h2>
                <p className="text-3xl font-bold text-blue-700">{coinAmount}</p>
                <BsCoin className="absolute left-[30px] top-[30px] w-[50px] h-[50px]"/>
              </div>
              <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg relative ">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Hours Available</h2>
                <p className="text-3xl font-bold text-blue-700">{(coinAmount * 0.5)} Hours</p>
                <IoMdTimer className="absolute left-[30px] top-[30px] w-[50px] h-[50px]"/>
              </div>
            </div>

            {/* Buy Coins Form */}
            <form
              className="bg-white rounded-xl shadow p-6  mx-auto w-full"
              onSubmit={makePayment}
            >
              <label htmlFor="coinAmount" className="block text-gray-700 font-semibold mb-2">
                Enter the coin amount:
              </label>
              <input
                id="coinAmount"
                type="number"
                min="1"
                value={buyCoins}
                onChange={(e) => setBuyCoins(e.target.value)}
                placeholder="Ex: 5, 10"
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            <div className="mb-6">
                <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
                  Price (LKR)
                </label>
                <input
                  id="price"
                  type="text"
                  value={price ? price : ""}
                  placeholder="Price"
                  readOnly
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="hours" className="block text-gray-700 font-semibold mb-2">
                  Hours for Coins
                </label>
                <input
                  id="hours"
                  type="text"
                  value={hours ? hours : ""}
                  placeholder="Hours Available"
                  readOnly
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>
              

              <button
                type="submit"
                className="w-[200px] bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
              >
                Buy Your Coins
              </button>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}
