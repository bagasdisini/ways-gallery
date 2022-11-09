import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import BK from "../assets/BK.png";
import Mockup from "../assets/mockup.png";
import NavBar from "./NavBar";
import toRupiah from "@develoka/angka-rupiah-js";
import Dropdown from "react-bootstrap/Dropdown";

function Detail({ addItem }) {
  const [state] = useContext(UserContext);

  const showToastMessage = () => {
    toast.success("Sukses menambahkan ke keranjang!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const [category, setCategory] = useState(1);

  const handleCat1 = () => setCategory(1);
  const handleCat2 = () => setCategory(2);

  useEffect(() => {
    document.title = "Restaurant Menu";
  }, []);

  let { id } = useParams();
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    const response2 = response.data.data.filter((p) => p.admin_id == id);
    return response2;
  });

  return (
    <div>
      <NavBar />
      <div
        className="mx-auto"
        style={{
          marginTop: "10px",
          height: "90%",
          width: "45%",
        }}
      >
        <div className="d-flex align-items-center justify-content-between my-4">
          <div className="d-flex align-items-center">
            <img src={BK} style={{ borderRadius: "50px" }}></img>
            <div className="ms-4">
              <span className="fw-bold fs-5">Robo-x landing Page</span>
              <br />
              <span className="fs-5">Geralt</span>
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
        <img src={Mockup} style={{ width: "100%" }}></img>
        <img
          src={Mockup}
          style={{
            width: "20%",
            height: "100px",
            objectFit: "cover",
            display: "block",
            margin: "10px auto 30px",
          }}
        ></img>
        <p className="fw-bold fs-5">👋 Say Hello geralt@gmail.com</p>
        <p className="mb-5 fs-5">
          Hey, guys! Super excited to share my new web app interface and
          elements that I recently worked on. Hope you enjoyed it. Thanks for
          your likes and comments!
        </p>
      </div>
    </div>
  );
}

export default Detail;
