import XFacultyStrip from "./XFacultyStrip";

function FacultyList({ faculties }) {
  return (
    <table className="mt-7 mb-10 list-none border-collapse w-full">
      <thead>
        <tr>
          <th className="py-3 px-2">Faculty Name</th>
          <th className="py-3 px-2">Designation</th>
          <th className="py-3 px-2">Last Update</th>
          <th className="py-3 px-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {faculties.map((faculty) => (
          <XFacultyStrip key={faculty._id} faculty={faculty} />
        ))}
      </tbody>
    </table>
  );
}

export default FacultyList;
