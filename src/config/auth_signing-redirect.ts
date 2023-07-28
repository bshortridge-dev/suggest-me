import { getAuth, signInWithRedirect } from "firebase/auth";
import { provider } from "./firebase";

const auth = getAuth();
signInWithRedirect(auth, provider);
