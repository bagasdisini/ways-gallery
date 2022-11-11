import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";
import NavBar from "./NavBar";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function EditProfile() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Hire";
  }, []);

  let { id } = useParams();

  const admin_id = id
  const buyer_id = `${state.user.id}`

  const [form, setForm] = useState({
    admin_id: admin_id,
    buyer_id: buyer_id,
    title: "",
    desc: "",
    startDate: "",
    endDate: "",
    price: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("desc", form.desc);
      formData.set("startDate", form.startDate);
      formData.set("endDate", form.endDate);
      formData.set("price", form.price);
      formData.set("status", form.status);

      const response = await API.post(`/transaction`, formData);

      const auth = await API.get("/check-auth");

      let payload = auth.data.data;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <div
        className="mx-auto mt-4"
        style={{
          height: "90%",
          width: "45%",
        }}
      >
        <Form.Group className="mb-3 mt-5" style={{ width: "100%" }}>
          <Form.Control
            type="text"
            placeholder="Title"
            style={{ backgroundColor: "#F4F4F4" }}
          />
        </Form.Group>
        <Form.Group className="mb-3" style={{ width: "100%" }}>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Description"
            style={{ backgroundColor: "#F4F4F4" }}
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Form.Group className="mb-3 me-2" style={{ width: "50%" }}>
            <Form.Control
              type="text"
              placeholder="Title"
              style={{ backgroundColor: "#F4F4F4" }}
            />
          </Form.Group>
          <Form.Group className="mb-3 ms-2" style={{ width: "50%" }}>
            <Form.Control
              type="text"
              placeholder="Start Project"
              style={{ backgroundColor: "#F4F4F4" }}
            />
          </Form.Group>
        </div>
        <Form.Group className="mb-3" style={{ width: "100%" }}>
          <Form.Control
            type="text"
            placeholder="Price"
            style={{ backgroundColor: "#F4F4F4" }}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
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
          >
            Bidding
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
