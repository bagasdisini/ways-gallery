import NavBar from "./NavBar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../config/api";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";

function Page() {
  const navigate = useNavigate();

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
              <Dropdown.Item href="#/action-1">Following</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <InputGroup style={{ width: "200px" }}>
            <Form.Control
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
              style={{ backgroundColor:"#E7E7E7", borderStyle:"none", borderRadius:"6px" }}
            />
          </InputGroup>
        </div>
        <p className="mt-5 fw-bold">Today's Post</p>
      </div>
    </div>
  );
}

export default Page;
