import FacultyStrip from "./FacultyStrip";

function FacultyList({ faculties }) {
  let sortedFaculties = faculties?.sort((a, b) => {
    return new Date(b.lastUpdate) - new Date(a.lastUpdate);
  }).slice(0, 5);
  // sortedFaculties = sortedFaculties?
  console.log(sortedFaculties)
  return (
    <table className="mt-7 mb-10 list-none border-collapse w-full">
      <thead>
        <tr className="">
          <th className="py-3 px-2 ">Faculty Name</th>
          <th className="py-3 px-2 ">Designation</th>
          <th className="py-3 px-2 ">Last Update</th>
          <th className="py-3 px-2 ">Action</th>
        </tr>
      </thead>
      <tbody>
        {sortedFaculties?.map((faculty, index) => (
          <FacultyStrip key={index} faculty={faculty} />
        ))}
      </tbody>
    </table>
  );
}

export default FacultyList;
