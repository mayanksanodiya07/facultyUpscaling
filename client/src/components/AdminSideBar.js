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
import { faUser, faListUl, faGear, faClipboardCheck, faChartLine, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any session or token (if required)
    navigate("/login"); // Redirect to login on logout
  };

  return (
    <div className="bg-[#212529] fixed left-0 text-white h-full w-60">
      <div className="px-4 pt-6">
        <h2 className="text-2xl font-semibold">Admin</h2>
      </div>
      <ul className="py-4 text-lg font-medium">
        <li className="py-2 hover:bg-[#272b31]">
          <Link to="../profile" className="flex items-center gap-x-3 px-8">
            <span className="w-4">
              <FontAwesomeIcon icon={faUser} className="text-base" />
            </span>
            <p>Profile</p>
          </Link>
        </li>
        <li className="py-2 hover:bg-[#272b31]">
          <Link to="../faculty-list" className="flex items-center gap-x-3 px-8">
            <span className="w-4">
              <FontAwesomeIcon icon={faListUl} className="text-base" />
            </span>
            <p>Faculty List</p>
          </Link>
        </li>
        <li className="py-2 hover:bg-[#272b31]">
          <Link to="../appraisal-status" className="flex items-center gap-x-3 px-8">
            <span className="w-4">
              <FontAwesomeIcon icon={faClipboardCheck} className="text-base" />
            </span>
            <p>Appraisal Status</p>
          </Link>
        </li>
        <li className="py-2 hover:bg-[#272b31]">
          <Link to="../performance-reports" className="flex items-center gap-x-3 px-8">
            <span className="w-4">
              <FontAwesomeIcon icon={faChartLine} className="text-base" />
            </span>
            <p>Performance Reports</p>
          </Link>
        </li>
        <li className="py-2 hover:bg-[#272b31]">
          <Link to="../account-settings" className="flex items-center gap-x-3 px-8">
            <span className="w-4">
              <FontAwesomeIcon icon={faGear} className="text-base" />
            </span>
            <p>Account Settings</p>
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

export default AdminDashboard;
