import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Xfacultydashboard from '../components/Xfacultydashboard';
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function Faculty() {
 
  return (
    <>
      {/* <NavBar /> */}
      <NavBar>
       
          <Nav>
            <div className="text-white flex items-center text-base">
              <FontAwesomeIcon icon={faCircleUser} className="pt-1 pr-1" />
              <p>Jonas Smith</p>
            </div>
          </Nav>
      </NavBar>
      {/* <Outlet/> */}
      <Xfacultydashboard/>
    </>
  );
}

export default Faculty;
