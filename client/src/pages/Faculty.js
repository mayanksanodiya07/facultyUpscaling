import NavBar from "../components/NavBar";
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";

// import Xlearnongpathfaculty from '../components/Xlearnongpathfaculty';
// import XAppraisalStatus from '../components/XAppraisalStatus';
// import XCourseRecommendation from '../components/XCourseRecommendation';
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { ParentContext } from "../ParentContext";
import { useEffect, useState } from "react";

function Faculty() {
  const { id } = useParams();

  const [facultyData, setFacultyData] = useState({
    name: "",
    department: "Computer Science",
    designation: "Associate Professor",
    appraisalStatus: "Pending",
    profileCompleted: false, // Assume false if the profile is incomplete
    learningPaths: [
      { name: "AI Constraint Satisfaction", progress: 75 },
      { name: "Getting Started with Competitive Programming", progress: 40 },
      {
        name: "Programming Data Structures And Algorithms Using Python",
        progress: 60,
      },
    ],
    recentActivities: [
      "Submitted Research Paper on AI.",
      "Attended Workshop on Cloud Computing.",
      "Mentored 5 students in their projects.",
    ],
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if(id){

        const { data } = await axios.get(
          `http://localhost:5000/faculty/profile/${id}`
        );
        
        // console.log(data.userDetails);
        //  = data.userDetails;
        setFacultyData((FacultyData) => ({
          ...FacultyData,
          name: data?.userDetails?.basic_information?.full_name?.replace(/\b\w/g, (char) =>
            char.toUpperCase(),
        ),
        profileCompleted:false
      }));
    }
    };


    fetchUserDetails();
  }, []);

  return (
    <>
      <ParentContext.Provider value={{ facultyData, setFacultyData }}>
        <NavBar>
          <Nav>
            <div className="text-white flex items-center text-base">
              {facultyData?.name && (
                <>
                  <FontAwesomeIcon icon={faCircleUser} className="pt-1 pr-1" />
                  <p>
                    {facultyData?.name}
                  </p>
                </>
              )}
            </div>
          </Nav>
        </NavBar>
        <Outlet />
        {/* <Facultydashboard/> */}
        {/* <Xlearnongpathfaculty/> */}
        {/* <XAppraisalStatus/> */}
        {/* <XCourseRecommendation/> */}
      </ParentContext.Provider>
    </>
  );
}

export default Faculty;
