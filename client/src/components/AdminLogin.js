import { Link, useNavigate, useOutletContext } from "react-router-dom";
import CustomButton  from "../components/CustomButton";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

function AdminLogin() {
  const navigate = useNavigate();
  // // const { setAdminData } = useOutletContext();
  // console.log(useOutletContext());

  const [username, setUsername] = useState("mayankadmin");
  const [password, setPassword] = useState("123");
  const [loginStatus, setLoginStatus] = useState("");
  // const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/admin/login", {
        username: username,
        password: password,
      });
      const adminData = { username: res.data.username, id: res.data.objId };
      // setAdminData(adminData);
      await Cookies.set("id", `${res.data.objId}`);
      await Cookies.set("username" , `${res.data.username}`);
      // console.log(res.data.username)
      // console.log(Cookies.get(`id`))
      navigate(`/admin/dashboard`, { state: adminData });
    } catch (err) {
      console.error("error", err?.response?.data);
      // setError(err?.response?.data);
    }
  };

  return (
    <div className="mx-auto my-20 w-80 px-4 py-4 border-2 rounded-3xl flex flex-col items-center">
      <h1 className="font-bold text-2xl mb-3 text-[#FE444F]">Admin Login</h1>

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
          <CustomButton type={"small"}>Login</CustomButton>
        </span>
        <p>{loginStatus}</p>
        <p className="w-fit mx-auto mt-2">
          click here for{" "}
          <Link
            to={"/admin/signup"}
            className="underline text-blue-500 cursor-pointer"
          >
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
}
export default AdminLogin;
