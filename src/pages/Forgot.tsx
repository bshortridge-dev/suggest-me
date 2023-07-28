import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export const Forgot = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleSendPassword = async () => {
    const email = emailRef.current?.value;
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Check your email for a password reset link");
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main>
      <input
        type="text"
        ref={emailRef}
        placeholder="Email"
        className="input input-bordered w-full max-w-xs"
      />
      <button className="btn btn-wide" onClick={handleSendPassword}>
        Wide
      </button>
    </main>
  );
};
