import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import OrAuth from "../components/OrAuth";
import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  // const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/faculty/login", {
        username: username,
        password: password,
      });
      setLoginStatus("logged in Successfully");
      navigate(`/faculty/faculty-profile/${res.data.objId}`);
      console.log(res.data.objId);
    } catch (err) {
      console.error("error", err?.response?.data);
      // setError(err?.response?.data);
    }
  };

  return (
    <div className="mx-auto my-20 w-80 px-4 py-4 border-2 rounded-3xl flex flex-col items-center">
      <h1 className="font-bold text-2xl mb-3 text-[#FE444F]">Faculty Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          className="py-1 px-3 mb-3 w-full border rounded-full"
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="py-1 px-3 mb-3 w-full border rounded-full"
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="">
          <Button type={"small"}>Login</Button>
        </span>
        <p>{loginStatus}</p>
        <p className="w-fit mx-auto mt-2">
          click here for{" "}
          <Link
            to={"/faculty/signup"}
            className="underline text-blue-500 cursor-pointer"
          >
            SignUp
          </Link>
        </p>
        <div class="relative flex items-center w-full mt-3">
          <span class="flex-grow h-px bg-gray-300"></span>
          <span class="px-2 text-gray-500 text-sm">OR</span>
          <span class="flex-grow h-px bg-gray-300"></span>
        </div>
        <div className="w-full mt-3">
          <OrAuth />
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
