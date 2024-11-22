// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faListUl, faGear } from "@fortawesome/free-solid-svg-icons";
// import { Link, useNavigate } from "react-router-dom";

// function AdminDashboard() {
//   const navigate = useNavigate();
//   return (
//     <div className="bg-[#212529] fixed left-0 text-white h-full">
//       <ul className=" py-4 text-lg font-medium *:cursor-pointer *:flex *:px-8 *:items-center *:gap-x-3">
//         <li className="py-2 hover:bg-[#272b31]">
//           <span className="w-4">
//             <FontAwesomeIcon icon={faUser} className="text-base" />
//           </span>
//           <p>Profile</p>
//         </li>
//         <li className="py-2 hover:bg-[#272b31]">
//           <Link to="../faculty-list" className="flex items-center gap-x-3">
//             <span className="w-4">
//               <FontAwesomeIcon icon={faListUl} className="text-base" />
//             </span>
//             <p>Faculty List</p>
//           </Link>
//         </li>
//         <li className="py-2 hover:bg-[#272b31]">
//           <span className="w-4">
//             <FontAwesomeIcon icon={faGear} className="text-base" />
//           </span>
//           <p>Account Setting</p>
//         </li>
//       </ul>
//     </div>
//   );
// }
// export default AdminDashboard;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBook,
  faClipboardList,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";

function FacultySidebar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleLogout = () => {
    // Clear any session or token (if required)
    navigate("/login"); // Redirect to login on logout
  };

  return (
    <div className="bg-[#212529] fixed left-0 text-white h-full w-60">
      <ul className="py-4 text-lg font-medium">
        <li className="py-2 hover:bg-[#272b31]">
          <Link to={`../profile/${id}`} className="flex items-center gap-x-3 px-8">
            <span className="w-4">
              <FontAwesomeIcon icon={faUser} className="text-base" />
            </span>
            <p>Profile</p>
          </Link>
        </li>

        <li className="py-2 hover:bg-[#272b31]">
          <Link
            to="../learning-paths"
            className="flex items-center gap-x-3 px-8"
          >
            <span className="w-4">
              <FontAwesomeIcon icon={faBook} className="text-base" />
            </span>
            <p>Learning Paths</p>
          </Link>
        </li>

        <li className="py-2 hover:bg-[#272b31]">
          <Link
            to={`../appraisal-form/${id}`}
            className="flex items-center gap-x-3 px-8"
          >
            <span className="w-4">
              <FontAwesomeIcon icon={faClipboardList} className="text-base" />
            </span>
            <p>Appraisal Status</p>
          </Link>
        </li>

        <li className="py-2 hover:bg-[#272b31]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-x-3 px-8 w-full text-left"
          >
            <span className="w-4">
              <FontAwesomeIcon icon={faSignOutAlt} className="text-base" />
            </span>
            <p>Logout</p>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default FacultySidebar;
