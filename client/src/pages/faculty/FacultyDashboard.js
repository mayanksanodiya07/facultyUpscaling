import FacultySideBar from "../../components/FacultySideBar"; // Assuming you have a sidebar component
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useParentContext } from "../../ParentContext";

function FacultyDashboard() {
  const { facultyData, setFacultyData } = useParentContext();
  console.log(facultyData);
  // Determine notifications based on profile completeness and appraisal status
  const notifications = [];
  if (!facultyData.profileCompleted) {
    notifications.push("Complete your profile to access all features.");
  }
  if (facultyData.appraisalStatus === "Pending") {
    notifications.push("Your appraisal is pending. Please complete it.");
  }

  return (
    <div className="bg-[#f4f4f4] mx-12 mt-14 pt-4 px-14 text-[#212529] h-full">
      <h1 className="text-xl font-semibold pl-2">Faculty Dashboard</h1>

      {/* Notifications Section */}
      {notifications.length > 0 && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md mb-6">
          <ul className="space-y-2">
            {notifications.map((notification, index) => (
              <li key={index} className="font-semibold">
                {notification}
              </li>
            ))}
          </ul>
        </div>
      )}
      {facultyData.profileCompleted && (
        <>
          {/* Summary Section */}
          <div className="flex justify-between mt-4 bg-white shadow-md rounded-xl p-6">
            {["Name", "Department", "Designation", "Appraisal Status"].map(
              (item, index) => (
                <div
                  key={index}
                  className="border-0 w-1/4 flex flex-col items-center"
                >
                  <p className="font-semibold">{item}</p>
                  <>{facultyData[item.toLowerCase().replace(" ", "")]}</>
                </div>
              )
            )}
          </div>

          {/* Learning Paths Section */}
          <div className="mt-6 bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Learning Paths</h2>
            <table className="min-w-full bg-white">
              <tbody>
                {facultyData.learningPaths.map((path, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{path.name}</td>
                    <td className="py-2 px-4 border-b">
                      {path.progress}% Complete
                    </td>
                    <td className="py-2 px-4 border-b">
                      <CustomButton type={"profile"}>Details</CustomButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        </>
      )}
    </div>
  );
}

export default FacultyDashboard;
