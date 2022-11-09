import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Icon from "../assets/Icon.png";
import Cart from "../assets/cart.png";
import Dropdown from "react-bootstrap/Dropdown";
import Logout from "../assets/export.png";
import Profile from "../assets/profile.png";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Product from "../assets/product.png";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../config/api";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Landing123 from "../assets/navbar.png";

function Navigation({ totalItems, emptyCart }) {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  const navigateCart = () => {
    navigate("/cart");
  };

  const navigatePartner = () => {
    navigate("/profile-partner");
  };

  const navigateAddProduct = () => {
    navigate("/add-product");
  };
  
  const navigateProfile = () => {
    navigate(`/my-profile`);
  };

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    role: "",
  });

  const { fullName, email, password, gender, phone, role } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRegist = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);

      const alert = <Alert variant="success">Berhasil register!</Alert>;

      setMessage(alert);
    } catch (e) {
      const alert = <Alert variant="danger">Register gagal!</Alert>;

      setMessage(alert);
    }
  });

  const handleSubmitLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      const data = await API.post("/login", form);

      let payload = data.data.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });

      navigate("/");
      setShow1(false);
    } catch (e) {
      const alert = <Alert variant="danger">Email/Password Salah!</Alert>;

      setMessage(alert);
    }
  });

  const LogoutHandle = () => {
    dispatch({
      type: "LOGOUT",
    });
    emptyCart();
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
        // onClick={navigateHome}
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
          onClick={{}}
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
              src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
              alt="logo"
              width="40px"
              height="40px"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <img
                // src={Profile}
                alt="PP"
                width="15px"
                height="15px"
                className="me-1"
              />{" "}
              Profile
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/">
                <img
                  // src={Logout}
                  alt="PP"
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
