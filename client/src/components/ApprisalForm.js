import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Section from "../components/Section";
import Questions from "../components/Questions";
import Button from "../components/Button";
import Footer from "./Footer";

const facultyAppraisalQuestions0 = [
  {
    code: "Q1",
    question: "What is your age?",
    answers: ["<30", "30-40", "41-50", ">50"],
  },
  {
    code: "Q2",
    question: "What is your highest level of formal education?",
    answers: ["PhD", "Master's", "Bachelor's", "Other"],
  },
  {
    code: "Q3",
    question: "How many research publications have you authored?",
    answers: ["<5", "5-10", "11-20", ">20"],
  },
  {
    code: "Q4",
    question:
      "Which academic events/seminars have you participated in over the last year?",
    answers: [
      "International Conference",
      "National Conference",
      "Workshop",
      "Other",
    ],
  },
  {
    code: "Q5",
    question: "How many projects have you supervised in the last year?",
    answers: ["0", "1-3", "4-6", ">6"],
  },
  {
    code: "Q6",
    question:
      "What types of academic contributions have you made recently? (Select all that apply)",
    answers: ["Research", "Lectures", "Seminars", "Community Engagement"],
  },
  {
    code: "Q7",
    question: "Which platforms do you use to publish your research?",
    answers: ["Google Scholar", "ResearchGate", "Journals", "Conferences"],
  },
  {
    code: "Q8",
    question:
      "Do you participate in curriculum development at your institution?",
    answers: ["Yes", "No "],
  },
  {
    code: "Q9",
    question:
      "How often do you engage in professional development activities (workshops, courses)?",
    answers: ["Monthly", "Quarterly", "Annually", "Rarely"],
  },
  {
    code: "Q10",
    question: "What is your gender?",
    answers: ["Male", "Female", "Non-binary", "Prefer not to say"],
  },
];

const facultyAppraisalQuestions = [
  {
    code: "Q1",
    question: "Which area of your subject do you want to specialize in?",
    answers: [
      "Artificial Intelligence",
      "Data Science",
      "Software Engineering",
      "Cybersecurity",
      "Cloud Computing"
    ]
  },
  {
    code: "Q2",
    question: "What level of experience do you have in research?",
    answers: [
      "Beginner",
      "Intermediate",
      "Advanced",
      "Expert",
      "No Research Experience"
    ]
  },
  {
    code: "Q3",
    question: "Which technology are you most interested in learning more about?",
    answers: [
      "Machine Learning",
      "Blockchain",
      "IoT (Internet of Things)",
      "AR/VR (Augmented/Virtual Reality)",
      "Quantum Computing"
    ]
  },
  {
    code: "Q4",
    question: "What is your primary motivation for taking a new course?",
    answers: [
      "Career Growth",
      "Research Development",
      "New Skills Acquisition",
      "Personal Interest",
      "Academic Progress"
    ]
  },
  {
    code: "Q5",
    question: "How do you prefer to learn new topics?",
    answers: [
      "Online Courses",
      "Workshops",
      "Reading Research Papers",
      "Hands-on Projects",
      "Seminars/Webinars"
    ]
  },
  {
    code: "Q6",
    question: "Which of the following tools do you actively use in your work?",
    answers: [
      "Python",
      "MATLAB",
      "R",
      "SQL",
      "TensorFlow/PyTorch"
    ]
  },
  {
    code: "Q7",
    question: "Which programming languages are you comfortable working with?",
    answers: [
      "Python",
      "Java",
      "C++",
      "JavaScript",
      "R"
    ]
  },
  {
    code: "Q8",
    question: "Which area do you think you need the most upskilling in?",
    answers: [
      "Data Analytics",
      "Cloud Technologies",
      "Project Management",
      "Mobile Application Development",
      "Network Security"
    ]
  },
  {
    code: "Q9",
    question: "What kind of projects are you currently working on?",
    answers: [
      "AI/ML Projects",
      "Web Development",
      "Embedded Systems",
      "Big Data Projects",
      "Cloud Infrastructure"
    ]
  },
  {
    code: "Q10",
    question: "Which research publications do you follow?",
    answers: [
      "IEEE",
      "Springer",
      "Elsevier",
      "ACM",
      "Wiley"
    ]
  },
  {
    code: "Q11",
    question: "How do you stay updated with the latest trends in your field?",
    answers: [
      "Attending Conferences",
      "Reading Research Papers",
      "Watching Online Tutorials",
      "Following Thought Leaders",
      "Engaging in Peer Discussions"
    ]
  },
  {
    code: "Q12",
    question: "What type of collaboration are you most interested in?",
    answers: [
      "Industry Collaboration",
      "Academic Collaboration",
      "Research Collaboration",
      "Open Source Contributions",
      "Consultancy"
    ]
  },
  {
    code: "Q13",
    question: "Which soft skills do you want to improve?",
    answers: [
      "Communication",
      "Leadership",
      "Time Management",
      "Teamwork",
      "Problem-Solving"
    ]
  },
  {
    code: "Q14",
    question: "Which domain-specific certification do you wish to acquire?",
    answers: [
      "AWS Certified Solutions Architect",
      "Certified Data Scientist",
      "Certified Ethical Hacker",
      "PMP (Project Management Professional)",
      "Google Cloud Certified"
    ]
  },
  {
    code: "Q15",
    question: "Which research methodology are you most comfortable with?",
    answers: [
      "Qualitative Research",
      "Quantitative Research",
      "Mixed Methods",
      "Experimental Research",
      "Theoretical Research"
    ]
  }
];


function ApprisalForm() {
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleResponseChange = (questionCode, answer) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionCode]: answer,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(`http://localhost:5000/faculty/apprisal`, {
        id,
        responses,
      });
      console.log("right")
      setResponses({});
      navigate(`/faculty/courses-recommended/${id}`);
    } catch (error) {
      setError("An error occurred while submitting the form. Please try again.");
      console.error("Error submitting the form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <div className="mt-20 mb-4">

      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center mb-8">Self-Appraisal Form</h1>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mx-auto max-w-3xl">
          {/* Questions */}
          <div className="grid gap-6 mb-8">
            {facultyAppraisalQuestions.map((question, index) => (
              <Questions
              key={index}
                question={question}
                selectedAnswer={responses[question.code] || "Choose..."}
                onResponseChange={handleResponseChange}
                />
              ))}
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
              </div>
              <Footer/>
    </Section>
  );
}

export default ApprisalForm;
