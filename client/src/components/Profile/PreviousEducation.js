import React, { useState } from "react";
import EditButton from "../Buttons/EditInfoButton";
import Overlay from "../overlay/Overlay";


const PreviousEducations = ({previousEducations}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

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

      <Overlay isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
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
      </Overlay>
    </div>
  );
};

export default PreviousEducations;
