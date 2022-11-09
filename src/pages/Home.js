import Landing123 from "../assets/navbar.png";
import NavBar from "./NavBar";
import Line from "../assets/garis.png";
import Landing from "../assets/landing.png";
import Landing1 from "../assets/landing12.png";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../config/api";
import { useQuery } from "react-query";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";

function Page() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [state, dispatch] = useContext(UserContext);

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    document.title = "WaysGallery";
  }, []);

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
      console.log(e);
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
    } catch (error) {
      const alert11 = <Alert variant="danger">Email/Password Salah!</Alert>;
      setMessage(alert11);
    }
  });

  return (
    <div>
      <NavBar/>

      <div
        className="mx-auto"
        style={{ height: "90%", width: "80%", marginTop: "30px" }}
      >
        <div className="d-flex justify-content-between">
          <Dropdown>
            <Dropdown.Toggle
              style={{
                backgroundColor: "#E7E7E7",
                color: "black",
                borderColor: "#E7E7E7",
              }}
              className="px-3"
            >
              Date &ensp;
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Today</Dropdown.Item>
              <Dropdown.Item href="#/action-1">7 Days</Dropdown.Item>
              <Dropdown.Item href="#/action-2">30 Days</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Show All</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <InputGroup style={{ width: "200px" }}>
            <Form.Control
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
        <p className="mt-5 fw-bold">Today's Post</p>
      </div>
    </div>
  );
}

export default Page;
