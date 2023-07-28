import { useLottie } from "lottie-react";
import movies from "../assets/movies.json";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const lottieOptions = {
    animationData: movies,
    loop: true,
    speed: 0.5,
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
  const { View } = useLottie(lottieOptions);
  return (
    <main>
      <div className="hero min-h-screen bg-base">
        <div className="hero-content flex-col lg:flex-row min-h-screen">
          {View}
          <div>
            <h1 className="text-5xl font-bold">Welcome to Suggest Me!</h1>
            <p className="py-6">
              Discover your next favorite movie or TV show with Suggest Me! Our
              platform allows you to post your favorite films and series, and
              let users from the community give you suggestions based on them.
              Finding the perfect entertainment has never been easier. Let's get
              you started on your cinematic journey:
            </p>
            <Link to="/Login">
              <button className="btn btn-accent">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
