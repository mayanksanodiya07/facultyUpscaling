import { useState } from "react";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import LoadingSpinner from "./Loading";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/faculty/forgot-password",
        {
          email,
        }
      );

      setMessage("Password reset link has been sent to your email.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "An error occurred.");
      console.error("Error:", err?.response?.data);
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`relative mx-auto mt-36 mb-20 w-80 px-10 py-4 border-2 rounded-3xl `}
    >
      {isLoading && <LoadingSpinner />}
      <div className={`${isLoading ? "blur-sm pointer-events-none" : ""}`}>
        <h1 className="font-bold text-2xl mb-3 text-[#FE444F]">
          Forgot Password
        </h1>

        <form
          onSubmit={handlePasswordReset}
          className="flex flex-col items-center"
        >
          <input
            className="py-1 px-3 mb-3 w-full border rounded-full"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>
            <CustomButton type={"small"}>Send Reset Link</CustomButton>
          </span>
          <p className="text-green-500 mt-2">{message}</p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
