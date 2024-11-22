import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import SideBar from "../components/SideBar"; // Adjust the path as needed

function LearningPath() {
  const { pathId } = useParams(); // Assuming pathId is passed in the URL
  const [learningPath] = useState({
    id: pathId,
    name: "AI Constraint Satisfaction",
    description: "An advanced course on AI constraint satisfaction problems.",
    progress: 75,
    resources: [
      { title: "Introduction to AI", link: "https://example.com/ai-intro" },
      { title: "Constraint Satisfaction Problems", link: "https://example.com/csp" },
      { title: "Advanced AI Techniques", link: "https://example.com/advanced-ai" },
    ],
  });

  return (
    <>
      <SideBar />
      <div className="bg-[#f4f4f4] ml-60 mt-14 pt-4 p-8">
        <h1 className="text-2xl font-semibold mb-4">{learningPath.name}</h1>
        <p className="mb-6">{learningPath.description}</p>

        <h2 className="text-lg font-semibold mb-4">Progress</h2>
        <div className="bg-white shadow-md rounded-xl p-4 mb-6">
          <p className="text-xl font-bold">{learningPath.progress}% Complete</p>
        </div>

        <h2 className="text-lg font-semibold mb-4">Resources</h2>
        <ul className="bg-white shadow-md rounded-xl p-4 space-y-2">
          {learningPath.resources.map((resource, index) => (
            <li key={index} className="p-3 bg-gray-100 rounded-md">
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {resource.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Link to="../learning-paths" className="text-blue-500 underline">
            Back to Learning Paths
          </Link>
        </div>
      </div>
    </>
  );
}

export default LearningPath;
