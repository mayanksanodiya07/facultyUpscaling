import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const EditButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 text-[#16325B] font-medium border-2 rounded-full  border-[#16325B] hover:bg-[#16325B] hover:text-white "
    >
      <FaPencilAlt className="text-sm" />
      <span>Edit Info</span>
    </button>
  );
};

export default EditButton;
