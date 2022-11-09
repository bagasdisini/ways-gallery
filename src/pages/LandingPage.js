import Landing123 from "../assets/navbar.png";
import Landing from "../assets/landing.png";
import Landing1 from "../assets/landing12.png";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../config/api";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Button from "react-bootstrap/Button";

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
    name: "",
  });

  const { name, email, password } = form;

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

      navigate("/home");
      setShow1(false);
    } catch (error) {
      const alert11 = <Alert variant="danger">Email/Password Salah!</Alert>;
      setMessage(alert11);
    }
  });

  return (
    <div
      style={{
        backgroundImage: `url(${Landing1})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#fffff",
      }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {message && message}
          <Form className="p-3" onSubmit={(e) => handleSubmitRegist.mutate(e)}>
            <h3 className="mb-4 fw-bold" style={{ color: "#2FC4B2" }}>
              Register
            </h3>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                style={{ backgroundColor: "#F4F4F4" }}
                onChange={handleChange}
                name="email"
                value={email}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                style={{ backgroundColor: "#F4F4F4" }}
                onChange={handleChange}
                name="password"
                value={password}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                style={{ backgroundColor: "#F4F4F4" }}
                value={name}
                onChange={handleChange}
                name="name"
              />
            </Form.Group>
            <Button
              type="submit"
              style={{ width: "100%", background: "#2FC4B2", border: "none" }}
            >
              Register
            </Button>
          </Form>
          <div className="d-flex justify-content-center mx-auto">
            <p>
              Already have an account ? Click{" "}
              <button
                onClick={() => {
                  handleShow1();
                  handleClose();
                }}
                style={{ border: "none", backgroundColor: "white" }}
                className="p-0 fw-bold"
              >
                here
              </button>
            </p>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Body>
          {message && message}
          <Form className="p-3" onSubmit={(e) => handleSubmitLogin.mutate(e)}>
            <h3 className="mb-4 fw-bold" style={{ color: "#2FC4B2" }}>
              Login
            </h3>
            <Form.Group className="mb-3">
              <Form.Control
                id="email"
                type="email"
                placeholder="Email"
                style={{ backgroundColor: "#F4F4F4" }}
                value={email}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                id="password"
                type="password"
                placeholder="Password"
                style={{ backgroundColor: "#F4F4F4" }}
                value={password}
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              type="submit"
              style={{ width: "100%", background: "#2FC4B2", border: "none" }}
              onClick={{}}
            >
              Login
            </Button>
          </Form>
          <div className="d-flex justify-content-center mx-auto">
            <p>
              Don't have an account ? Click{" "}
              <button
                onClick={() => {
                  handleShow();
                  handleClose1();
                }}
                style={{ border: "none", backgroundColor: "white" }}
                className="p-0 fw-bold"
              >
                here
              </button>
            </p>
          </div>
        </Modal.Body>
      </Modal>

      <div
        className="d-flex justify-content-center align-items-center mx-auto"
        style={{ height: "100vh" }}
      >
        <div className="m-5">
          <img
            src={Landing123}
            alt="pizza"
            className="mt-5 align-self-start"
            width="200px"
          />
          <div className="mb-5">
            <p style={{ fontSize: "20px" }} className="mt-2 fw-bold">
              Show Your Work To Inspire Everyone
            </p>
            <div>
              <Button
                style={{
                  backgroundColor: "#2FC4B2",
                  fontSize: "12px",
                  width: "100px",
                  border: "none",
                }}
                onClick={handleShow}
                className="me-3 px-2 py-1"
              >
                Join Now
              </Button>
              <Button
                style={{
                  backgroundColor: "#E7E7E7",
                  color: "black",
                  fontSize: "12px",
                  width: "100px",
                  border: "none",
                }}
                className="px-4 py-1 fw-bold"
                onClick={handleShow1}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
        <img src={Landing} width="400px" alt="pizza" className="m-5" />
      </div>
    </div>
  );
}

export default Page;
