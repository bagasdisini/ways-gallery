import React, { useState, useEffect, useRef, useMemo } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import NavBar from "./NavBar";
import BK from "../assets/BK.png";
import Mockup from "../assets/mockup.png";
import Detail from "../assets/detail.png";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function EditProfile() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Profile";
  }, []);

  const idid = state?.user.id;

  let { data: user } = useQuery("userCache", async () => {
    const response = await API.get("/user/" + idid);
    return response.data.data;
  });

  return (
    <div>
      <NavBar />
      <div
        className="mx-auto mt-4 d-flex justify-content-between"
        style={{
          height: "90%",
          width: "60%",
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
                backgroundColor: "#E7E7E7",
                color: "black",
                fontSize: "12px",
                width: "100px",
                border: "none",
              }}
              className="px-4 py-1 fw-bold me-3 "
            >
              Follow
            </Button>
            <Button
              style={{
                backgroundColor: "#2FC4B2",
                fontSize: "12px",
                width: "100px",
                border: "none",
              }}
              className="px-2 py-1"
            >
              Hire{" "}
            </Button>
          </div>
        </div>
        <img
          src={state.bestart === "" ? state.bestart : "https://prosportsoutlook.com/wp-content/themes/prosports/images/default-post-pic.png"}
          alt="a"
          style={{ position: "relative", objectFit:"cover", borderRadius:"15px" }}
          width="500px"
          height="400px"
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
        <p className="fw-bold">Geralt Works</p>
      </div>
    </div>
  );
}

export default EditProfile;
