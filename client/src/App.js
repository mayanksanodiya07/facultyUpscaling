import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Faculty from "./layout/Faculty";
import Admin from "./layout/Admin";
// import Profile from "./pages/Profile";
// import FacultyLoginForm from "./pages/FacultyLoginForm";

import AdminDashboard from "./components/AdminDashboard";
import Facultydashboard from "./pages/faculty/FacultyDashboard";
import ApprisalForm from "./components/ApprisalForm";
import FullFacultyList from "./components/FullFacultyList";
import FacutyLoginPage from "./components/FacutyLoginPage";
import SignupPage from "./components/SignupPage";
import VerificationPage from "./components/VerificationPage";
import FacultyProfileEdit from "./components/FacultyProfileEdit";
import FacultyProfileView from "./components/FacultyProfileView";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import AdminFaculty from "./components/AdminFaculty";
import AboutUs from "./components/AboutUs";
import Loading from "./components/Loading";
import VerificationPrompt from "./components/VerificationPrompt";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage ";
import RecomendedCourses from "./components/RecomendedCourses";
import BasicDetails from "./components/Profile/BasicDetails";
import EducationDetails from "./components/Profile/Education";
import Test from "./components/test/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/test" element={<Test />} />

        <Route path="/faculty" element={<Faculty />}>
          <Route index element={<Navigate replace to={"login"} />} />
          <Route path="login" element={<FacutyLoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="verify-prompt" element={<VerificationPrompt />} />
          <Route
            path="verify/:id/:secretString"
            element={<VerificationPage />}
          />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="reset-password/:id/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="dashboard/:id" element={<Facultydashboard />} />
          <Route path="profile/:id" element={<FacultyProfileView />}>
            <Route index element={<BasicDetails />} />
            <Route path="education" element={<EducationDetails />} />
          </Route>
          <Route path="profile/edit/:id" element={<FacultyProfileEdit />} />
          {/* <Route path="profile/new" element={<FacultyProfileEdit />} /> */}
          <Route path="appraisal-form/:id" element={<ApprisalForm />} />
          <Route
            path="courses-recommended/:id"
            element={<RecomendedCourses />}
          />
          
        </Route>

        <Route path="/admin" element={<Admin />}>
          <Route index element={<Navigate replace to={"dashboard"} />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="signup" element={<AdminSignup />} />
          <Route path="faculty-list" element={<FullFacultyList />} />
          <Route path="faculty/:id" element={<AdminFaculty />}>
            <Route path="profile" element={<FacultyProfileView />} />
          </Route>
          {/* <Route path="profile" element={<Profile />} /> */}
        </Route>

        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> */}
        {/* <Route path="/apprisal-from" element={<ApprisalForm />} /> */}
        {/* <Route path="faculty-profile" element={<FacultyLoginForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
