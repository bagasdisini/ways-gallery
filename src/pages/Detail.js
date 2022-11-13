import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

function Detail() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Detail Post";
  }, []);

  let { id } = useParams();
  let { data: post, refetch } = useQuery("posttCache", async () => {
    const response = await API.get("/post/" + id);
    return response.data.data;
  });

  const [form1] = useState({
    following: "null",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("following", post.userId.id);

      const response = await API.patch(`/user/${state?.user.id}`, formData);

      const auth = await API.get("/check-auth");

      let payload = auth.data.data;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit1 = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("following", form1.following);

      const response = await API.patch(`/user/${state?.user.id}`, formData);

      const auth = await API.get("/check-auth");

      let payload = auth.data.data;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

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
              src={
                post?.userId?.image === ""
                  ? "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                  : post?.userId?.image
              }
              style={{ borderRadius: "50px" }}
              width="60px"
            ></img>
            <div className="ms-4">
              <span className="fw-bold fs-5">{post?.title}</span>
              <br />
              {post?.userId?.id !== state?.user?.id ? (
                <div
                  onClick={() => {
                    navigate(`/profile-user/${post?.userId?.id}`);
                  }}
                >
                  <span className="fs-5">{post?.userId?.name}</span>
                </div>
              ) : (
                <div>
                  <span className="fs-5">{post?.userId?.name}</span>
                </div>
              )}
            </div>
          </div>
          {post?.userId?.id !== state?.user?.id ? (
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
                onClick={() => {
                  navigate(`/hire/${post?.userId?.id}`);
                }}
              >
                Hire
              </Button>

              {state?.user?.following == "null" ? (
                <Button
                  type="submit"
                  className="px-4 me-4"
                  style={{
                    background: "#E7E7E7",
                    border: "none",
                    color: "black",
                    float: "right",
                  }}
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Follow
                </Button>
              ) : (
                <></>
              )}

              {state?.user?.following == post?.userId?.id ? (
                <Button
                  type="submit"
                  className="px-4 me-4"
                  style={{
                    background: "#2FC4B2",
                    border: "none",
                    float: "right",
                  }}
                  onClick={(e) => {
                    handleSubmit1(e);
                  }}
                >
                  Unfollow
                </Button>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <img
          src={
            post?.image1
              ? post?.image1
              : "https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg"
          }
          style={{ width: "100%" }}
        ></img>
        <div className="d-flex justify-content-center mb-4">
          {post?.image2 ? (
            <img
              src={post?.image2}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                display: "block",
                margin: "5px 2px",
              }}
            ></img>
          ) : (
            <></>
          )}
          {post?.image3 ? (
            <img
              src={post?.image3}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                display: "block",
                margin: "5px 2px",
              }}
            ></img>
          ) : (
            <></>
          )}
          {post?.image4 ? (
            <img
              src={post?.image4}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                display: "block",
                margin: "5px 2px",
              }}
            ></img>
          ) : (
            <></>
          )}
          {post?.image5 ? (
            <img
              src={post?.image5}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                display: "block",
                margin: "5px 2px",
              }}
            ></img>
          ) : (
            <></>
          )}
        </div>
        <p className="fw-bold fs-5">
          👋 Say Hello{" "}
          <span style={{ color: "#2FC4B2" }}> {post?.userId?.email}</span>
        </p>
        <p className="mb-5 fs-5">{post?.desc}</p>
      </div>
    </div>
  );
}

export default Detail;
