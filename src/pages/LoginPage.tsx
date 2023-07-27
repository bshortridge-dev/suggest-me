import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const signIn = async () => {
    const signInResult = await signInWithPopup(auth, provider);
    console.log(signInResult);
    navigate("/");
  };
  return (
    <div>
      <p>Sign in with Google to Continue</p>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  );
};
