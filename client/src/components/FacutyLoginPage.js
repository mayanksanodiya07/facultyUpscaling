import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import OrAuth from "../components/OrAuth";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function FacutyLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }

    // Validate password
    if (validatePassword(email)) {
      setPasswordError(
        "Password must be at least 8 characters, with uppercase, lowercase, numbers, and special characters."
      );
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/faculty/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setLoginStatus("Logged in Successfully");
      navigate(`/faculty/dashboard/${res.data.user._id}`);
    } catch (err) {
      setLoginStatus(err?.response?.data?.message || "An error occurred.");
      console.error("error", err?.response?.data);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="mx-auto my-20 mt-36 w-80 px-4 py-4 border-2 rounded-3xl flex flex-col items-center">
      <h1 className="font-bold text-2xl mb-3 text-[#FE444F]">Faculty Login</h1>

      <form onSubmit={handleSubmit} className="flex w-60 flex-col items-center">
        {/* Email Input */}
        <input
          className="py-1 px-3 mb-3 w-full border rounded-full"
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

        {/* Password Input */}
        <div className="relative w-full">
          <input
            className="py-1 px-3 mb-3 w-full border rounded-full"
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 py-1 cursor-pointer text-[#212529]"
          >
            <FontAwesomeIcon
              className="w-9"
              icon={showPassword ? faEyeSlash : faEye}
            />
          </span>
        </div>
        {passwordError && (
          <p className="text-red-500 text-sm mb-3">{passwordError}</p>
        )}

        {/* Login CustomButton */}
        <span>
          <CustomButton type={"small"}>Login</CustomButton>
        </span>
        <p className="text-red-500 mt-2">{loginStatus}</p>

        {/* Links for Forgot Password and Sign Up */}
        <p className="w-fit mx-auto mt-2">
          <Link
            to="/faculty/forgot-password"
            className="text-blue-500 underline"
          >
            Forgot Password?
          </Link>
        </p>
        <p className="w-fit mx-auto mt-2">
          Click here for{" "}
          <Link
            to={"/faculty/signup"}
            className="underline text-blue-500 cursor-pointer"
          >
            Sign Up
          </Link>
        </p>

        {/* OR Divider */}
        {/* <div className="relative flex items-center w-full mt-3">
          <span className="flex-grow h-px bg-gray-300"></span>
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <span className="flex-grow h-px bg-gray-300"></span>
        </div> */}

        {/* Other Auth Options */}
        {/* <div className="w-full mt-3">
          <OrAuth />
        </div> */}
      </form>
    </div>
  );
}

export default FacutyLoginPage;
