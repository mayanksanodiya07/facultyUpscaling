import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecomendedCourses() {
  const { id } = useParams();
  // console.log(id);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchrecomendation(params) {
      try {
        const res = await axios.get(
          `http://localhost:5000/faculty/facultyrec/${id}`
        );
        console.log("asasa", res.data);
        // alert("Data sent!");
        setCourses();
      } catch (err) {
        console.error("error", err?.response?.data);
        console.error("error..............");
      }
    }
    fetchrecomendation();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Recommended Courses
      </h2>

      {/* Display course list */}
      <ul className="space-y-2">
        {/* {courses.length > 0 ? (
          courses.map((course, index) => (
            <li key={index} className="text-gray-700 bg-gray-100 rounded p-2">
              {course}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No courses available</li>
        )} */}
      </ul>
    </div>
  );
}

export default RecomendedCourses;
