export default function TherapistInstructions() {

    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Instructions for Therapist Registration</h1>
            <p className="text-lg mb-2">Please follow these steps to complete your registration:</p>
            <ol className="list-decimal list-inside text-left">
                <li>Fill out the registration form with accurate information.</li>
                <li>Upload the required documents, including your license and certifications.</li>
                <li>Ensure that all fields are completed before submitting.</li>
                <li>Once submitted, you will receive a confirmation email.</li>
                <li>Wait for approval from our team. You will be notified via email.</li>
            </ol>
        </div>
    )
}