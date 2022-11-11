import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Page from "./pages/LandingPage";
import Detail from "./pages/Detail";
import EditProfile from "./pages/EditProfile";
import MyOrder from "./pages/MyOrder";
import MyOffer from "./pages/MyOffer";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Hire from "./pages/Hire";
import ProfileUser from "./pages/ProfileUser";
import MyProfile from "./pages/MyProfile";
import SendProject from "./pages/SendProject";
import ViewProject from "./pages/ViewProject";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React from "react";
import { CartProvider } from "react-use-cart";
import { API, setAuthToken } from "./config/api";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

function App() {

  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail-post/:id" element={<Detail />} />
        <Route path="/profile-user/:id" element={<ProfileUser />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/edit-user" element={<EditProfile />} />
        <Route path="/hire/:id" element={<Hire />} />
        <Route path="/upload-post" element={<Upload />} />
        <Route path="/my-order" element={<MyOrder />} />
        <Route path="/my-offer" element={<MyOffer />} />
        <Route path="/send-project" element={<SendProject />} />
        <Route path="/view-project/:id" element={<ViewProject />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
