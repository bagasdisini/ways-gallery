import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";
import NavBar from "./NavBar";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Hire() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Hire";
  }, []);

  let { id } = useParams();

  const buyer_id = state.user.id;

  const [form, setForm] = useState({
    admin_id: parseInt(id),
    buyer_id: buyer_id,
    title: "",
    desc: "",
    startDate: "",
    endDate: "",
    price: "",
  });

  const { title, desc, startDate, endDate, price } = form;

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

      const response = await API.post(`/transaction`, form);

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
            onChange={handleChange}
            name="title"
            value={title}
          />
        </Form.Group>
        <Form.Group className="mb-3" style={{ width: "100%" }}>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Description"
            style={{ backgroundColor: "#F4F4F4" }}
            onChange={handleChange}
            name="desc"
            value={desc}
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Form.Group className="mb-3 me-2" style={{ width: "50%" }}>
            <Form.Control
              type="date"
              placeholder="Start Project"
              style={{ backgroundColor: "#F4F4F4" }}
              onChange={handleChange}
              name="startDate"
              value={startDate}
            />
          </Form.Group>
          <Form.Group className="mb-3 ms-2" style={{ width: "50%" }}>
            <Form.Control
              type="date"
              placeholder="End Project"
              style={{ backgroundColor: "#F4F4F4" }}
              onChange={handleChange}
              name="endDate"
              value={endDate}
            />
          </Form.Group>
        </div>
        <Form.Group className="mb-3" style={{ width: "100%" }}>
          <Form.Control
            type="number"
            placeholder="Price"
            style={{ backgroundColor: "#F4F4F4" }}
            onChange={handleChange}
            name="price"
            value={price}
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
            onClick={(e) => handleSubmit(e)}
          >
            Bidding
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Hire;
