import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Mockup from "../assets/mockup.png";
import NavBar from "./NavBar";

function Detail() {
  const [state] = useContext(UserContext);

  useEffect(() => {
    document.title = "Detail Post";
  }, []);

  let { id } = useParams();
  let { data: post } = useQuery("posttCache", async () => {
    const response = await API.get("/post/" + id);
    return response.data.data;
  });

  return (
    <div>
      <NavBar />
      <div
        className="mx-auto"
        style={{
          marginTop: "10px",
          height: "90%",
          width: "40%",
        }}
      >
        <div className="d-flex align-items-center justify-content-between my-4">
          <div className="d-flex align-items-center">
            <img
              src={"http://localhost:5000/uploads/" + post?.userId?.image}
              style={{ borderRadius: "50px" }}
              width="60px"
            ></img>
            <div className="ms-4">
              <span className="fw-bold fs-5">{post?.title}</span>
              <br />
              <span className="fs-5">{post?.userId?.name}</span>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="px-4 me-4"
              style={{
                background: "#2FC4B2",
                border: "none",
                float: "right",
                width: "100px",
              }}
              onClick={{}}
            >
              Hire
            </Button>
            <Button
              type="submit"
              className="px-4 me-4"
              style={{
                background: "#E7E7E7",
                border: "none",
                float: "right",
                width: "100px",
                color: "black",
              }}
              onClick={{}}
            >
              Follow
            </Button>
          </div>
        </div>
        <img
          src={"http://localhost:5000/uploads/" + post?.image1}
          style={{ width: "100%" }}
        ></img>
        <div className="d-flex justify-content-center mb-4">
          <img
            src={"http://localhost:5000/uploads/" + post?.image2}
            style={{
              width: "20%",
              height: "100px",
              objectFit: "cover",
              display: "block",
              margin: "10px",
            }}
          ></img>
          <img
            src={"http://localhost:5000/uploads/" + post?.image3}
            style={{
              width: "20%",
              height: "100px",
              objectFit: "cover",
              display: "block",
              margin: "10px",
            }}
          ></img>
          <img
            src={"http://localhost:5000/uploads/" + post?.image4}
            style={{
              width: "20%",
              height: "100px",
              objectFit: "cover",
              display: "block",
              margin: "10px",
            }}
          ></img>
          <img
            src={"http://localhost:5000/uploads/" + post?.image5}
            style={{
              width: "20%",
              height: "100px",
              objectFit: "cover",
              display: "block",
              margin: "10px",
            }}
          ></img>
        </div>
        <p className="fw-bold fs-5">👋 Say Hello {post?.userId?.email}</p>
        <p className="mb-5 fs-5">
        {post?.desc}
        </p>
      </div>
    </div>
  );
}

export default Detail;
