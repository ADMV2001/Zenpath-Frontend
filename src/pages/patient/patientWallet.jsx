import { useEffect, useState } from "react";
import NavBar from "../../components/navigationBar";
import PatientSidebar from "../../components/patientSideBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PatientWallet(){

    const navigate = useNavigate();
    const [coinAmount, setCoinAmount] = useState(0);
    const [hours, setHours] = useState(0);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        
        if (!token) {
            navigate("/login");
            return;
        }

        axios.get("http://localhost:3000/api/wallet/get_patient_wallet", {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res)=>{
            setCoinAmount(res.data.coins);
        })
    },[])

    return(
        <>
            <NavBar/>
            <div className="flex w-full h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 ">
                <PatientSidebar prop='profile'/>
                <div className="min-h-screen bg-gradient-to-r from-white to-blue-100 border-b border-gray-200 w-500 px-10 py-8">
                    <h1 className="text-3xl font-bold text-blue-900">My Zen Wallet</h1>
                    <p className="text-gray-600 mb-6">Manage Your Wallet in Here</p>

                    <div className="flex items-center bg-white rounded-xl shadow p-4 mb-6 gap-4">
                        <div>
                            Hours Available : {coinAmount}
                        </div>

                        <div>
                            Balance : {coinAmount*30} Minutes Available
                        </div>
                    </div>

                    <form>
                    <label>Enter the coin amount : </label>
                    <input type="text" placeholder="Ex;- 5, 10"/>
                    <label htmlFor="">Hours for Coins</label>
                    <input type="text" placeholder="#"/>
                    <button>Buy Your Coins</button>
                </form>
                </div>

                
            </div>
        </>
        
    )
}