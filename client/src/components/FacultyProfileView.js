import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import PhotoProfile from "./PhotoProfile";

const loginDetails = {
  signup_questions: {
    basic_information: {
      full_name: { label: "Full Name", type: "text", required: true },
      date_of_birth: { label: "Date of Birth", type: "date", required: true },
      gender: {
        label: "Gender",
        type: "select",
        options: ["Male", "Female", "Other"],
        required: true,
      },
      contact_number: { label: "Contact Number", type: "tel", required: true },
      email_address: { label: "Email Address", type: "email", required: true },
    },
    address_details: {
      residential_address: {
        label: "Residential Address",
        type: "text",
        required: false,
      },
      country: { label: "Country", type: "select", required: true },
      state: { label: "State", type: "select", required: true },
      city: { label: "City", type: "select", required: true },
    },
  },
};

const FacultyProfileView = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(5)
    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/faculty/profile/${id}`
        );
        if (!data.profileComplete) {
          navigate(`/faculty/profile/edit/${id}`);
        } else {
          setUserDetails(data.userDetails);
        }
      } catch (err) {
        setError("Error fetching user details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  return (
    <div className=" relative w-full h-full py-10 flex overflow-y-scroll gap-4 px-10">
      <PhotoProfile userDetails={userDetails} />
      <Outlet />
    </div>
  );
};

export default FacultyProfileView;
