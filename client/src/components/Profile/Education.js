import React from "react";
import EditButton from "../Buttons/EditInfoButton";
import PreviousEducations from "./PreviousEducation";
import SemesterScores from "./ScoreTable";

const EducationDetails = () => {
  const currentEducation = {
    course: "Computer Science",
    status: "Frozen",
    duration: "2021 - 2025",
    cgpa: "9.11",
    percentage: "83.6",
    institution: "GH Raisoni College of Engineering, Nagpur",
    department: "Department of Computer Science & Engineering",
    degree: "B.Tech",
    specialization: "Computer Science",
    currentSemester: "7th",
    rollNo: "2021ACSC1108130",
    semesterScores: [
      {
        semester: 1,
        cgpa: "9.56",
        sgpa: "9.56",
        ongoingBacklogs: 0,
        totalBacklogs: 0,
      },
      {
        semester: 2,
        cgpa: "9.14",
        sgpa: "8.74",
        ongoingBacklogs: 0,
        totalBacklogs: 0,
      },
      {
        semester: 3,
        cgpa: "9.22",
        sgpa: "9.38",
        ongoingBacklogs: 0,
        totalBacklogs: 0,
      },
      {
        semester: 4,
        cgpa: "9.2",
        sgpa: "9.13",
        ongoingBacklogs: 0,
        totalBacklogs: 0,
      },
      {
        semester: 5,
        cgpa: "9.16",
        sgpa: "9.05",
        ongoingBacklogs: 0,
        totalBacklogs: 0,
      },
      {
        semester: 6,
        cgpa: "9.11",
        sgpa: "8.86",
        ongoingBacklogs: 0,
        totalBacklogs: 0,
      },
    ],
    documents: ["Marksheet"],
    documentIds: ["602191f9-b0cc-4c44...78db"],
  };

  const previousEducations = [
    {
      level: "CLASS XII",
      status: "Frozen",
      duration: "2020 - 2021",
      percentage: "87.33",
      institution: "Baba Nanak Sindhi Hindi High School & Jr. College",
      board:
        "Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)",
      degree: "12th",
      specialization: "NA",
      type: "Full Time",
      documents: ["12th marksheet.pdf"],
    },
    {
      level: "CLASS X",
      status: "Frozen",
      duration: "2018 - 2019",
      percentage: "80.2",
      institution: "Shrii Jagjivanram High School",
      board:
        "Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)",
      degree: "10th",
      specialization: "NA",
      type: "Full Time",
      documents: ["10th marksheet.pdf"],
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8 bg-white  shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold ">Current/Most Recent Course</h3>
          <EditButton />
        </div>
        <p className="text-gray-600 mb-2">{currentEducation.status}</p>
        <p className="font-medium">{currentEducation.course}</p>
        <p>{currentEducation.duration}</p>

        <p className="mt-4">
          <span className="font-semibold">CGPA:</span> {currentEducation.cgpa}
        </p>
        <p>
          <span className="font-semibold">Percentage:</span>{" "}
          {currentEducation.percentage}%
        </p>
        <p>
          <span className="font-semibold">Institution:</span>{" "}
          {currentEducation.institution}
        </p>
        <p>
          <span className="font-semibold">Department:</span>{" "}
          {currentEducation.department}
        </p>
        <p>
          <span className="font-semibold">Program/Degree:</span>{" "}
          {currentEducation.degree}
        </p>
        <p>
          <span className="font-semibold">Branch/Specialization:</span>{" "}
          {currentEducation.specialization}
        </p>
        <p>
          <span className="font-semibold">Current Semester:</span>{" "}
          {currentEducation.currentSemester}
        </p>
        <p>
          <span className="font-semibold">Institutional Roll No.:</span>{" "}
          {currentEducation.rollNo}
        </p>
      </div>

      {/* Semester-wise Scores Section */}
      <SemesterScores currentEducation={currentEducation} />

      {/* Previous Education Section */}
      <PreviousEducations previousEducations={previousEducations} />

      {/* Education Gaps Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Education Gaps</h3>
        <p>If you have taken one or more years off from study, specify here.</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Gap
        </button>
      </div>
    </div>
  );
};

export default EducationDetails;
