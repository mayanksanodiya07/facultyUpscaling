import FacultyStrip from "./FacultyStrip";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavDropdown } from "react-bootstrap";

function FullFacultyList() {
  const [faculties, setFaculties] = useState();
  const [sortAccording, setSortAccording] = useState("sort");

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

  useEffect(() => {
    
    if (sortAccording === "username") {
      let sortedFaculties = [...faculties]?.sort((a, b) => {
        return new Date(b.username) - new Date(a.username);
      });
      setFaculties(sortedFaculties);
      console.log(sortAccording)
    }
  }, [sortAccording]);

  return (
    <>
      <div className="mt-14">
        <SideBar />
      </div>
      <div className=" ml-56 px-5 ">
        <div className="pt-3">
          <select
            name="sort"
            value={sortAccording}
            onChange={(e) => setSortAccording(e.target.value)}
          >
            <option value="sort" disabled>
              Sort By
            </option>
            <option value="username">Username</option>
            <option value="date">Date</option>
            <option value="designation">Designation</option>
          </select>
        </div>
        <table className="  mb-10 list-none border-collapse w-full">
          <thead className="pt-5">
            <tr className="">
              <th className="pb-3 px-2 pt-7">Faculty Name</th>
              <th className="pb-3 px-2 pt-7">Designation</th>
              <th className="pb-3 px-2 pt-7">Last Update</th>
              <th className="pb-3 px-2 pt-7">Action</th>
            </tr>
          </thead>
          <tbody>
            {faculties?.map((faculty, index) => (
              <FacultyStrip key={index} faculty={faculty} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FullFacultyList;
