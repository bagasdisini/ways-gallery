import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import Button from "react-bootstrap/Button";
import { API, setAuthToken } from "../config/api";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Landing123 from "../assets/navbar.png";
import IconProfile from "../assets/iconprofile.png";
import IconOrder from "../assets/iconorder.png";
import IconLogout from "../assets/iconlogout.png";

function Navigation() {
  const navigate = useNavigate();

  const navigateProfile = () => {
    navigate("/my-profile");
  };

  const navigateOrder = () => {
    navigate("/order");
  };

  const navigateHome = () => {
    navigate("/home");
  };

  const navigateUpload = () => {
    navigate("/upload-post");
  };
  
  const [state, dispatch] = useContext(UserContext);

  const LogoutHandle = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return (
    <Navbar
    style={{ boxShadow: "2px 7px 15px -12px rgba(135,135,135,0.51)", height:"10%" }}
  >
    <Container style={{ width: "80%" }}>
      <img
        src={Landing123}
        width="8%"
        alt="logo"
        onClick={navigateHome}
        style={{ cursor: "pointer" }}
      />
      <div
        style={{ float: "right", marginRight: "70px" }}
        className="d-flex align-items-center"
      >
        <Button
          type="submit"
          className="px-4 me-4"
          style={{ width: "100%", background: "#2FC4B2", border: "none" }}
          onClick={navigateUpload}
        >
          Upload
        </Button>
        <Dropdown style={{ width: "10px" }}>
          <Dropdown.Toggle
            style={{
              width: "10px",
              backgroundColor: "white",
              border: "none",
            }}
          >
            <img
              src={
                state.user.image === "http://localhost:5000/uploads/"
                  ? "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                  : state.user.image
              }
              alt="logo"
              width="40px"
              height="40px"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item  onClick={navigateProfile}>
              <img
                src={IconProfile}
                alt="PP"
                width="15px"
                height="15px"
                className="me-1"
              />{" "}
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={navigateOrder}>
              <img
                src={IconOrder}
                alt="Order"
                width="15px"
                height="15px"
                className="me-1"
              />{" "}
              Order
            </Dropdown.Item>
            <Dropdown.Item onClick={LogoutHandle}>
              <Link to="/">
                <img
                  src={IconLogout}
                  alt="Logout"
                  width="15px"
                  height="15px"
                  className="me-1"
                />{" "}
                Logout
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Container>
  </Navbar>
  );
}

export default Navigation;
