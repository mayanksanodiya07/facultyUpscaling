// import { useOutletContext  } from "react-router-dom";
// import Button from "../components/Button";
import axios from "axios";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import FacultyList from "./FacultyList";
// import { useState } from "react";
// import axios from "axios";

function AdminDashboard() {
  const [faculties, setFaculties] = useState();

  useEffect(() => {
    async function fetchFaculties() {
      try {
        const res = await axios.get("http://localhost:5000/admin/dashboard");
        setFaculties(res.data);
        console.log(faculties);
      } catch (err) {
        console.error("error", err?.response?.data);
        // setError(err?.response?.data);
      }
    }
    fetchFaculties();
  }, []);

  return (
    <>
      <SideBar />
      <div className="ml-56 mt-14 pt-4 px-14 text-[#212529] h-full ">
        <h1 className="text-xl font-semibold pl-2 ">Admin Dashboard</h1>
        <div className="flex justify-between mt-4">
          <div className="border w-2/7 flex justify-center items-center py-3 flex-col">
            <p className="font-semibold">Total Faculties</p>
            <p>{faculties?.length}</p>
          </div>
          <div className="border w-2/7 flex justify-center py-3">
            <p className="font-semibold">Upcoming Appraisals</p>
            <p></p>
          </div>
          <div className="border w-2/7 flex justify-center py-3">
            <p className="font-semibold">Pending Reviews</p>
            <p></p>
          </div>
        </div>
        <div className=" mt-4 px-4 py-4 border-2 rounded-xl ">
          <h1 className="text-xl font-semibold pl-2 ">Recent Faculty Activity</h1>
          <FacultyList faculties={faculties} />
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;
