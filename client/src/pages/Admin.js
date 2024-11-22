import { Nav } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// import Xadmindashboard from "../components/Xadmindashboard";

function Admin() {
  const [image, setImage] = useState(null);

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
  const [username, setUsername] = useState(Cookies.get("username"));

  useEffect(() => {
    const checkCookie = () => {
      const updatedUsername = Cookies.get("username");
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
        <Nav>
          <div className="text-white flex items-center text-base">
            <span className="mr-1.5  border-1 rounded-full">
              <img
                src={image}
                alt={`adminprofile`}
                className=" h-8 border-1 rounded-full"
              />
            </span>
            <p>Dr. Arvind Kumar</p>
          </div>
        </Nav>
      </NavBar>
      {/* <Outlet /> */}
      {/* <Xadmindashboard /> */}
    </>
  );
}

export default Admin;
