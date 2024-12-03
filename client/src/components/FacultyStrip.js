import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";
import axios from "axios";

function FacultyStrip({ faculty }) {
  const [facultyDetails, setFacultyDetails] = useState(null);
  const [error, setError] = useState(null);

  const dateOnly = faculty.lastUpdate
    ? new Date(faculty.lastUpdate).toISOString().split("T")[0]
    : null;

  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/faculty/profile/${faculty._id}`
        );
        setFacultyDetails(data);
      } catch (err) {
        setError("Error fetching user details");
        console.error(err);
      } finally {
        // setFacultyDetails(false);
      }
    };

    fetchFacultyDetails();
  }, [faculty._id]);

  const designation = facultyDetails?.professionalInfo?.designation || "N/A";
  const department = facultyDetails?.professionalInfo?.department || "N/A";
  // console.log(facultyDetails.professionalInfo);

  return (
    <tr className="border-t border-b border-gray-300 hover:bg-[#f8f8f8] w-full">
      <td className="flex items-center py-3 px-2">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="mx-auto h-11 opacity-50"
          />
        </div>
        <div className="flex flex-col ml-3">
          <span className="font-bold">{faculty["username"]}</span>
          <span className="truncate">Employee Code</span>
        </div>
      </td>
      <td className="hidden lg:table-cell py-3 px-2">
        <div className="flex flex-col">
          <span className="truncate">{designation || "N/A"}</span>
          <span className="truncate">{department || "N/A"}</span>
        </div>
      </td>
      <td className="hidden lg:table-cell py-3 px-2">
        <span className="truncate">{dateOnly}</span>
      </td>
      <td className="py-3 px-2">
        <CustomButton to={`/admin/faculty/${faculty._id}/profile`} type={"profile"}>
          View Profile
        </CustomButton>
      </td>
    </tr>
  );
}

export default FacultyStrip;
