import React, { useState, useEffect, useRef, useMemo } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import NavBar from "./NavBar";
import BK from "../assets/BK.png";
import Cam from "../assets/cam.png";
import Mockup from "../assets/mockup.png";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function EditProfile() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    document.title = "Edit Profile";
  }, []);

  const wrapperRef = useRef(null);

  const [draggable] = useState(true);
  const [position, setPosition] = useState([-6.3818149, 106.7495821]);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  var positionStr = `${position.lat}, ${position.lng}`;

  const [form, setForm] = useState({
    fullName: "",
    image: "",
    email: "",
    phone: "",
    location: positionStr,
  });

  const idid = state?.user.id;

  let { data: user } = useQuery("userCache", async () => {
    const response = await API.get("/user/" + idid);
    return response.data.data;
  });

  useEffect(() => {
    if (user) {
      setForm({
        ...form,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        phone: user.phone,
        location: positionStr,
      });
    }
  }, [user]);

  // const handleChange = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]:
  //       e.target.type === "file" ? e.target.files[0] : e.target.value,
  //   });

  //   if (e.target.type == "file") {
  //     const url = URL.createObjectURL(e.target.files[0]);
  //     setPreview(url);
  //   }
  // };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      if (preview) {
        formData.set("image", form?.image, form?.image.name);
      }
      formData.set("fullName", form.fullName);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("location", positionStr);

      const response = await API.patch(`/user/${idid}`, formData);

      const auth = await API.get("/check-auth");

      let payload = auth.data.data;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      navigate("/my-profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <div
        className="mx-auto d-flex mt-5"
        style={{
          height: "90%",
          width: "65%",
        }}
      >
        <div
          className="d-flex"
          style={{
            width: "45%",
          }}
        >
          <div
            style={{
              border: "2px dashed grey",
              width: "100%",
              height: "400px",
              borderRadius: "20px",
            }}
            className="d-flex justify-content-center align-items-center"
          >
            <p>Upload Best Your Art</p>
          </div>
        </div>
        <div
          style={{ width: "50%" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div
            style={{
              border: "2px dashed grey",
              borderRadius: "100px",
            }}
            className="p-5"
          >
            <img src={Cam} width="50px"></img>
          </div>
          <Form.Group className="mb-3 mt-5">
            <Form.Control
              type="text"
              placeholder="Greeting"
              style={{ backgroundColor: "#F4F4F4" }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Full Name"
              style={{ backgroundColor: "#F4F4F4" }}
            />
          </Form.Group>
          <Button
              type="submit"
              style={{ width: "20%", background: "#2FC4B2", border: "none" }}
              className="mt-3"
            >
              Save
            </Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
