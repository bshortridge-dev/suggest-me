import { Link } from "react-router-dom";
import { useLottie } from "lottie-react";
import movies from "../assets/movies.json";
import { motion } from "framer-motion";

const lottieOptions = {
  animationData: movies,
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

export const HomePage = () => {
  const { View } = useLottie(lottieOptions);
  return (
    <main className="z-1">
      <div className="hero bg-base z-0">
        <div className="hero-content flex-col lg:flex-row">
          <motion.span
            animate={{
              scale: [0, 1.3, 1],
            }}
            transition={{ delay: 1 }}
          >
            {View}
          </motion.span>
          <div>
            <h1 className="text-4xl font-bold">Welcome to Suggested!</h1>
            <p className="py-6">
              Discover your next favorite movie or TV show with Suggested! Our
              platform allows you to post your favorite films and series, and
              let users from the community give you suggestions based on what
              you already enjoy. Finding the perfect entertainment has never
              been easier. Let's get you started on your cinematic journey:
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
