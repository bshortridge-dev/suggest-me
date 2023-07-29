import "../index.css";
import { Link } from "react-router-dom";
import gitHubLogo from "../assets/github.svg";
import twitterLogo from "../assets/twit.png";
import gramLogo from "../assets/gram.svg";

export const Footer = () => {
  return (
    <footer className="footer footer-center mt-40 p-10 bg-base  text-base-content border border-t-1 border-r-0 border-b-0 border-l-0 border-t-gray-800">
      <div className="grid grid-flow-col gap-4">
        <Link to="/" className="link link-hover">
          Home
        </Link>
        <Link to="/Latest" className="link link-hover">
          Latest
        </Link>
        <Link to="/Login" className="link link-hover">
          Login
        </Link>
        <Link to="/Register" className="link link-hover">
          Register
        </Link>
        <Link to="/Contact" className="link link-hover">
          Contact
        </Link>
      </div>
      <div className="grid grid-flow-col gap-4">
        <Link
          to="https://www.instagram.com/b.el.short/"
          className="link link-hover"
          target="_blank"
        >
          <img
            src={gramLogo}
            alt="github"
            className="btn  btn-ghost btn-circle hover:scale-150"
          />
        </Link>
        <Link
          to="https://github.com/bshortridge-dev"
          className="link link-hover"
          target="_blank"
        >
          <img
            src={gitHubLogo}
            alt="github"
            className="btn btn-ghost btn-circle hover:scale-150"
          />
        </Link>
        <Link
          to="https://twitter.com/coding_bs"
          className="link link-hover"
          target="_blank"
        >
          <img
            src={twitterLogo}
            alt="github"
            className="btn btn-ghost btn-circle hover:scale-150"
          />
        </Link>
      </div>

      <div>
        <p>Copyright © 2023 - Made with ❤️ By Brandon Shortridge </p>
      </div>
    </footer>
  );
};
