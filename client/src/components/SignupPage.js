import { Link, useNavigate } from "react-router-dom";
import OrAuth from "../components/OrAuth";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const res = await axios.post("http://localhost:5000/faculty/signup", {
          email: email,
          password: password,
        });
        // console.log("asasa", res.data);
        // alert("Data sent!");
        navigate("/faculty/login")
      } catch (err) {
        console.error("error", err?.response?.data);
        console.error("error..............");
        setError(err?.response?.data);
      }
    }
  };

  return (
    <div className="mx-auto my-20 w-80 px-4 py-4 border-2 rounded-3xl flex flex-col items-center">
      <h1 className="font-bold text-2xl mb-3 text-[#FE444F]">Faculty Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          className="py-1 px-3 mb-3 w-full border rounded-full"
          type="text"
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
          id="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span className="">
          <Button type={"small"}>SignUp</Button>
        </span>
        <p>{error}</p>
        <p className="w-fit mx-auto mt-2">
          click here for{" "}
          <Link
            to={"/faculty/login"}
            className="underline text-blue-500 cursor-pointer"
          >
            Login
          </Link>
        </p>
        <div className="w-full mt-3">
          <OrAuth />
        </div>
      </form>
    </div>
  );
}
export default SignupPage;
