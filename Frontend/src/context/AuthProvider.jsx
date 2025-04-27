import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = async (medicineId, quantity = 1) => {
    try {
      const { data } = await axios.post("http://localhost:5000/cart/add", {
        userId: user._id,
        medicineId,
        quantity,
      });
      setCart(data.cart.medicines);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, cart, setCart, addToCart }}>
      {children}
    </AuthContext.Provider>
  );
};
