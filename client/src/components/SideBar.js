import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faListUl, faGear } from "@fortawesome/free-solid-svg-icons";

function AdminDashboard() {
  return (
    <div className="bg-[#212529] fixed left-0 text-white h-full">
      <ul className=" py-4 text-lg font-medium *:cursor-pointer *:flex *:px-8 *:items-center *:gap-x-3">
        <li className="py-2 hover:bg-[#272b31]">
          <span className="w-4">
            <FontAwesomeIcon icon={faUser} className="text-base" />
          </span>
          <p>Profile</p>
        </li>
        <li className="py-2 hover:bg-[#272b31]">
          <span className="w-4">
            <FontAwesomeIcon icon={faListUl} className="text-base" />
          </span>
          <p>Faculty List</p>
        </li>
        <li className="py-2 hover:bg-[#272b31]">
          <span className="w-4">
            <FontAwesomeIcon icon={faGear} className="text-base" />
          </span>
          <p>Account Setting</p>
        </li>
      </ul>
    </div>
  );
}
export default AdminDashboard;
