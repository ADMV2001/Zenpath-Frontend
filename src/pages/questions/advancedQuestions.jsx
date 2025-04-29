import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navigationBar";
import Footer from "../../components/footer";
import axios from "axios";

const PHQ9_QUESTIONS = [
  "Q1: Little interest or pleasure in doing things",
  "Q2: Feeling down, depressed, or hopeless",
  "Q3: Trouble falling or staying asleep, or sleeping too much",
  "Q4: Feeling tired or having little energy",
  "Q5: Poor appetite or overeating",
  "Q6: Feeling bad about yourself – or that you are a failure or have let yourself or your family down",
  "Q7: Trouble concentrating on things, such as reading the newspaper or watching television",
  "Q8: Moving or speaking so slowly that other people could have noticed? Or the opposite – being so fidgety or restless that you have been moving around a lot more than usual",
  "Q9: Thoughts that you would be better off dead, or of hurting yourself in some way",
];

const AdvancedQuestions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phq9Answers, setPhq9Answers] = useState(Array(PHQ9_QUESTIONS.length).fill(0));
  const [result, setResult] = useState("");
  const [redirectPage, setRedirectPage] = useState("");
  const [showReport, setShowReport] = useState(false);
  const navigate = useNavigate();

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...phq9Answers];
    updatedAnswers[index] = value;
    setPhq9Answers(updatedAnswers);
  };

  const calculateScore = async () => {
    const score = phq9Answers.reduce((total, current) => total + current, 0);

    let status = "No depression";
    if (score >= 5 && score <= 9) status = "Mild depression";
    else if (score >= 10 && score <= 14) status = "Moderate depression";
    else if (score >= 15) status = "Severe depression";

    setResult(`PHQ-9: ${status}`);
    setShowReport(true);

    // Routing suggestion
    if (score === 0) setRedirectPage("resources");
    else if (score >= 5 && score <= 9) setRedirectPage("therapistSelections");
    else if (score >= 10) setRedirectPage("doctorConsult");

    // Submit to backend
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/phq/submit",
        {
          name: user.name,
          email: user.email,
          answers: phq9Answers,
          score,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Error submitting PHQ-9 data:", err);
    }
  };

  const handleProceed = () => {
    if (redirectPage === "resources") navigate("/resources");
    else if (redirectPage === "therapistSelections") navigate("/therapistSelections");
    else if (redirectPage === "doctorConsult") alert("We recommend you meet a doctor immediately for further treatment.");
  };

  const nextQuestion = () => {
    if (currentIndex < PHQ9_QUESTIONS.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const currentQuestion = PHQ9_QUESTIONS[currentIndex];
  const progressPercentage = ((currentIndex + 1) / PHQ9_QUESTIONS.length) * 100;

  return (
    <>
      <NavBar />
      <div className="bg-gradient-to-r from-white to-blue-100 w-full">
        <div className="p-6 max-w-3xl mx-auto">
          <div className="mb-2 text-gray-600 font-medium">
            Progress: {Math.round(progressPercentage)}%
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>

          <h2 className="text-3xl font-bold text-center text-blue-700 mb-8 mt-12">
            Let's find out what is going on with you
          </h2>

          <div className="bg-white p-6 rounded-lg shadow-xl mt-6">
            <h3 className="text-xl font-semibold mb-4 text-black">{currentQuestion}</h3>
            <div className="space-y-4">
              {[0, 1, 2, 3].map((value) => (
                <label key={value} className="block text-lg text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    value={value}
                    checked={value === phq9Answers[currentIndex]}
                    onChange={() => handleAnswerChange(currentIndex, value)}
                    className="mr-2"
                  />
                  {["Not at all", "Several days", "More than half the days", "Nearly every day"][value]}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button onClick={prevQuestion} className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Previous
            </button>
            {currentIndex === PHQ9_QUESTIONS.length - 1 ? (
              <button onClick={calculateScore} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Submit
              </button>
            ) : (
              <button onClick={nextQuestion} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Next
              </button>
            )}
          </div>

          {showReport && (
            <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-xs">
              <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold text-blue-800">Your Medical Report</h3>
                  <button onClick={() => setShowReport(false)} className="text-gray-500 hover:text-gray-700">X</button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">Patient Information</h4>
                    <ul className="list-disc pl-6">
                      <li><strong>Name:</strong> {JSON.parse(localStorage.getItem("user")).name}</li>
                      <li><strong>Email:</strong> {JSON.parse(localStorage.getItem("user")).email}</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">Scores</h4>
                    <p><strong>PHQ-9 Score:</strong> {phq9Answers.reduce((total, current) => total + current, 0)}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">Interpretation</h4>
                    <p className="text-gray-700">{result}</p>
                  </div>

                  <div className="mt-6">
                    <button onClick={handleProceed} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdvancedQuestions;
