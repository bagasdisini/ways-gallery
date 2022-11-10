import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import NavBar from "./NavBar";
import Upload from "../assets/upload.png";
import Plus from "../assets/plus.png";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import InputGroup from "react-bootstrap/InputGroup";

function EditProfile() {
  const [state, dispatch] = useContext(UserContext);
  const [preview, setPreview] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [preview3, setPreview3] = useState(null);
  const [preview4, setPreview4] = useState(null);
  const [preview5, setPreview5] = useState(null);
  const navigate = useNavigate();
  const navigateProfile = () => {
    navigate("/my-profile");
  };

  useEffect(() => {
    document.title = "Upload Post";
  }, []);

  const [form, setForm] = useState({
    title: "",
    desc: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  });

  console.log(form);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

    if (e.target.type == "file") {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleChange2 = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

    if (e.target.type == "file") {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview2(url);
    }
  };

  const handleChange3 = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

    if (e.target.type == "file") {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview3(url);
    }
  };

  const handleChange4 = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

    if (e.target.type == "file") {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview4(url);
    }
  };

  const handleChange5 = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

    if (e.target.type == "file") {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview5(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      if (preview) {
        formData.set("image1", form?.image1, form?.image1.name);
      }
      if (preview2) {
        formData.set("image2", form?.image2, form?.image2.name);
      }
      if (preview3) {
        formData.set("image3", form?.image3, form?.image3.name);
      }
      if (preview4) {
        formData.set("image4", form?.image4, form?.image4.name);
      }
      if (preview5) {
        formData.set("image5", form?.image5, form?.image5.name);
      }
      formData.set("title", form.title);
      formData.set("desc", form.desc);

      const response = await API.post(`/post`, formData);

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
        className="mx-auto d-flex mt-4"
        style={{
          height: "90%",
          width: "65%",
        }}
      >
        <div
          className="d-flex flex-column ms-5"
          style={{
            width: "45%",
          }}
        >
          {preview ? (
            preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    width: "400px",
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                  alt={preview}
                />
              </div>
            )
          ) : (
            <div
              style={{
                border: "2px dashed grey",
                width: "100%",
                height: "400px",
                borderRadius: "20px",
              }}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <img src={Upload} alt="aw" width="150px"></img>
              <p>Browse to choose a file</p>
            </div>
          )}

          <div className="d-flex justify-content-evenly">
            {preview2 ? (
              preview2 && (
                <div className="mt-2">
                  <img
                    src={preview2}
                    style={{
                      width: "100%",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                    alt={preview2}
                  />
                </div>
              )
            ) : (
              <div
                style={{
                  border: "2px dashed grey",
                  width: "23%",
                  height: "90px",
                  borderRadius: "20px",
                }}
                className="d-flex flex-column justify-content-center align-items-center mt-2"
              >
                <img src={Plus} alt="aw" width="30px"></img>
              </div>
            )}

            {preview3 ? (
              preview3 && (
                <div className="mt-2">
                  <img
                    src={preview3}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                    alt={preview3}
                  />
                </div>
              )
            ) : (
              <div
                style={{
                  border: "2px dashed grey",
                  width: "23%",
                  height: "90px",
                  borderRadius: "20px",
                }}
                className="d-flex flex-column justify-content-center align-items-center mt-2"
              >
                <img src={Plus} alt="aw" width="30px"></img>
              </div>
            )}

            {preview4 ? (
              preview4 && (
                <div className="mt-2">
                  <img
                    src={preview4}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                    alt={preview4}
                  />
                </div>
              )
            ) : (
              <div
                style={{
                  border: "2px dashed grey",
                  width: "23%",
                  height: "90px",
                  borderRadius: "20px",
                }}
                className="d-flex flex-column justify-content-center align-items-center mt-2"
              >
                <img src={Plus} alt="aw" width="30px"></img>
              </div>
            )}

            {preview5 ? (
              preview5 && (
                <div className="mt-2">
                  <img
                    src={preview5}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                    alt={preview5}
                  />
                </div>
              )
            ) : (
              <div
                style={{
                  border: "2px dashed grey",
                  width: "23%",
                  height: "90px",
                  borderRadius: "20px",
                }}
                className="d-flex flex-column justify-content-center align-items-center mt-2"
              >
                <img src={Plus} alt="aw" width="30px"></img>
              </div>
            )}
          </div>
        </div>
        <div
          style={{ width: "50%" }}
          className="d-flex flex-column justify-content-center align-items-center mb-5"
        >
          <Form.Group className="mb-3 mt-5">
            <Form.Control
              type="text"
              placeholder="Title"
              style={{ backgroundColor: "#F4F4F4", width: "300px" }}
              value={form.title}
              name="title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Description"
              style={{ backgroundColor: "#F4F4F4", width: "300px" }}
              value={form.desc}
              name="desc"
              onChange={handleChange}
            />
          </Form.Group>
          <InputGroup className="mb-3" style={{ width: "51%" }}>
            <Form.Control
              aria-label="Image"
              aria-describedby="basic-addon1"
              type="file"
              name="image1"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3" style={{ width: "51%" }}>
            <Form.Control
              aria-label="Image"
              aria-describedby="basic-addon1"
              type="file"
              name="image2"
              onChange={handleChange2}
            />
          </InputGroup>
          <InputGroup className="mb-3" style={{ width: "51%" }}>
            <Form.Control
              aria-label="Image"
              aria-describedby="basic-addon1"
              type="file"
              name="image3"
              onChange={handleChange3}
            />
          </InputGroup>
          <InputGroup className="mb-3" style={{ width: "51%" }}>
            <Form.Control
              aria-label="Image"
              aria-describedby="basic-addon1"
              type="file"
              name="image4"
              onChange={handleChange4}
            />
          </InputGroup>
          <InputGroup className="mb-3" style={{ width: "51%" }}>
            <Form.Control
              aria-label="Image"
              aria-describedby="basic-addon1"
              type="file"
              name="image5"
              onChange={handleChange5}
            />
          </InputGroup>
          <div
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <Button
              type="submit"
              style={{
                width: "20%",
                background: "#E7E7E7",
                border: "none",
                color: "black",
              }}
              className="mt-3 mx-3"
              onClick={navigateProfile}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              style={{ width: "20%", background: "#2FC4B2", border: "none" }}
              className="mt-3 mx-3"
              onClick={(e) => handleSubmit(e)}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
