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
        className="mx-auto d-flex mt-4"
        style={{
          marginTop: "10px",
          height: "90%",
          width: "70%",
        }}
      >
        <div className="mx-auto">
        <img src={Mockup} style={{ width: "50%" }}></img>
        <img
          src={Mockup}
          style={{
            width: "13%",
            height: "100px",
            objectFit: "cover",
            display: "block",
            margin: "10px 0 30px",
          }}
        ></img></div>
        <div style={{marginLeft:"-400px"}}>
          <p className="mb-5">
            Hey, guys! Super excited to share my new web app interface and
            elements that I recently worked on. Hope you enjoyed it. Thanks for
            your likes and comments!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
