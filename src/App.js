import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navigation from "./pages/NavBar";
import Page from "./pages/LandingPage";
import Detail from "./pages/Detail";
import EditProfile from "./pages/EditProfile";
import MyOrder from "./pages/MyOrder";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Hire from "./pages/Hire";
import DetailUser from "./pages/DetailUser";
import DetailMy from "./pages/DetailMy";
import SendProject from "./pages/SendProject";
import ViewProject from "./pages/ViewProject";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React from "react";
import { CartProvider, useCart } from "react-use-cart";
import { API, setAuthToken } from "./config/api";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const {
    addItem,
    totalItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart,
  } = useCart();

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
        {/* <Route path="/" element={<Page />} />
        <Route
          path="/detail-restaurant/:id"
          element={<Detail addItem={addItem} />}
        />
        <Route path="/my-profile/" element={<Profile />} />
        <Route path="/profile-partner" element={<ProfilePartner />} />
        <Route
          path="/cart"
          element={
            <Cart
              items={items}
              updateItemQuantity={updateItemQuantity}
              removeItem={removeItem}
              cartTotal={cartTotal}
              totalItems={totalItems}
              emptyCart={emptyCart}
            />
          }
        />
        <Route path="/edit-my-profile" element={<EditProfile />} />
        <Route path="/edit-profile-partner" element={<EditProfilePartner />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} /> */}
        {/* <Route path="/transaction" element={<Transaction />} /> */}
        <Route path="/home" element={<ViewProject />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
