import { Link } from "react-router-dom";
import NavBar from "../../components/navigationBar";
import LandingPage from "./landingPage";
import Footer from "../../components/footer";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <LandingPage/>
      
      <Footer/>

    </>
  );
}
