import { useState } from "react";
import CustomButton from "../components/CustomButton";
import defaultProfilePic from "../data/profile-icon.jpg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import Button from "react-bootstrap/Button";
import {
  handleCountryChange,
  handleStateChange,
  handleCityChange,
} from "../utils/addressHandlers";

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
    professional_information: {
      designation: {
        label: "Designation",
        type: "select",
        options: [
          "Professor",
          "Assistant Professor",
          // "Associate Professor",
          "Lecturer",
        ],
        required: true,
      },
      department: { label: "Department", type: "text", required: true },
      date_of_joining: {
        label: "Date of Joining",
        type: "date",
        required: true,
      },
      qualification: { label: "Qualification", type: "text", required: true },
      specialization: {
        label: "Specialization",
        type: "text",
        required: false,
      },
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
    // account_security: {
    //   // "password": {
    //   //   "label": "Password",
    //   //   "type": "password",
    //   //   "required": true
    //   // },
    //   security_question: {
    //     label: "Security Question",
    //     type: "select",
    //     options: [
    //       "What is your mother's maiden name?",
    //       "What was your first pet's name?",
    //       "What was the name of your first school?",
    //     ],
    //     required: true,
    //   },
    //   security_answer: {
    //     label: "Security Answer",
    //     type: "text",
    //     required: true,
    //   },
    // },
    optional_questions: {
      social_media_links: {
        label: "Social Media Links",
        type: "url",
        required: false,
      },
      research_interests: {
        label: "Research Interests",
        type: "text",
        required: false,
      },
      publications: {
        label: "Publications",
        type: "text",
        required: false,
      },
    },
  },
};

function FacultyProfileEdit() {
  const location = useLocation();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState({});
  const [formData, setFormData] = useState(location.state?.userDetails || {});

  const { id } = useParams();
  const navigate = useNavigate();

  // State for country, state, city
  const [selectedCountry, setSelectedCountry] = useState(
    formData?.address_details?.country || null
  );
  const [selectedState, setSelectedState] = useState(
    formData?.address_details?.state || null
  );
  const [selectedCity, setSelectedCity] = useState(
    formData?.address_details?.city || null
  );
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const setFunctions = {
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
    setFormData,
    setStateOptions,
    setCityOptions,
  };

  function handleUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function handleChange(selectedOption, section, field) {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: selectedOption.value,
      },
    });
  }

  const renderField = (section, field, details) => {
    return (
      <div key={field} className="mb-4">
        <label>{details.label}:</label>
        {details.type === "select" ? (
          <Select
            onChange={(selectedOption) =>
              handleChange(selectedOption, section, field)
            }
            required={details.required}
            options={details.options.map((opt) => ({
              value: opt,
              label: opt,
            }))}
            defaultValue={{
              value: formData[section]?.[field] || "",
              label: formData[section]?.[field] || "Select an option",
            }}
          />
        ) : (
          <input
            type={details.type}
            required={details.required}
            onChange={(e) =>
              handleChange({ value: e.target.value }, section, field)
            }
            className="border rounded p-2 w-full"
            value={
              details.type === "date"
                ? formData[section]?.[field]
                  ? new Date(formData[section][field])
                      .toISOString()
                      .split("T")[0] // Format date
                  : ""
                : formData[section]?.[field] || ""
            }
          />
        )}
      </div>
    );
  };

  // const handleSubmitImage = async (e) => {
  //   e.preventDefault();

  //   const formDataToSend = new FormData();
  //   formDataToSend.append("image", selectedImage);
  //   formDataToSend.append("userId", id);
  //   try {
  //     // Send the image and other details to the backend
  //     const response = await axios.post(
  //       `http://localhost:5000/faculty/upload-profile-pic/${id}`, // Replace with your API endpoint
  //       formDataToSend,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );
  //     alert("Profile image updated successfully!");
  //     // Optionally update the state with the new image URL
  //     setFormData((prev) => ({
  //       ...prev,
  //       profileImage: response.data.imageUrl, // Assuming the backend sends back the image URL
  //     }));
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     alert("Failed to upload image.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("image", selectedImage);
    formDataToSend.append("formData", JSON.stringify(formData));

    try {
      setLoading(true);
      await axios.post(
        `http://localhost:5000/faculty/profile/${id}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      navigate(`/faculty/profile/${id}`);
    } catch (err) {
      console.error("Error", err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-5 rounded-2xl w-fit border-2 px-7 py-7">
      <h1 className="text-2xl font-semibold w-fit mx-auto mb-2">Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <div className="w-40 h-40 rounded-full bg-orange-500 overflow-hidden flex items-center justify-center mb-4">
          <img
            className="w-full h-full object-cover"
            src={imagePreview || defaultProfilePic}
            alt="Profile"
          />
        </div>
        <Button type={"button"}>
          <label htmlFor="profilePic" className="cursor-pointer">
            Upload image
          </label>
        </Button>
        <input
          className="hidden"
          type="file"
          id="profilePic"
          accept="image/*"
          onChange={handleUpload}
        />

        <div className="w-full">
          {Object.keys(loginDetails.signup_questions).map((section) => (
            <div key={section}>
              <h2 className="text-xl font-semibold my-3">
                {section.replace("_", " ").toUpperCase()}
              </h2>
              {Object.keys(loginDetails.signup_questions[section]).map(
                (field) => {
                  if (field === "country") {
                    return (
                      <div key={field} className="mb-4">
                        <label>Country:</label>
                        <Select
                          options={Country.getAllCountries().map((country) => ({
                            value: country.isoCode,
                            label: country.name,
                            isoCode: country.isoCode,
                          }))}
                          defaultValue={{
                            label: selectedCountry,
                          }}
                          onChange={(country) =>
                            handleCountryChange(country, setFunctions)
                          }
                        />
                      </div>
                    );
                  } else if (field === "state") {
                    return (
                      <div key={field} className="mb-4">
                        <label>State:</label>
                        <Select
                          options={stateOptions}
                          onChange={(state) =>
                            handleStateChange(
                              state,
                              setFunctions,
                              selectedCountry
                            )
                          }
                          defaultValue={{
                            label: selectedState,
                          }}
                          isDisabled={!selectedCountry}
                        />
                      </div>
                    );
                  } else if (field === "city") {
                    return (
                      <div key={field} className="mb-4">
                        <label>City:</label>
                        <Select
                          options={cityOptions}
                          onChange={(city) =>
                            handleCityChange(city, setFunctions)
                          }
                          defaultValue={{
                            label: selectedCity,
                          }}
                          isDisabled={!selectedState}
                        />
                      </div>
                    );
                  } else {
                    return renderField(
                      section,
                      field,
                      loginDetails.signup_questions[section][field]
                    );
                  }
                }
              )}
            </div>
          ))}

          <div className="mb-4"></div>
        </div>
        <CustomButton type="submit">Submit</CustomButton>
      </form>
    </div>
  );
}

export default FacultyProfileEdit;
