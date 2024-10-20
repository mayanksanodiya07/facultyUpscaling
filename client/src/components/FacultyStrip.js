import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
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
        <Button to={`/admin/faculty/${faculty._id}/profile`} type={"profile"}>
          View Profile
        </Button>
      </td>
    </tr>
  );
}

export default FacultyStrip;

// import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Button from "./Button";

// function FacultyStrip({ faculty }) {
//   return (
//     <ul className="grid grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] border-t border-b grid-flow-col py-3 px-2 hover:bg-[#f8f8f8]">
//       <div className="flex">
//         <div className="  flex items-center">
//           <FontAwesomeIcon
//             icon={faCircleUser}
//             className="mx-auto h-11 opacity-50"
//           />
//         </div>
//         <div className=" flex flex-col ml-3">
//           <span className=" font-bold">{faculty["username"]}</span>
//           {/* Employee ID */}
//           <span className=" truncate">{["Employee Code"]}</span>
//         </div>
//       </div>
//       <div className="hidden lg:flex flex-col ml-3">
//         <span className="truncate">{["designation"]}</span>
//         <span className="truncate">{["Department"]}</span>
//       </div>
//       <div className="hidden lg:flex">
//         <a
//           className="truncate hover:underline "
//           href={`mailto:` + ["Contact Email"]}
//           // href={`mailto:` + faculty["Contact Email"]}
//         >
//           {/* {faculty["Contact Email"]} */}Contact Email
//         </a>
//       </div>

//         <Button to={"profile"} type={"profile"}>View Profile</Button>
//     </ul>
//   );
// }

// export default FacultyStrip;
