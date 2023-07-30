import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useEffect } from "react";

export const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/Login");
      } else {
        return;
      }
    });
  }, [navigate]);
  return <main>Dashboard</main>;
};
