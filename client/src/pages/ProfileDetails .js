import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userid } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/profiledetails/${userid}`
        );
        setUserDetails(response.data);
      } catch (err) {
        setError("Error fetching user details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userid]);
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };
  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-bold mb-4 text-[#FE444F]">User Details</h1>

      <h2 className="text-xl font-semibold mt-4">Basic Information</h2>
      <div className="mb-4">
        <p className="font-medium">
          Full Name:{" "}
          <span className="font-normal">{userDetails.basicInfo.full_name}</span>
        </p>
        <p className="font-medium">
          Date of Birth:{" "}
          <span className="font-normal">
            {formatDate(userDetails.basicInfo.date_of_birth)}
          </span>
        </p>
        <p className="font-medium">
          Gender:{" "}
          <span className="font-normal">{userDetails.basicInfo.gender}</span>
        </p>
        <p className="font-medium">
          Contact Number:{" "}
          <span className="font-normal">
            {userDetails.basicInfo.contact_number}
          </span>
        </p>
        <p className="font-medium">
          Email Address:{" "}
          <span className="font-normal">
            {userDetails.basicInfo.email_address}
          </span>
        </p>
      </div>
{console.log(userDetails)}
      <h2 className="text-xl font-semibold mt-4">Professional Information</h2>
      <div className="mb-4">
        <p className="font-medium">Employee Code: <span className="font-normal">{userDetails.professionalInfo.employee_code}</span></p>
        <p className="font-medium">Designation: <span className="font-normal">{userDetails.professionalInfo.designation}</span></p>
        <p className="font-medium">Department: <span className="font-normal">{userDetails.professionalInfo.department}</span></p>
        <p className="font-medium">Date of Joining: <span className="font-normal">{userDetails.professionalInfo.date_of_joining}</span></p>
        <p className="font-medium">Qualification: <span className="font-normal">{userDetails.professionalInfo.qualification}</span></p>
      </div>

      <h2 className="text-xl font-semibold mt-4">Address Details</h2>
      <div className="mb-4">
        <p className="font-medium">Residential Address: <span className="font-normal">{userDetails.addressDetails.residential_address}</span></p>
        <p className="font-medium">City: <span className="font-normal">{userDetails.addressDetails.city}</span></p>
        <p className="font-medium">State: <span className="font-normal">{userDetails.addressDetails.state}</span></p>
        <p className="font-medium">Country: <span className="font-normal">{userDetails.addressDetails.country}</span></p>
      </div>

      <h2 className="text-xl font-semibold mt-4">Account Security</h2>
      <div className="mb-4">
        <p className="font-medium">Password: <span className="font-normal">{userDetails.accountSecurity.password}</span></p>
        <p className="font-medium">Security Question: <span className="font-normal">{userDetails.accountSecurity.security_question}</span></p>
      </div>

      <h2 className="text-xl font-semibold mt-4">Optional Questions</h2>
      <div className="mb-4">
        <p className="font-medium">Social Media Links: <span className="font-normal">{userDetails.optionalQuestions.social_media_links}</span></p>
        <p className="font-medium">Research Interests: <span className="font-normal">{userDetails.optionalQuestions.research_interests}</span></p>
        <p className="font-medium">Publications: <span className="font-normal">{userDetails.optionalQuestions.publications}</span></p>
      </div>
    </div>
  );
};

export default UserDetails;
