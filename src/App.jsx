import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/homePage';
import LoginPage from './pages/login/loginPage';
import Error from './error';
import TherapistRegistration from './pages/therapistRegister/therapistRegister';
import TherapistLogin from './pages/therapistLogin/therapistLogin';
import BasicQuestions from './pages/questions/basicQuestions';
import AdvancedQuestions from './pages/questions/advancedQuestions';
import RegisterPage from './pages/register/registerPage';
import AdminDashboard from './pages/admin/adminDashboard';
import PendingRequests from './pages/admin/pendingRequests';
import Profile from './components/profile';
import TherapistList from './pages/home/therapistList';
import { Toaster } from 'react-hot-toast';
import AboutZenPath from './pages/home/aboutus';
import ContactUs from './pages/home/contactus';
import TherapistDashboard from './pages/therapist/therapistDashboard';
import PatientEmailVerification from './pages/emailVerification/PatientEmailVerification';
import TherapistOverview from './pages/therapist/therapistOverview';
import Sessions from './pages/patient/sessions';
import PatientRequests from './pages/therapist/patientRequests';
import TherapistProfile from './pages/therapist/therapistProfile';
import Appointments from './pages/therapist/appointments';


function App() {

  return (
    <BrowserRouter>
    <Toaster/>
      <Routes>
        //main routes
        <Route path="/home" element={<HomePage/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/*" element={<Error/>} />

        //admin routes
        <Route path="/admin/*" element={<AdminDashboard/>}/> 

        //login and register routes
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/therapist_registration" element={<TherapistRegistration/>} />
        <Route path="/therapist_login" element={<TherapistLogin/>} />

        //questions routes
        <Route path="/get-started" element={<BasicQuestions/>} />
        <Route path="/advanced_questions" element={<AdvancedQuestions/>} />

        //Home
        <Route path="/about" element={<AboutZenPath />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/profile" element={<Profile />} />

        //Get details
        <Route path="/therapist_list" element={<TherapistList />} />

        //therapist
        <Route path="/therapist_dashboard" element={<TherapistDashboard/>}/>
        <Route path="/therapist_overview/:id" element={<TherapistOverview/>}/>
        <Route path="/therapistProfile" element={<TherapistProfile/>}/>
        <Route path="/appointments" element={<Appointments/>}/>

        //Patients
        <Route path="/session_requests" element={<Sessions/>}/>
        <Route path="/patient_requests" element={<PatientRequests/>}/>

        //emails
        <Route path="/email_verification" element={<PatientEmailVerification/>} />

        
      </Routes>
    </BrowserRouter>
  )
}

export default App
