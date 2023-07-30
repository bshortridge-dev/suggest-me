import { useEffect } from "react";
import { NewPost } from "./NewPost";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export const Ask = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      } else {
        return;
      }
    });
  }, [navigate]);

  return (
    <main className="hero max-w-2xl m-auto">
      <NewPost />
    </main>
  );
};
