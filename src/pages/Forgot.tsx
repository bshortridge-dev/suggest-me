import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import forgotPass from "../assets/forgot.json";
import { motion } from "framer-motion";
import { useLottie } from "lottie-react";

const lottieOptions = {
  animationData: forgotPass,
  loop: true,
  speed: 0.2,
  autoplay: true,
  style: {
    width: "300px",
    height: "300px",
    margin: "auto",
    display: "block",
    minWidth: "300px",
    minHeight: "300px",
    justifyContent: "center",
  },
};

export const Forgot = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { View } = useLottie(lottieOptions);

  const handleSendPassword = async () => {
    const email = emailRef.current?.value;
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        setIsEmailSent(true);
      } catch (error: unknown) {
        const errorObj = error as { message: string };
        setIsError(true);
        setErrorMessage(errorObj.message);
        console.log(errorMessage);
      }
    }
  };

  return (
    <main className="hero">
      <div className="card w-96 bg-base shadow-md shadow-stone-800">
        <div className="card-body">
          <motion.span
            animate={{
              scale: [0, 1.3, 1],
            }}
            transition={{ delay: 1 }}
          >
            {View}
          </motion.span>
          <div className="form-control">
            <h1 className="text-2xl font-semibold pb-5 ">Forgot Password?</h1>
            <p className="text-sm pb-3">
              It happens to the best of us, enter your email and we will send
              you a link to reset it.
            </p>
            <input
              type="text"
              ref={emailRef}
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label justify-self-start">
              <div>
                <Link to="/Login">
                  <span className="flex-col justify-start label-text-alt link link-hover hover:text-success">
                    Return to login page.
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="flex-col justify-self-end inline w-4 h-4 link link-hover hover:text-success"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </label>
          </div>

          <div className={`alert bg-success ${isEmailSent ? "" : "hidden"}`}>
            <span className="flex-col justify-start text-success-content">
              Check your email for reset link.
            </span>
            <label onClick={() => setIsEmailSent(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="flex-col w-8 h-8 justify-self-end hover:text-error cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </label>
          </div>
          <div className={`alert bg-error ${isError ? "" : "hidden"}`}>
            <span className="flex-col justify-start">
              Enter a valid user E-Mail address. <br />
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
          <div className="m-auto form-control mt-6 justify-center">
            <button
              className="btn btn-sm btn-secondary rounded-md"
              onClick={handleSendPassword}
            >
              Send Password Reset Email
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
