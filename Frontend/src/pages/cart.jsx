import axios from "axios";
import React, { useEffect, useState } from "react";

const Cart = () => {
  // const [cart, setcart] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/cart");
  }, []);
  return <div>Cart</div>;
};

export default Cart;
