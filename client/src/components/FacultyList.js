import FacultyStrip from "./FacultyStrip";

function FacultyList({ faculties }) {
  const sortedFaculties = faculties?.sort((a, b) => {
    return new Date(b.lastUpdate) - new Date(a.lastUpdate);
  });
  console.log(sortedFaculties)
  return (
    <table className="mt-7 mb-10 list-none border-collapse w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-3 px-2 border">Faculty Name</th>
          <th className="py-3 px-2 border">Designation</th>
          <th className="py-3 px-2 border">Last Update</th>
          <th className="py-3 px-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {faculties?.map((faculty, index) => (
          <FacultyStrip key={index} faculty={faculty} />
        ))}
      </tbody>
    </table>
  );
}

export default FacultyList;
