import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPasswordPage() {
  const { userId, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
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
      const res = await axios.post(
        `http://localhost:5000/faculty/reset-password/${userId}/${token}`,
        { newPassword }
      );
      setMessage(res.data.message);
      navigate("/faculty/login");
    } catch (err) {
      setMessage(err?.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="mx-auto my-20 w-80 px-4 py-4 border-2 rounded-3xl flex flex-col items-center">
      <h1 className="font-bold text-2xl mb-3 text-[#FE444F]">Reset Password</h1>

      <form onSubmit={handleResetPassword} className="flex flex-col items-center">
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Reset Password
        </button>
        <p className="text-red-500 mt-2">{message}</p>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
