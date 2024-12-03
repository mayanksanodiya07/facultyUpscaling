import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import NavBar from "../components/NavBar";
// import Section from "../components/Section";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Homepage() {
  const navigate = useNavigate();
  // const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Outlet />

      <NavBar>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/aboutus");
              }}
            >
              AboutUs
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav className="flex gap-4 mr-8">
            <CustomButton type={"small"} to={"/faculty/login"}>
              Login
            </CustomButton>
            <CustomButton type={"small"} to={"/faculty/signup"}>
              Signup
            </CustomButton>
          </Nav>
        </Navbar.Collapse>
      </NavBar>
      <Main>
        <div className="h-screen relative">
          <div className=" flex flex-col items-center pt-28 ">
            <h1 className="homepage-title text-5xl font-bold mb-3 ">
              Welcome to 🔖SkillPathway
            </h1>
            <p className="text-2xl mb-5">
              Empowering Faculty and Learners to Achieve Excellence
            </p>
            <CustomButton type={"login"} to={"/apprisal-from"}>
              Get start
            </CustomButton>
          </div>
          <div className=" w-full absolute bottom-0">
            <svg
              className=" "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#EF305B"
                fill-opacity="1"
                d="M0,224L1440,192L1440,320L0,320Z"
              ></path>
            </svg>

            <svg
              className="absolute bottom-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#FA3E52"
                fill-opacity="1"
                d="M0,32L1440,288L1440,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}

export default Homepage;

function Main({ children }) {
  return <main>{children}</main>;
}
