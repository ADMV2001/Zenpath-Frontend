import { useState } from "react";
import Footer from "../../components/footer";
import NavBar from "../../components/navigationBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function BasicQuestions() {

  const navigate = useNavigate();

  // State to track progress, current question, and form data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    country: "",
    relationshipStatus: "",
    children: "",
    sexualOrientation: "",
    employmentStatus: "",
    mentalHealthSupport: "",
  });
  const [warning, setWarning] = useState(""); // State for validation warning message

  // List of all countries (as you requested)
  const countryList = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
    "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo (Democratic Republic)",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
    "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
    "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
    "Korea (North)", "Korea (South)", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
    "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
    "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
    "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
    "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
    "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain",
    "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania",
    "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
    "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const countryOptions = countryList.map(country => ({ label: country, value: country }));

  const questions = [
    { id: "age", question: "What is your age?", type: "dropdown", options: ["13-17", "18-24", "25-34", "35-49", "50+", "Prefer not to say"] },
    { id: "gender", question: "What is your gender?", type: "dropdown", options: ["Male", "Female", "Non-binary", "Prefer not to say"] },
    { id: "country", question: "What country are you in?", type: "dropdown", options: countryList || [] },  // Ensure options is never undefined
    { id: "relationshipStatus", question: "What is your relationship status?", type: "dropdown", options: ["Single", "In a relationship", "Married", "Divorced", "Prefer not to say"] },
    { id: "children", question: "Do you have children?", type: "dropdown", options: ["Yes", "No", "Prefer not to say"] },
    { id: "sexualOrientation", question: "What is your sexual orientation?", type: "dropdown", options: ["Straight", "LGBTQ+", "Prefer not to say"] },
    { id: "employmentStatus", question: "What is your current employment status?", type: "dropdown", options: ["Employed", "Student", "Unemployed", "Retired", "Other"] },
    { id: "mentalHealthSupport", question: "Are you currently receiving mental health support?", type: "dropdown", options: ["Yes", "No", "Thinking about it"] },
  ];

  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleInputChange = (e, id) => {
    setFormData({ ...formData, [id]: e.target.value });
    setWarning(""); // Reset warning when user selects an option
  };

  const goToNextQuestion = () => {
    if (formData[questions[currentQuestionIndex].id]) {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    } else {
      setWarning("Please select an answer before proceeding.");
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user")); // assuming you store user data after login

      if(user.userRole != "patient"){
        navigate("/login")
        toast.error("Please login as a patient to access this page.")
        return
      }
  
      const res = await axios.post(
        "http://localhost:5000/api/basic/submit",
        {
          ...formData,
          name: user.name,
          email: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      toast.success("Data submitted successfully");
      navigate("/advanced_questions");
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong while submitting.");
    }
  };
  
  return (
    <>
      <NavBar />
      <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-r from-white to-blue-100 px-6 md:px-16 py-12 font-[Poppins]">
        {/* Progress Bar */}
        <div className="w-full max-w-4xl mb-6">
          <div className="text-gray-700 font-medium mb-1">Progress: {Math.round(progress)}%</div>
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Box */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-[#03045E] mb-4 text-center">Let's Talk About You a Little Bit</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-2">{questions[currentQuestionIndex].question}</label>
              <select
                className="w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-1"
                onChange={(e) => handleInputChange(e, questions[currentQuestionIndex].id)}
                value={formData[questions[currentQuestionIndex].id] || ""}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {questions[currentQuestionIndex].options?.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {/* Warning Message */}
              {warning && <p className="text-red-500 mt-2">{warning}</p>}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {currentQuestionIndex > 0 && (
                <button
                  type="button"
                  onClick={goToPreviousQuestion}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition"
                >
                  Previous
                </button>
              )}
              {currentQuestionIndex < totalQuestions - 1 && (
                <button
                  type="button"
                  onClick={goToNextQuestion}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Next
                </button>
              )}
              {currentQuestionIndex === totalQuestions - 1 && (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Explanations Section */}
    <section className="w-full max-w-6xl mt-12 text-center px-4">
    <h2 className="text-lg md:text-5xl font-bold text-blue-600 mb-8">
      Why Therapy?
    </h2>

        <p className="text-gray-600 text-lg md:text-xl mb-6">
            Life can be overwhelming, but therapy provides a supportive space to
            navigate challenges, heal, and grow. Take that empowering first step.
        </p>
        
        {/* Icon List Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 ">
        <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-4 rounded-full shadow-md">
                <img src="discover.png" alt="Coping Strategies" className="w-12 h-10 object-cover" />
            </div>
            <div className="text-left">
                <h3 className="text-xl font-semibold text-[#03045E]">
                Discover New Coping Strategies
                </h3>
                <p className="text-gray-700 text-base mt-1">
                Learn effective ways to manage stress, anxiety, and life's challenges.
                </p>
            </div>
        </div>

            <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-4 rounded-full shadow-md">
                <img src="relationship.png" alt="Healthy Relationships" className="w-12 h-10 object-cover" />
            </div>
            <div className="text-left">
                <h3 className="text-xl font-semibold text-[#03045E]">
                Build Healthier Relationships
                </h3>
                <p className="text-gray-700 text-base mt-2">
                Improve communication skills and deepen your connections with others.
                </p>
            </div>
            </div>

            <div className="flex items-start space-x-4">
            <div className="bg-orange-100 p-4 rounded-full shadow-md">
                <img src="safe.png" alt="Safe Space" className="w-12 h-10 object-cover" />
            </div>
            <div className="text-left">
                <h3 className="text-xl font-semibold text-[#03045E]">
                Share in a Safe Space
                </h3>
                <p className="text-gray-700 text-base mt-2">
                Open up in a supportive, judgment-free environment designed for you.
                </p>
            </div>
            </div>

            <div className="flex items-start space-x-4">
            <div className="bg-pink-100 p-4 rounded-full shadow-md">
                <img src="clarity.png" alt="Gain Insights" className="w-12 h-10 object-cover" />
            </div>
            <div className="text-left">
                <h3 className="text-xl font-semibold text-[#03045E]">
                Gain Clarity and Insights
                </h3>
                <p className="text-gray-700 text-base mt-2">
                Understand yourself better and find direction in difficult times.
                </p>
            </div>
            </div>
        </div>
    </section>

      </div>
      
      <Footer />
    </>
  );
}
