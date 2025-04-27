import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";

const App = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  console.info("-------------------------------");
  console.info("user => ", user);
  console.info("-------------------------------");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, [user, navigate]);

  return <div className="text-center text-lg font-semibold">Loading...</div>;
};

export default App;
