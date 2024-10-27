import SideBar from "../components/SideBar"; // Assuming you have a sidebar component
import { useState, useEffect } from "react";

function FacultyDashboard() {
  const [facultyData, setFacultyData] = useState({
    fullName: "Mayank Sanodiya",
    department: "Computer Science Engineering",
    designation: "Assistant Professor",
    appraisalStatus: "In Progress",
    learningPaths: [
      { name: "Data Science Bootcamp", progress: 80 },
      { name: "Machine Learning with Python", progress: 60 },
      { name: "Cloud Computing Basics", progress: 45 },
    ],
    recentActivities: [
      "Published research paper on AI trends",
      "Attended workshop on Web3 Technologies",
      "Mentored final year project on Blockchain",
    ],
  });

  return (
    <>
      <SideBar />
      <div className="bg-[#f4f4f4]">
        <div className="ml-56 mt-14 pt-4 px-14 text-[#212529] h-full">
          <h1 className="text-xl font-semibold pl-2">Faculty Dashboard</h1>

          {/* Summary Section */}
          <div className="flex justify-between mt-4 bg-white shadow-md rounded-xl p-6">
            <div className="border-0 w-2/7 flex flex-col items-center">
              <p className="font-semibold">Department</p>
              <p>{facultyData.department}</p>
            </div>
            <div className="border-0 w-2/7 flex flex-col items-center">
              <p className="font-semibold">Designation</p>
              <p>{facultyData.designation}</p>
            </div>
            <div className="border-0 w-2/7 flex flex-col items-center">
              <p className="font-semibold">Appraisal Status</p>
              <p>{facultyData.appraisalStatus}</p>
            </div>
          </div>

          {/* Learning Paths Section */}
          <div className="mt-6 bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Learning Paths</h2>
            <ul className="space-y-2">
              {facultyData.learningPaths.map((path, index) => (
                <li
                  key={index}
                  className="flex justify-between bg-gray-100 p-3 rounded-md"
                >
                  <span>{path.name}</span>
                  <span>{path.progress}% Complete</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Activities Section */}
          <div className="mt-6 bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
            <ul className="space-y-2">
              {facultyData.recentActivities.map((activity, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded-md">
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default FacultyDashboard;
