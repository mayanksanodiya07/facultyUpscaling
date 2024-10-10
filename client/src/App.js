import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Faculty from "./pages/Faculty";
import Admin from "./pages/Admin";
// import Profile from "./pages/Profile";
// import FacultyLoginForm from "./pages/FacultyLoginForm";

import AdminDashboard from "./components/AdminDashboard";
import ApprisalForm from "./components/ApprisalForm";
import FacultyList from "./components/FacultyList";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import FacultyProfileEdit from "./components/FacultyProfileEdit";
import FacultyProfileView from "./components/FacultyProfileView";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
// import Loading from "./components/Loading"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        {/* <Route index element={<Loading /> } /> */}
        <Route path="/faculty" element={<Faculty />}>
          <Route index element={<Navigate replace to={"login"} />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="profile/:id" element={<FacultyProfileView />} />
          <Route path="profile/edit/:userid" element={<FacultyProfileEdit />} />
          <Route path="profile/new" element={<FacultyProfileEdit />} />
          <Route path="apprisal/:id" element={<ApprisalForm />} />
        </Route>

        <Route path="/admin" element={<Admin />}>
          <Route index element={<Navigate replace to={"dashboard"} />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="signup" element={<AdminSignup />} />
          <Route path="faculty-list" element={<FacultyList />} />
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
