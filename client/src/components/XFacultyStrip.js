import { useEffect, useState } from "react";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomButton from "./CustomButton";

function FacultyStrip({ faculty }) {
  const [image, setImage] = useState(null);
  const dateOnly = faculty.lastUpdate
    ? new Date(faculty.lastUpdate).toISOString().split("T")[0]
    : null;

  useEffect(() => {
    // Fetch a random user image
    const fetchRandomImage = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        setImage(data.results[0].picture.large);
      } catch (error) {
        console.error("Error fetching random image:", error);
      }
    };

    fetchRandomImage();
  }, []);

  return (
    <tr className="border-t border-b border-gray-300 hover:bg-[#f8f8f8] w-full">
      <td className="flex items-center py-3 px-2">
        <div className="flex items-center">
          {image ? (
            <img
              src={image}
              alt={`${faculty.username}`}
              className="mx-auto h-11 rounded-full "
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleUser}
              className="mx-auto h-11 opacity-50"
            />
          )}
        </div>
        <div className="flex flex-col ml-3">
          <span className="font-bold">{faculty.username}</span>
          <span className="truncate">Faculty Code: {faculty.code}</span>
        </div>
      </td>
      <td className="hidden lg:table-cell py-3 px-2">
        <div className="flex flex-col">
          <span className="truncate">
            {faculty.professionalInfo.designation}
          </span>
          <span className="truncate">
            {faculty.professionalInfo.department}
          </span>
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
