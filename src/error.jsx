import { Link } from "react-router-dom";
import NavBar from "./components/navigationBar";
import Footer from "./components/footer";

export default function Error() {
  return (
    <>
    <NavBar/>
    <div className="h-[calc(100vh-70px)] flex flex-col justify-center items-center text-center bg-gradient-to-r from-white to-blue-100 mt-[-50px]">
        
        <img className="w-[400px] h-[400px]" src="/404.svg" alt="" />
      
      <p className="text-gray-600 mt-2 max-w-md">
        Hello dear, you mistakenly entered here, let me help you go back home.
      </p>
      <Link
        to="/home"
        className="w-[130px] mt-6 px-6 py-2 bg-[#0077B6] text-white rounded-lg text-lg shadow-md hover:bg-[#03045E] transition"
      >
        Go Home
      </Link>
    </div>
    <Footer/>
    </>
  );
}
