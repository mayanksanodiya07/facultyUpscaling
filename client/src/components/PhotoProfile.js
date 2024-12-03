// const loginDetails = {
//   signup_questions: {
//     basic_information: {
//       full_name: "John Doe",
//       date_of_birth: "1990-01-01",
//       gender: "Male",
//       contact_number: "1234567890",
//       email_address: "john.doe@example.com",
//     },
//     professional_information: {
//       designation: "Professor",
//       department: "Computer Science",
//       date_of_joining: "2015-08-01",
//       qualification: "PhD in Artificial Intelligence",
//       specialization: "Machine Learning",
//     },
//     address_details: {
//       residential_address: "123 Main St, Cityville",
//       country: "United States",
//       state: "California",
//       city: "San Francisco",
//     },
//     account_security: {
//       security_question: "What was your first pet's name?",
//       security_answer: "Fluffy",
//     },
//     optional_questions: {
//       social_media_links: "https://linkedin.com/in/johndoe",
//       research_interests: "AI, Machine Learning, Deep Learning",
//       publications: "15 papers published in IEEE Journals",
//     },
//   },
// };
function PhotoProfile({ userDetails }) {
  // const profilePicture = ;
  const { basic_information, professional_information } = userDetails;
  return (
    <div className="sticky top-0 h-full flex items-center">
      <div className="relative border-0  shadow-lg bg-white p-6 flex flex-col items-center w-80">
        {/* Profile Picture Container */}
        <div className="w-36 h-36 border-8 border-double border-[#FE444F] rounded-full overflow-hidden flex items-center justify-center mb-4 ">
          <img
            className="w-full h-full object-cover"
            src={`http://localhost:5000${basic_information.profile_image}`}
            alt="Profile"
          />
        </div>

        <h2 className="text-xl font-semibold">{basic_information.full_name}</h2>
        <p className="text-gray-500">{professional_information.designation}</p>
        <p className="text-gray-500">{professional_information.department}</p>
        <p className="text-gray-500">{basic_information.email_address}</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Edit Profile Picture
        </button>
      </div>
    </div>
  );
}

export default PhotoProfile;
