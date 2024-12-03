import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import EditButton from "../Buttons/EditInfoButton";
import Overlay from "../overlay/Overlay";
import Select from "react-select";

const facultyDetailsOptions = {
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
};

function BasicDetails() {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

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
  }, []);

  const {
    basic_information: basicInfo = {},
    address_details: addressInfo = {},
  } = userDetails;

  const CountryName = Country.getCountryByCode(addressInfo.country)?.name;
  const StateName = State.getStatesOfCountry(addressInfo.country)?.find(
    (s) => s.isoCode === addressInfo.state
  )?.name;
  const handleEditClick = (section) => {
    setSelectedSection(section);
    setModalOpen(true);
  };

  const handleSaveChanges = async (updatedData) => {
    try {
      await axios.put(
        `http://localhost:5000/faculty/profile/${id}/${selectedSection}`,
        {
          [selectedSection]: updatedData,
        }
      );
      alert(`${selectedSection.replace("_", " ")} updated successfully!`);
      setModalOpen(false);
    } catch (err) {
      console.error(`Error updating ${selectedSection}:`, err);
      alert(`Failed to update ${selectedSection}.`);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="w-full p-6 border-0 shadow-lg h-fit bg-white">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          <EditButton onClick={() => handleEditClick("basic_information")} />
        </div>
        <Table>
          <DetailRow label="Full Name" value={basicInfo.full_name} />
          <DetailRow
            label="Date of Birth"
            value={
              basicInfo.date_of_birth
                ? new Date(basicInfo.date_of_birth).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )
                : "Not provided"
            }
          />
          <DetailRow label="Gender" value={basicInfo.gender} />
          <DetailRow label="Contact Number" value={basicInfo.contact_number} />
          <DetailRow label="Email Address" value={basicInfo.email_address} />
        </Table>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Address Details</h2>
          <EditButton onClick={() => handleEditClick("address_details")} />
        </div>
        <Table>
          <DetailRow
            label="Residential Address"
            value={addressInfo.residential_address}
          />
          <DetailRow label="City" value={addressInfo.city} />
          <DetailRow label="State" value={StateName} />
          <DetailRow label="Country" value={CountryName} />
        </Table>
      </div>

      <Overlay isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {selectedSection === "basic_information" && (
          <BasicInfoEditForm
            title="Edit Basic Information"
            initialData={basicInfo}
            onSave={handleSaveChanges}
          />
        )}
        {selectedSection === "address_details" && (
          <AddressEditForm
            title="Edit Address Details"
            initialData={addressInfo}
            onSave={handleSaveChanges}
          />
        )}
      </Overlay>
    </div>
  );
}

const Table = ({ children }) => (
  <table className="min-w-full bg-white border-b border-grey-300 mb-4">
    <tbody>{children}</tbody>
  </table>
);

const DetailRow = ({ label, value }) => (
  <tr>
    <td className="px-4 py-2 w-56 font-semibold border-0">{label}:</td>
    <td className="px-4 py-2 border-0">{value || "Not provided"}</td>
  </tr>
);

const BasicInfoEditForm = ({ title, initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData);

  function handleChange(selectedOption, field) {
    setFormData({
      ...formData,
      [field]: selectedOption.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  const renderField = (field, details) => {
    return (
      <div key={field} className="mb-4">
        <label>{details.label}:</label>
        {details.type === "select" ? (
          <Select
            onChange={(selectedOption) => handleChange(selectedOption, field)}
            required={details.required}
            options={details.options.map((opt) => ({
              value: opt,
              label: opt,
            }))}
            name={field}
            defaultValue={{
              value: formData[field] || "",
              label: formData[field] || "Select an option",
            }}
          />
        ) : (
          <input
            type={details.type}
            required={details.required}
            onChange={(e) => handleChange({ value: e.target.value }, field)}
            className="border rounded p-2 w-full"
            value={
              details.type === "date"
                ? formData[field]
                  ? new Date(formData[field]).toISOString().split("T")[0] // Format date
                  : ""
                : formData[field] || ""
            }
          />
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {Object.keys(facultyDetailsOptions.basic_information).map((field) => (
        <div key={field}>
          {renderField(field, facultyDetailsOptions.basic_information[field])}
        </div>
      ))}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
};

const AddressEditForm = ({ title, initialData, onSave }) => {
  const [country, setCountry] = useState(initialData.country || "");
  const [state, setState] = useState(initialData.state || "");
  const [city, setCity] = useState(initialData.city || "");
  const [residentialAddress, setResidentialAddress] = useState(
    initialData.residential_address || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      residential_address: residentialAddress,
      country,
      state,
      city,
    });
  };

  const countryOptions = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
  }));

  const stateOptions = country
    ? State.getStatesOfCountry(country).map((s) => ({
        value: s.isoCode,
        label: s.name,
      }))
    : [];

  const cityOptions =
    country && state
      ? City.getCitiesOfState(country, state).map((ci) => ({
          value: ci.name,
          label: ci.name,
        }))
      : [];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* Residential Address */}
      <label className="block mb-4">
        <span className="text-gray-700">Residential Address:</span>
        <input
          type="text"
          value={residentialAddress}
          onChange={(e) => setResidentialAddress(e.target.value)}
          className="block w-full mt-1 p-2 border rounded"
        />
      </label>

      {/* Country Select */}
      <label className="block mb-4">
        <span className="text-gray-700">Country:</span>
        <Select
          options={countryOptions}
          onChange={(selectedOption) => setCountry(selectedOption?.value || "")}
          value={countryOptions.find((c) => c.value === country) || null}
          placeholder="Select Country"
          isClearable
        />
      </label>

      {/* State Select */}
      <label className="block mb-4">
        <span className="text-gray-700">State:</span>
        <Select
          options={stateOptions}
          onChange={(selectedOption) => setState(selectedOption?.value || "")}
          value={stateOptions.find((s) => s.value === state) || null}
          placeholder="Select State"
          isClearable
          isDisabled={!country}
        />
      </label>

      {/* City Select */}
      <label className="block mb-4">
        <span className="text-gray-700">City:</span>
        <Select
          options={cityOptions}
          onChange={(selectedOption) => setCity(selectedOption?.value || "")}
          value={cityOptions.find((ci) => ci.value === city) || null}
          placeholder="Select City"
          isClearable
          isDisabled={!state}
        />
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
};

export default BasicDetails;
