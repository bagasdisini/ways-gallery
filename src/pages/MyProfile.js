import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Detail from "../assets/detail.png";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { API, setAuthToken } from "../config/api";
import { useQuery } from "react-query";

function MyProfile() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Profile";
  }, []);

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  let { data: post } = useQuery("posttCache", async () => {
    const response = await API.get("/posts");
    const response2 = response.data.data.filter(
      (p) => p.userID == state.user.id
    );
    return response2;
  });

  const navigateEdit = () => {
    navigate("/edit-user");
  };

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
                state.user.image === "http://localhost:5000/uploads/"
                  ? "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                  : state.user.image
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
                  backgroundColor: "#2FC4B2",
                  fontSize: "12px",
                  width: "100px",
                  border: "none",
                }}
                className="px-2 py-1 fs-6 mt-3"
                onClick={navigateEdit}
              >
                Edit Profile{" "}
              </Button>
            </div>
          </div>
          <img
            src={
              state.user.bestArt === ""
                ? "https://prosportsoutlook.com/wp-content/themes/prosports/images/default-post-pic.png"
                : state.user.bestArt
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
          <p className="fw-bold">My Works</p>
          <div className="d-flex flex-wrap justify-content-center my-4">
            {post?.map((p) => (
              <div
                key={p?.id}
                className="m-3"
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

export default MyProfile;
