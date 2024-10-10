import { Nav } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

function Admin() {
  const [username, setUsername] = useState(Cookies.get('username'));

  useEffect(() => {
    const checkCookie = () => {
      const updatedUsername = Cookies.get('username');
      if (updatedUsername !== username) {
        setUsername(updatedUsername);
      }
    };

    checkCookie();

    const interval = setInterval(checkCookie, 1000); 

    return () => clearInterval(interval);
  }, [username]);

  return (
    <>
      <NavBar>
        {username && (
          <Nav>
            <div className="text-white flex items-center text-base">
              <FontAwesomeIcon icon={faCircleUser} className="pt-1.5 pr-1" />
              <p>{username}</p>
            </div>
          </Nav>
        )}
      </NavBar>
      <Outlet />
    </>
  );
}

export default Admin;
