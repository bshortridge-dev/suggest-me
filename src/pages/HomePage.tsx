import { useLottie } from "lottie-react";
import movies from "../assets/movies.json";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
          <motion.div
            animate={{
              scale: [0, 1.3, 1],
            }}
            transition={{ delay: 1 }}
            whileHover={{
              scale: 1.2,
            }}
          >
            {View}
          </motion.div>
          <div>
            <motion.h1
              className="text-5xl font-bold"
              animate={{
                x: [100, 0],

                opacity: [0, 1],
              }}
              transition={{ delay: 0.5 }}
            >
              Welcome to Suggested!
            </motion.h1>
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
