import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

function VerificationPrompt() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "your registered email";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#FE444F]">Verify Your Email</h2>
        <p className="text-gray-700 mb-6">
          A verification link has been sent to <strong>{email}</strong>.
          Please check your inbox and click the link to verify your email address.
        </p>
        <Button onClick={() => navigate("/faculty/login")} type="small">
          Go to Login
        </Button>
      </div>
    </div>
  );
}

export default VerificationPrompt;
