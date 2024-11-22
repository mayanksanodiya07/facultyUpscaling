import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faUser, faClipboardList, faCogs } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../components/SideBar";
import XFacultyList from "./XFacultyList";
import { useEffect, useState } from "react";

function AdminDashboard() {

    const [faculties, setFaculties] = useState([
        {
          _id: "1",
          username: "John Doe",
          lastUpdate: "2024-10-25T12:30:00Z",
          professionalInfo: {
            designation: "Professor",
            department: "Computer Engineering"
          },
          code: "FCE1001" // Random code
        },
        {
          _id: "2",
          username: "Alice Smith",
          lastUpdate: "2024-10-20T11:00:00Z",
          professionalInfo: {
            designation: "Assistant Professor",
            department: "Electrical Engineering"
          },
          code: "FEE1002" // Random code
        },
        {
          _id: "3",
          username: "Bob Johnson",
          lastUpdate: "2024-10-22T09:15:00Z",
          professionalInfo: {
            designation: "Lecturer",
            department: "Mechanical Engineering"
          },
          code: "FME1003" // Random code
        },
        {
          _id: "4",
          username: "Emily Davis",
          lastUpdate: "2024-10-19T14:45:00Z",
          professionalInfo: {
            designation: "Senior Lecturer",
            department: "Civil Engineering"
          },
          code: "FCE1004" // Random code
        },
        {
          _id: "5",
          username: "Michael Brown",
          lastUpdate: "2024-10-21T16:20:00Z",
          professionalInfo: {
            designation: "Professor",
            department: "Chemical Engineering"
          },
          code: "FCH1005" // Random code
        },
    ]);
    

  return (
    <>
      <SideBar />
      <div className="bg-[#f4f4f4] min-h-screen">
        <div className="ml-56 mt-14 pt-4 px-14 text-[#212529] h-full ">
          <h1 className="text-xl font-semibold pl-2">Admin Dashboard</h1>
          <div className="flex justify-between mt-4 bg-white shadow-md rounded-xl py-2 px-4">
            <div className="border-0 w-2/7 flex justify-center items-center py-3 flex-col">
              <p className="font-semibold">Total Faculties</p>
              <p>{faculties.length}</p>
            </div>
            <div className="border-0 w-2/7 flex justify-center items-center py-3 flex-col">
              <p className="font-semibold">Upcoming Appraisals</p>
              <p>3</p>
            </div>
            <div className="border-0 w-2/7 flex justify-center items-center py-3 flex-col">
              <p className="font-semibold">Pending Reviews</p>
              <p>5</p>
            </div>
          </div>
          <div className="mt-4 px-4 py-4 border-0 rounded-xl shadow-md bg-white">
            <h1 className="text-xl font-semibold pl-2">Recent Faculty Activity</h1>
            <XFacultyList faculties={faculties} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
