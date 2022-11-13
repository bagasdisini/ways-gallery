import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import NavBar from "./NavBar";

function ViewProject() {
  useEffect(() => {
    document.title = "View Project";
  }, []);

  let { id } = useParams();
  let { data: transaction2 } = useQuery("transaction2awdtCache", async () => {
    const response = await API.get("/transaction/" + id);
    return response.data.data;
  });

  return (
    <div>
      <NavBar />
      <div
        className="mx-auto d-flex mt-4 justify-content-evenly"
        style={{
          marginTop: "10px",
          height: "90%",
          width: "70%",
        }}
      >
        <div className="mx-auto" style={{ width: "45%" }}>
          <img
            src={
              transaction2?.image1
                ? transaction2?.image1
                : "https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg"
            }
            style={{ width: "100%" }}
            alt="a"
          ></img>
          <div className="d-flex justify-content-center mb-4">
            {transaction2?.image2 ? (
              <img
                src={transaction2?.image2}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  display: "block",
                  margin: "5px 2px",
                }}
                alt="a"
              ></img>
            ) : (
              <></>
            )}
            {transaction2?.image3 ? (
              <img
                src={transaction2?.image3}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  display: "block",
                  margin: "5px 2px",
                }}
                alt="a"
              ></img>
            ) : (
              <></>
            )}
            {transaction2?.image4 ? (
              <img
                src={transaction2?.image4}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  display: "block",
                  margin: "5px 2px",
                }}
                alt="a"
              ></img>
            ) : (
              <></>
            )}
            {transaction2?.image5 ? (
              <img
                src={transaction2?.image5}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  display: "block",
                  margin: "5px 2px",
                }}
                alt="a"
              ></img>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div style={{ width: "45%" }}>
          <p className="mt-1 fs-4">{transaction2?.projectDesc}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewProject;
