import React, { useState } from "react";
import EditButton from "../Buttons/EditInfoButton";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-lg shadow-lg p-6 w-96"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
      >
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const PreviousEducations = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  const previousEducations = [
    {
      status: "Frozen",
      level: "Class XII",
      duration: "2020 - 2021",
      institution: "Baba Nanak Sindhi Hindi High School",
      board: "MSBSHSE",
      degree: "12th",
      type: "Full Time",
      documents: ["12th marksheet.pdf"],
    },
    {
      status: "Frozen",
      level: "Class X",
      duration: "2018 - 2019",
      institution: "Shrii Jagjivanram High School",
      board: "MSBSHSE",
      degree: "10th",
      type: "Full Time",
      documents: ["10th marksheet.pdf"],
    },
  ];

  const handleEditClick = (edu) => {
    setSelectedEducation(edu); // Set the selected education
    setModalOpen(true); // Open the modal
  };

  return (
    <div className="mb-8 bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">Previous Educations</h3>
      {previousEducations.map((edu, index) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-600">{edu.status}</p>
              <p className="font-medium">{edu.level}</p>
            </div>
            <EditButton onClick={() => handleEditClick(edu)} />
          </div>
          <p>{edu.duration}</p>
          <p>
            <span className="font-semibold">Institution:</span>{" "}
            {edu.institution}
          </p>
          <p>
            <span className="font-semibold">Board/University:</span> {edu.board}
          </p>
          <p>
            <span className="font-semibold">Program/Degree:</span> {edu.degree}
          </p>
          <p>
            <span className="font-semibold">Education Type:</span> {edu.type}
          </p>
          <p>
            <span className="font-semibold">Documents:</span>{" "}
            {edu.documents.join(", ")}
          </p>
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Edit Education</h2>
        {selectedEducation && (
          <form>
            <label className="block mb-2">
              <span className="text-gray-700">Level:</span>
              <input
                type="text"
                defaultValue={selectedEducation.level}
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Institution:</span>
              <input
                type="text"
                defaultValue={selectedEducation.institution}
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Duration:</span>
              <input
                type="text"
                defaultValue={selectedEducation.duration}
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default PreviousEducations;
