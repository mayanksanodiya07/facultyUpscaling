import { useEffect, useState } from "react";
import Button from "./Button";
import FacultySidebar from "./FacultySideBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./Loading";

function CourseRecommendation() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const facultyDetails = {
    name: "Mayank Sanodiya",
    department: "Computer Science",
    qualification: "Ph.D. in Computer Science",
    areaOfExpertise: "Artificial Intelligence",
  };

  // const [recommendedCourses] = useState([
  //   {
  //     name: "AI Constraint Satisfaction",
  //     description: "This course covers various techniques in AI for solving constraint satisfaction problems.",
  //     duration: "4 Weeks",
  //     level: "Intermediate",
  //     link: "https://onlinecourses.nptel.ac.in/noc22_cs06/preview",
  //   },
  //   {
  //     name: "An Introduction to Artificial Intelligence",
  //     description: "Gain a foundational understanding of artificial intelligence concepts and methodologies.",
  //     duration: "6 Weeks",
  //     level: "Beginner",
  //     link: "https://nptel.ac.in/courses/106/105/106105167/", // example link
  //   },
  //   {
  //     name: "Getting Started with Competitive Programming",
  //     description: "Learn the fundamentals of competitive programming and improve your coding skills.",
  //     duration: "6 Weeks",
  //     level: "Beginner",
  //     link: "https://nptel.ac.in/courses/106/105/106105167/",
  //   },
  //   {
  //     name: "Foundations of Cryptography",
  //     description: "Explore the fundamental principles of cryptography and data security.",
  //     duration: "8 Weeks",
  //     level: "Advanced",
  //     link: "https://nptel.ac.in/courses/106/105/106105168/", // example link
  //   },
  //   {
  //     name: "Problem Solving Through Programming In C",
  //     description: "Develop problem-solving skills through programming in the C language.",
  //     duration: "4 Weeks",
  //     level: "Beginner",
  //     link: "https://nptel.ac.in/courses/106/105/106105169/", // example link
  //   },
  //   {
  //     name: "Programming Data Structures And Algorithms Using Python",
  //     description: "An in-depth study of data structures and algorithms using Python.",
  //     duration: "8 Weeks",
  //     level: "Intermediate",
  //     link: "https://nptel.ac.in/courses/106/105/106105168/",
  //   },
  // ]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [facultyData, setFacultyData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/faculty/facultyrec/${id}`
        );
        console.log(data)
        // console.log(data.facultyWithRecCourses.apprisalResponses.Recommendations)
        setRecommendedCourses(
          data.facultyWithRecCourses.apprisalResponses.Recommendations
        );
        // console.log(data.facultyWithRecCourses)
        setFacultyData({
          name: data.facultyWithRecCourses?.basicInfo?.full_name,
          designation:
            data.facultyWithRecCourses?.professionalInfo?.designation,
          department: data.facultyWithRecCourses?.professionalInfo?.department,
          qualification:
            data.facultyWithRecCourses?.professionalInfo?.qualification,
        });
      } catch (err) {
        // setError("Error fetching user details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, []);
  const handleCourseClick = (url) => {
    // Navigate to the course link when the button is clicked
    window.location.href = url;
  };
  console.log(recommendedCourses);
  // console.log("yy", recommendedCourses?.length)

  return (
    <>
      <FacultySidebar />

      <div className="relative bg-[#f4f4f4]  ml-60 mt-14 p-8">
        {isLoading && <LoadingSpinner />}
        <div className= {`${isLoading && "blur-sm pointer-events-none" }`}>
          <h1 className="text-2xl font-semibold mb-4">
            Course Recommendations
          </h1>

          {/* Faculty Details Section */}
          <div className="bg-white shadow-md rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Faculty Details</h2>
            <p className="mb-2">
              <strong>Name:</strong> {facultyData?.name}
            </p>
            <p className="mb-2">
              <strong>Designation:</strong> {facultyData?.designation}
            </p>
            <p className="mb-2">
              <strong>Department:</strong> {facultyData?.department}
            </p>
            <p className="mb-2">
              <strong>Qualification:</strong> {facultyData?.qualification}
            </p>
          </div>

          {/* Recommended Courses Section */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Recommended Courses</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Link
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recommendedCourses?.map((course, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {course.coursename}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                      {course["SME Name"]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {course.Duration} Weeks
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {course.Institute}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <Button
                        type={"profile"}
                        onClick={() => handleCourseClick(course.link)}
                      >
                        View Course
                      </Button>
                      {/* <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"></a> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseRecommendation;
