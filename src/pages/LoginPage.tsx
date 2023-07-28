import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useLottie } from "lottie-react";
import eatingPopcorn from "../assets/popcorn.json";
import { useEffect } from "react";

export const LoginPage = () => {
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
  const navigate = useNavigate();
  const signIn = async () => {
    const signInResult = await signInWithPopup(auth, provider);
    console.log(signInResult);
    navigate("/");
  };

  // Check if user is logged in already
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/latest");
      } else {
        return;
      }
    });
  }, []);

  return (
    <main>
      <div className="hero min-h-screen bg-base">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-left lg:text-left ">
            {View}
            <h1 className="text-4xl font-bold">Login</h1>
            <p className="py-6">
              Login to start getting suggestions. Make a post to get suggestions
              from other users, or use our automated AI to generate similar
              suggestions for you.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-md shadow-stone-800 bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
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
              <div className="form-control mt-6">
                <button className="btn btn-accent rounded-md">
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
                className="btn btn-ghost btn-sm rounded-md btn-block pt-3"
                onClick={signIn}
              >
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
