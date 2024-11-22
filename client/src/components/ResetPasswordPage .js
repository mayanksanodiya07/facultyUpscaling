import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./Loading";
import { Spinner } from "react-bootstrap";

function ResetPasswordPage() {
  const { id, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    
    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:5000/faculty/reset-password/${id}/${token}`,
        { newPassword }
      );
      setMessage(res.data.message);
      navigate("/faculty/login");
    } catch (err) {
      setMessage(err?.response?.data?.message || "An error occurred.");
    }
finally{

  setIsLoading(false);
}
  };

  return (
    <>
      <div
        className={`relative mx-auto mt-36 mb-20 w-80 px-10 py-4 border-2 rounded-3xl `}
      >
        {isLoading && <LoadingSpinner />}
        <div className={`${isLoading ? "blur-sm pointer-events-none" : ""}`}>
        <h1 className="font-bold text-2xl mb-3 text-[#FE444F]">
          Reset Password
        </h1>

        <form
          onSubmit={handleResetPassword}
          className="flex flex-col items-center"
        >
          <input
            className="py-1 px-3 mb-3 w-full border rounded-full"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            className="py-1 px-3 mb-3 w-full border rounded-full"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Reset Password
          </button>
          <p className="text-red-500 mt-2">{message}</p>
        </form>

      </div>
      </div>
    </>
  );
}

export default ResetPasswordPage;
