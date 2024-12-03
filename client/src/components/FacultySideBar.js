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
    <div className="w-[300px] h-full left-0 text-white bg-[#212529]">
      <ul className="py-4 text-lg font-medium">
        <li className="py-2 hover:bg-[#272b31]">
          <Link
            to={`profile/${id}`}
            className="flex items-center gap-x-3 px-8"
          >
            <span className="w-4">
              <FontAwesomeIcon icon={faUser} className="text-base" />
            </span>
            <p>Profile</p>
          </Link>
        </li>

        <li className="py-2 hover:bg-[#272b31]">
          <Link
            to={`learning-paths`}
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
            to={`appraisal-form/${id}`}
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
