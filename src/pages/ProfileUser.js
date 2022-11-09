import React, { useState, useEffect, useRef, useMemo } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import NavBar from "./NavBar";
import Hire from "./Hire";
import Detail from "../assets/detail.png";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function EditProfile() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const navigateHire = () => {
    navigate("/hire");
  };

  useEffect(() => {
    document.title = "Profile";
  }, []);

  let { id } = useParams();

  let { data: user } = useQuery("userCache", async () => {
    const response = await API.get("/user/" + id);
    return response.data.data;
  });

  console.log(id);
  console.log(state.user.id);

  return (
    <div>
      <NavBar />
      {user.id === state.user.id ? (
        <div>
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
                src={
                  state.user.image === ""
                    ? state.user.image
                    : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                }
                alt="a"
                style={{
                  position: "relative",
                  objectFit: "cover",
                  borderRadius: "50px",
                }}
                width="60px"
                height="60px"
              ></img>
              <h5 className="mt-4 fw-bold">{state.user.name}</h5>
              <h3 className="fw-bold mt-4">
                {state.user.greeting !== ""
                  ? state.user.greeting
                  : "Welcome to my profile!"}
              </h3>
              <div style={{ position: "relative" }} className="mt-4 ">
                <Button
                  style={{
                    backgroundColor: "#E7E7E7",
                    color: "black",
                    fontSize: "12px",
                    width: "100px",
                    border: "none",
                  }}
                  className="px-4 py-1 fw-bold me-3 fs-6"
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
                  className="px-2 py-1 fs-6"
                  onClick={navigateHire}
                >
                  Hire{" "}
                </Button>
              </div>
            </div>
            <img
              src={
                state.user.bestArt === ""
                  ? state.user.bestArt
                  : "https://prosportsoutlook.com/wp-content/themes/prosports/images/default-post-pic.png"
              }
              alt="a"
              style={{
                position: "relative",
                objectFit: "cover",
                borderRadius: "15px",
              }}
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
            <p className="fw-bold">{state.user.name}'s Works</p>
          </div>
        </div>
      ) : (
        <div>
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
                src={
                  user.image === ""
                    ? user.image
                    : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                }
                alt="a"
                style={{
                  position: "relative",
                  objectFit: "cover",
                  borderRadius: "50px",
                }}
                width="60px"
                height="60px"
              ></img>
              <h5 className="mt-4 fw-bold">{user.name}</h5>
              <h3 className="fw-bold mt-4">
                {user.greeting !== ""
                  ? user.greeting
                  : "Welcome to my profile!"}
              </h3>
              <div style={{ position: "relative" }} className="mt-4 ">
                <Button
                  style={{
                    backgroundColor: "#E7E7E7",
                    color: "black",
                    fontSize: "12px",
                    width: "100px",
                    border: "none",
                  }}
                  className="px-4 py-1 fw-bold me-3 fs-6"
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
                  className="px-2 py-1 fs-6"
                  onClick={navigateHire}
                >
                  Hire{" "}
                </Button>
              </div>
            </div>
            <img
              src={
                user.bestArt === ""
                  ? user.bestArt
                  : "https://prosportsoutlook.com/wp-content/themes/prosports/images/default-post-pic.png"
              }
              alt="a"
              style={{
                position: "relative",
                objectFit: "cover",
                borderRadius: "15px",
              }}
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
            <p className="fw-bold">{user.name}'s Works</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
