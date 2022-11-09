import React, { useState, useEffect, useRef, useMemo } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import NavBar from "./NavBar";
import BK from "../assets/BK.png";
import Upload from "../assets/upload.png";
import Cam from "../assets/cam.png";
import Plus from "../assets/plus.png";
import Mockup from "../assets/mockup.png";
import Detail from "../assets/detail.png";
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
        className="mx-auto mt-4 d-flex justify-content-between"
        style={{
          height: "90%",
          width: "60%",
          backgroundColor: "red",
        }}
      >
        <img
          src={Detail}
          alt="a"
          style={{ position: "absolute", marginTop: "-20px" }}
          width="900px"
        ></img>
        <div
          style={{ position: "relative", marginRight: "40px" }}
          className="mt-5"
        >
          <img
            src={BK}
            alt="a"
            style={{ position: "relative" }}
            width="60px"
          ></img>
          <h5 className="mt-4 fw-bold">Geralt</h5>
          <h3 className="fw-bold mt-4">Hey, Thanks for Looking</h3>
          <div style={{ position: "relative" }} className="mt-4 ">
            <Button
              style={{
                backgroundColor: "#2FC4B2",
                fontSize: "12px",
                width: "100px",
                border: "none",
              }}
              className="px-2 py-1"
            >
              Edit Profile{" "}
            </Button>
          </div>
        </div>
        <img
          src={Mockup}
          alt="a"
          style={{ position: "relative" }}
          width="500px"
        ></img>
      </div>
      <div
        className="mx-auto mt-5 d-flex justify-content-between"
        style={{
          height: "90%",
          width: "60%",
          position: "relative",
        }}
      >
        <p className="fw-bold">My Works</p>
      </div>
    </div>
  );
}

export default EditProfile;
