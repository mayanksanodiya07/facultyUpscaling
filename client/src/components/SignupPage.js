import { Link, useNavigate } from "react-router-dom";
import OrAuth from "../components/OrAuth";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner from react-bootstrap
import LoadingSpinner from "./Loading";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:5000/faculty/signup", {
          email,
          password,
        });
        // Redirect to verification prompt page after signup
        navigate("/faculty/verify-prompt", { state: { email } });
      } catch (err) {
        console.error("error", err?.response?.data);
        setSignupStatus(err?.response?.data);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div
        className={`relative mx-auto mt-36 mb-20 w-80 px-10 py-4 border-2 rounded-3xl `}
      >
        {loading && <LoadingSpinner />}
        <div className={`${loading ? "blur-sm pointer-events-none" : ""}`}>
          <h1 className="font-bold text-2xl mb-3 text-[#FE444F]">
            Faculty Signup
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              className="py-1 px-3 mb-3 w-full border rounded-full"
              type="email"
              id="email"
              name="email"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="py-1 px-3 mb-3 w-full border rounded-full"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="py-1 px-3 ml-1 mb-3 w-full border rounded-full"
              type="password"
              id="confirm-password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span>
              <Button type={"small"}>SignUp</Button>
            </span>
            <p className="text-red-500">{signupStatus}</p>
            <p className="w-fit mx-auto mt-2">
              click here for{" "}
              <Link
                to={"/faculty/login"}
                className="underline text-blue-500 cursor-pointer"
              >
                Login
              </Link>
            </p>
          </form>
          {/* <div className="relative flex items-center w-full mt-3">
            <span className="flex-grow h-px bg-gray-300"></span>
            <span className="px-2 text-gray-500 text-sm">OR</span>
            <span className="flex-grow h-px bg-gray-300"></span>
          </div>
          <div className="w-full mt-3">
            <OrAuth />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default SignupPage;
