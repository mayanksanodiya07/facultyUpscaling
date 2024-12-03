import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import Overlay from "../overlay/Overlay";

// Edit Button Component
const EditButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 text-[#16325B] font-medium ml-2 mt-3 "
  >
    <FaPencilAlt className="text-sm" />
    <span> </span>
  </button>
);

// Main Component for Semester-wise Scores
const SemesterScores = ({ currentEducation }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const handleEditClick = (semester) => {
    setSelectedSemester(semester); // Set the selected semester for editing
    setModalOpen(true); // Open the modal
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Logic to save changes goes here
    setModalOpen(false); // Close the modal
  };

  return (
    <div className="mb-8 bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold ">Semester-wise Scores</h3>
      </div>
      <table className="w-full border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Semester</th>
            <th className="border px-2 py-1">CGPA</th>
            <th className="border px-2 py-1">SGPA</th>
            <th className="border px-2 py-1">Ongoing Backlogs</th>
            <th className="border px-2 py-1">Total Backlogs</th>
          </tr>
        </thead>
        <tbody>
          {currentEducation.semesterScores.map((score) => (
            <tr key={score.semester}>
              <td className="border px-2 py-2">{score.semester}</td>
              <td className="border px-2 py-2">{score.cgpa}</td>
              <td className="border px-2 py-2">{score.sgpa}</td>
              <td className="border px-2 py-2">{score.ongoingBacklogs}</td>
              <td className="border px-2 py-2">{score.totalBacklogs}</td>

              <EditButton onClick={() => handleEditClick(score)} />
            </tr>
          ))}
        </tbody>
      </table>

      <Overlay isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Edit Semester Scores</h2>
        {selectedSemester && (
          <form onSubmit={handleSaveChanges}>
            <label className="block mb-2">
              <span className="text-gray-700">CGPA:</span>
              <input
                type="text"
                defaultValue={selectedSemester.cgpa}
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">SGPA:</span>
              <input
                type="text"
                defaultValue={selectedSemester.sgpa}
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Ongoing Backlogs:</span>
              <input
                type="number"
                defaultValue={selectedSemester.ongoingBacklogs}
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Total Backlogs:</span>
              <input
                type="number"
                defaultValue={selectedSemester.totalBacklogs}
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        )}
      </Overlay>
    </div>
  );
};

export default SemesterScores;
