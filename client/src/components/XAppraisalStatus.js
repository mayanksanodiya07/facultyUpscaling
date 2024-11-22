import { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar"; // Adjust the path as needed

function AppraisalStatus() {
  const [appraisalData] = useState({
    facultyName: "Professor John Doe",
    department: "Computer Science",
    currentStatus: "Pending",
    lastAppraisal: {
      date: "2023-08-15",
      status: "Completed",
      feedback: "Great progress in research and teaching methodologies.",
    },
    historicalAppraisals: [
      {
        date: "2022-08-10",
        status: "Completed",
        feedback: "Excellent performance. Keep up the good work!",
      },
      {
        date: "2021-08-05",
        status: "Completed",
        feedback: "Solid contributions to the department.",
      },
    ],
  });

  return (
    <>
      <SideBar />
      <div className="bg-[#f4f4f4] mt-14 pt-4 ml-60 p-8">
        <h1 className="text-2xl font-semibold mb-4">Appraisal Status</h1>

        <div className="bg-white shadow-md rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Current Appraisal Status</h2>
          <p className="mb-2"><strong>Faculty Name:</strong> {appraisalData.facultyName}</p>
          <p className="mb-2"><strong>Department:</strong> {appraisalData.department}</p>
          <p className="mb-2"><strong>Status:</strong> {appraisalData.currentStatus}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Last Appraisal</h2>
          <p className="mb-2"><strong>Date:</strong> {appraisalData.lastAppraisal.date}</p>
          <p className="mb-2"><strong>Status:</strong> {appraisalData.lastAppraisal.status}</p>
          <p className="mb-2"><strong>Feedback:</strong> {appraisalData.lastAppraisal.feedback}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Historical Appraisals</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appraisalData.historicalAppraisals.map((appraisal, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{appraisal.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{appraisal.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{appraisal.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <Link to="../faculty-dashboard" className="text-blue-500 underline">
            Back to Faculty Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}

export default AppraisalStatus;
