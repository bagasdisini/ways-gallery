import NavBar from "./NavBar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../config/api";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import { useQuery } from "react-query";

function Page() {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  console.log(state);

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    document.title = "WaysGallery";
  }, []);

  let { data: post2 } = useQuery("posttwCache", async () => {
    const response = await API.get("/posts");
    return response.data.data;
  });

  const [filter, setFilter] = useState("null");
  const handleFilterAll = () => setFilter("null");
  const handleFilterFoll = () => setFilter(state.user.following);

  return (
    <div>
      <NavBar />

      <div
        className="mx-auto"
        style={{ height: "90%", width: "80%", marginTop: "30px" }}
      >
        <div className="d-flex justify-content-between">
          <Dropdown>
            <Dropdown.Toggle
              style={{
                backgroundColor: "#E7E7E7",
                color: "black",
                borderColor: "#E7E7E7",
              }}
              className="px-3"
            >
              Filter &ensp;
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleFilterAll}>All</Dropdown.Item>
              <Dropdown.Item onClick={handleFilterFoll}>
                Following
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <InputGroup style={{ width: "200px" }}>
            <Form.Control
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
              style={{
                backgroundColor: "#E7E7E7",
                borderStyle: "none",
                borderRadius: "6px",
              }}
            />
          </InputGroup>
        </div>
        <p className="mt-4 fw-bold fs-5">
          {filter !== "null" ? "Following Post" : "All Post"}
        </p>
        <div className="d-flex flex-wrap justify-content-center">
          {post2?.map((p) =>
            p?.userId?.id == filter ? (
              <div
                key={p.id}
                className="m-1 bg-dark"
                onClick={() => {
                  navigate(`/detail-post/${p.id}`);
                }}
              >
                {p?.image1 ? (
                  <img
                    src={"http://localhost:5000/uploads/" + p.image1}
                    alt="a"
                    width="200px"
                    height="200px"
                    style={{ objectFit: "cover" }}
                  ></img>
                ) : (
                  <img
                    src="https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg"
                    alt="a"
                    width="200px"
                    height="200px"
                    style={{ objectFit: "cover" }}
                  ></img>
                )}
              </div>
            ) : filter == "null" ? (
              <div
                key={p.id}
                className="m-1 bg-dark"
                onClick={() => {
                  navigate(`/detail-post/${p.id}`);
                }}
              >
                {p?.image1 ? (
                  <img
                    src={"http://localhost:5000/uploads/" + p.image1}
                    alt="a"
                    width="200px"
                    height="200px"
                    style={{ objectFit: "cover" }}
                  ></img>
                ) : (
                  <img
                    src="https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg"
                    alt="a"
                    width="200px"
                    height="200px"
                    style={{ objectFit: "cover" }}
                  ></img>
                )}
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
