import { auth, provider } from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useLottie } from "lottie-react";
import eatingPopcorn from "../assets/popcorn.json";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const lottieOptions = {
    animationData: eatingPopcorn,
    loop: true,
    autoplay: true,
    style: {
      width: "300px",
      height: "300px",
      margin: "auto",
      display: "block",
      justifyContent: "center",
    },
  };
  const { View } = useLottie(lottieOptions);

  const handleGoogleSignIn = async () => {
    const signInResult = await signInWithPopup(auth, provider);
    console.log(signInResult);
    navigate("/latest");
  };
  //
  // Handle email and password sign in
  //
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleEmailSignIn = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (email && password) {
      try {
        const signInResult = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(signInResult);
        navigate("/latest");
      } catch (error: unknown) {
        const errorObj = error as { message: string };
        setIsError(true);
        setErrorMessage(errorObj.message);
        console.log(errorMessage);
      }
    }
  };

  //
  // Check if user is logged in already if they are redirect
  //
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/latest");
      } else {
        return;
      }
    });
  }, [navigate]);

  return (
    <main>
      <div className="hero bg-base">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-left lg:text-left ">
            <motion.div
              animate={{
                opacity: [0, 1, 1],
                y: [-300, 0, 0],
              }}
              transition={{ delay: 1 }}
            >
              {View}
            </motion.div>
            <h1 className="text-4xl font-bold">Login</h1>
            <p className="py-6">
              Login to start getting suggestions. Make a post to get suggestions
              from other users, or use our automated AI to generate similar
              suggestions for you.
            </p>
          </div>
          <motion.div
            animate={{
              scale: [0, 1.1, 1],
            }}
            transition={{ delay: 0 }}
            className="card flex-shrink-0 w-full max-w-sm shadow-md shadow-stone-800 bg-base"
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  ref={emailRef}
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  ref={passwordRef}
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <Link to="/Forgot">
                    <span className="label-text-alt link link-hover hover:text-accent">
                      Forgot password?
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 relative inline text-warning"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                  </Link>
                </label>
                <label className="label">
                  <Link to="/Register">
                    <span className="label-text-alt link link-hover hover:text-success">
                      Dont have an account? Register Now.
                    </span>
                  </Link>
                </label>
              </div>

              <div className={`alert bg-error ${isError ? "" : "hidden"}`}>
                <span className="flex-col justify-start">
                  {errorMessage}
                  <br />
                </span>
                <label onClick={() => setIsError(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex-col w-8 h-8 justify-self-end hover:text-black cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-accent rounded-md"
                  onClick={handleEmailSignIn}
                >
                  Login
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </button>
                <span className="m-auto justify-center pt-5">- or -</span>
              </div>

              <button
                className="btn btn-ghost btn-sm rounded-md btn-block pt-3 pb-6"
                onClick={handleGoogleSignIn}
              >
                Sign in with Google
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};
