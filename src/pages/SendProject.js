import React, { useState, useEffect, useRef, useMemo } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import NavBar from "./NavBar";
import Upload from "../assets/upload.png";
import Plus from "../assets/plus.png";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

function EditProfile() {
  const [state, dispatch] = useContext(UserContext);
  const [preview, setPreview] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [preview3, setPreview3] = useState(null);
  const [preview4, setPreview4] = useState(null);
  const [preview5, setPreview5] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Send Project";
  }, []);

  const [form, setForm] = useState({
    status: "complete",
    projectDesc: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  });

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

  let { id } = useParams();

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
      formData.set("projectDesc", form.projectDesc);
      formData.set("status", form.status);

      const response = await API.patch(`/transaction/${id}`, formData);

      const auth = await API.get("/check-auth");

      let payload = auth.data.data;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      navigate("/my-offer");
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
            <label
              htmlFor="image1"
              style={{
                width: "100%",
                height: "400px",
                borderRadius: "20px",
              }}
            >
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
                <input
                  type="file"
                  id="image1"
                  name="image1"
                  hidden
                  onChange={handleChange}
                />
              </div>
            </label>
          )}

          <div className="d-flex justify-content-evenly">
            {preview2 ? (
              preview2 && (
                <div className="mt-2">
                  <img
                    src={preview2}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                    alt={preview2}
                  />
                </div>
              )
            ) : (
              <label
                htmlFor="image2"
                style={{
                  border: "2px dashed grey",
                  width: "23%",
                  height: "90px",
                  borderRadius: "20px",
                }}
                className="mt-2"
              >
                <div
                  style={{
                    width: "100%",
                    height: "90px",
                    borderRadius: "20px",
                  }}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <img src={Plus} alt="aw" width="30px"></img>
                  <input
                    type="file"
                    id="image2"
                    name="image2"
                    hidden
                    onChange={handleChange2}
                  />
                </div>
              </label>
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
              <label
                htmlFor="image3"
                style={{
                  border: "2px dashed grey",
                  width: "23%",
                  height: "90px",
                  width: "90px",
                  borderRadius: "20px",
                }}
                className="mt-2"
              >
                <div
                  style={{
                    width: "100%",
                    height: "90px",
                    borderRadius: "20px",
                  }}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <img src={Plus} alt="aw" width="30px"></img>
                  <input
                    type="file"
                    id="image3"
                    name="image3"
                    hidden
                    onChange={handleChange3}
                  />
                </div>
              </label>
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
              <label
                htmlFor="image4"
                style={{
                  border: "2px dashed grey",
                  width: "23%",
                  height: "90px",
                  width: "90px",
                  borderRadius: "20px",
                }}
                className="mt-2"
              >
                <div
                  style={{
                    width: "100%",
                    height: "90px",
                    borderRadius: "20px",
                  }}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <img src={Plus} alt="aw" width="30px"></img>
                  <input
                    type="file"
                    id="image4"
                    name="image4"
                    hidden
                    onChange={handleChange4}
                  />
                </div>
              </label>
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
              <label
                htmlFor="image5"
                style={{
                  border: "2px dashed grey",
                  width: "23%",
                  height: "90px",
                  borderRadius: "20px",
                }}
                className="mt-2"
              >
                <div
                  style={{
                    width: "100%",
                    height: "90px",
                    borderRadius: "20px",
                  }}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <img src={Plus} alt="aw" width="30px"></img>
                  <input
                    type="file"
                    id="image5"
                    name="image5"
                    hidden
                    onChange={handleChange5}
                  />
                </div>
              </label>
            )}
          </div>
        </div>
        <div
          style={{ width: "50%" }}
          className="d-flex flex-column justify-content-center align-items-center mb-5"
        >
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Description"
              style={{ backgroundColor: "#F4F4F4", width: "300px" }}
              value={form.projectDesc}
              name="projectDesc"
              onChange={handleChange}
            />
          </Form.Group>
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
