import { auth, provider } from "../config/firebase";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useLottie } from "lottie-react";
import signup from "../assets/signup.json";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const Register = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  //
  // Animation settings
  //
  const lottieOptions = {
    animationData: signup,
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

  const handleEmailSignUp = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (email && password) {
      try {
        const signInResult = await createUserWithEmailAndPassword(
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
            <h1 className="text-4xl font-bold">Register Now</h1>
            <p className="py-6">
              Join Suggested today and embark on an exciting cinematic journey
              like never before! Whether you're a film buff or a TV show
              aficionado, our platform is your gateway to endless entertainment
              possibilities. Share your favorite movies and series with us, and
              let our community guide you on your next binge-worthy adventure!
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
                  <Link to="/Login">
                    <span className="label-text-alt link link-hover hover:text-success pr-2">
                      Already a member? Return to Login
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
                  onClick={handleEmailSignUp}
                >
                  Register
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11ZM8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z"
                      fill="currentColor"
                    />
                    <path
                      d="M11 14C11.5523 14 12 14.4477 12 15V21H14V15C14 13.3431 12.6569 12 11 12H5C3.34315 12 2 13.3431 2 15V21H4V15C4 14.4477 4.44772 14 5 14H11Z"
                      fill="currentColor"
                    />
                    <path
                      d="M18 7H20V9H22V11H20V13H18V11H16V9H18V7Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <span className="m-auto justify-center pt-5">- or -</span>
              </div>

              <button
                className="btn btn-ghost btn-sm rounded-md btn-block pt-3 pb-6"
                onClick={handleGoogleSignIn}
              >
                Sign up with Google
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};
