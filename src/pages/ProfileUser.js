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

function ProfileUser() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  let { id } = useParams();

  let { data: user, refetch } = useQuery("userCache", async () => {
    const response = await API.get(`/user/${id}`);
    return response.data.data;
  });

  let { data: posts } = useQuery("postsswwCache", async () => {
    const response = await API.get("/posts");
    const response2 = response.data.data.filter(
      (p) => p.userID == id
    );
    return response2;
  });

  useEffect(() => {
    document.title = "Profile";
    refetch();
  }, []);

  return (
    <div>
      <NavBar />
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
                  user?.image !== ""
                    ? user?.image
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
              <h5 className="mt-4 fw-bold">{user?.name}</h5>
              <h3 className="fw-bold mt-4">
                {user?.greeting !== ""
                  ? user?.greeting
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
                  onClick={() => {
                    navigate(`/hire/${id}`);
                  }}
                >
                  Hire{" "}
                </Button>
              </div>
            </div>
            <img
              src={
                user?.bestArt === ""
                  ? user?.bestArt
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
            className="mx-auto mt-5"
            style={{
              height: "90%",
              width: "70%",
              position: "relative",
            }}
          >
            <p className="fw-bold">{user?.name}'s Works</p>
            <div className="d-flex flex-wrap justify-content-center my-4">
            {posts?.map((p, index) => (
              <div
                key={index}
                className="m-1"
                onClick={() => {
                  navigate(`/detail-post/${p.id}`);
                }}
              >
                {p?.image1 ? (
                  <img
                    src={"http://localhost:5000/uploads/" + p?.image1}
                    alt="a"
                    width="200px"
                    height="200px"
                    style={{ objectFit: "cover", borderRadius: "10px" }}
                  ></img>
                ) : (
                  <img
                    src="https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg"
                    alt="a"
                    width="200px"
                    height="200px"
                    style={{ objectFit: "cover", borderRadius: "10px" }}
                  ></img>
                )}
              </div>
            ))}
          </div>
          </div>
        </div>
    </div>
  );
}

export default ProfileUser;
