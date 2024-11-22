import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import FacultySidebar from "./FacultySideBar";
import Button from "./Button";

const FacultyProfileView = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [id, navigate]);

  const formatDate = (dateString) => {
    return dateString
      ? new Date(dateString).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "Not provided";
  };

  const handleEditProfile = () => {
    navigate(`/faculty/profile/edit/${id}`, { state: { userDetails } });
  };
  
  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const {
    basic_information: basicInfo,
    professional_information: professionalInfo,
    address_details: addressInfo,
    // account_security: accountSecurityInfo,
    optional_questions: optionalQuestionsInfo,
  } = userDetails;
  

  return (
    <>
      <FacultySidebar />
      <div className="ml-56 mt-14 pt-2">
        <div className="max-w-2xl mx-auto my-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h1 className="text-3xl font-bold mb-4 text-[#FE444F]">
            User Details
          </h1>

          <Section title="Basic Information">
            <Table>
              <DetailRow label="Full Name" value={basicInfo.full_name} />
              <DetailRow
                label="Date of Birth"
                value={formatDate(basicInfo.date_of_birth)}
              />
              <DetailRow label="Gender" value={basicInfo.gender} />
              <DetailRow
                label="Contact Number"
                value={basicInfo.contact_number}
              />
              <DetailRow
                label="Email Address"
                value={basicInfo.email_address}
              />
            </Table>
          </Section>

          <Section title="Professional Information">
            <Table>
              {/* <DetailRow
                label="Employee Code"
                value={professionalInfo.employee_code}
              /> */}
              <DetailRow
                label="Designation"
                value={professionalInfo.designation}
              />
              <DetailRow
                label="Department"
                value={professionalInfo.department}
              />
              <DetailRow
                label="Date of Joining"
                value={formatDate(professionalInfo.date_of_joining)}
              />
              <DetailRow
                label="Qualification"
                value={professionalInfo.qualification}
              />
            </Table>
          </Section>

          <Section title="Address Details">
            <Table>
              <DetailRow
                label="Residential Address"
                value={addressInfo.residential_address}
              />
              <DetailRow label="City" value={addressInfo.city} />
              <DetailRow label="State" value={addressInfo.state} />
              <DetailRow label="Country" value={addressInfo.country} />
            </Table>
          </Section>

          {/* <Section title="Account Security">
            <Table>
              <DetailRow
                label="Password"
                value={accountSecurityInfo.password}
              />
              <DetailRow
                label="Security Question"
                value={accountSecurityInfo.security_question}
              />
            </Table>
          </Section> */}

          <Section title="Optional Questions">
            <Table>
              <DetailRow
                label="Social Media Links"
                value={optionalQuestionsInfo.social_media_links}
              />
              <DetailRow
                label="Research Interests"
                value={optionalQuestionsInfo.research_interests}
              />
              <DetailRow
                label="Publications"
                value={optionalQuestionsInfo.publications}
              />
            </Table>
          </Section>
          <Button type="submit" onClick={handleEditProfile}>
            <FaEdit className="mr-2" />
            <p>Edit Profile</p>
          </Button>
        </div>
      </div>
    </>
  );
};

const Section = ({ title, children }) => (
  <>
    <h2 className="text-xl font-semibold mt-4">{title}</h2>
    <div className="mb-4">{children}</div>
  </>
);

const Table = ({ children }) => (
  <table className="min-w-full bg-white border-b border-grey-300 mb-4">
    <tbody>{children}</tbody>
  </table>
);

const DetailRow = ({ label, value }) => (
  <tr>
    <td className="px-4 py-2 w-56 font-semibold border-0">{label}:</td>
    <td className="px-4 py-2 border-0 ">{value || "Not provided"}</td>
  </tr>
);

export default FacultyProfileView;
