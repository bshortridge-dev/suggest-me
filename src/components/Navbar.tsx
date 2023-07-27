import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import "../index.css";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const [darkMode, setDarkMode] = useState(false);
  // get system preference for dark mode
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDark) {
      setDarkMode(true);
    }
  }, []);

  // set dark mode/light mode
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.setAttribute("data-theme", "business");
      // change html data-theme attribute
    } else {
      html.setAttribute("data-theme", "corporate");
    }
  }, [darkMode]);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav>
      <div className="navbar sticky drop-shadow-lg border border-t-0 border-r-0 border-l-0 border-b-slate-700">
        <div className="flex-1 ml-5">
          <Link to="/">
            <img src="src/assets/logo.png" alt="logo" />
          </Link>
          <Link to="/">
            <span className="hidden md:block rounded-lg normal-case text-xl ml-2 h-5 pl-2 items-center">
              SuggestMe.io
            </span>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <Link to="/Home">
            <span className="btn btn-outline btn-secondary btn-sm rounded-md normal-case text-l">
              Home
            </span>
          </Link>
          <Link to="/About">
            <a className="btn btn-outline btn-secondary btn-sm rounded-md normal-case text-l">
              About
            </a>
          </Link>
          {/* Dark mode toggle */}
          <label
            htmlFor="darkModeToggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="toggle toggle-secondary toggle-sm"
                  id="darkModeToggle"
                  checked={!darkMode} // Invert the value for the checked attribute
                  onChange={handleDarkModeToggle}
                />
              </label>
            </div>
          </label>
          <div className="dropdown dropdown-end pl-3 mr-5">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  className="avatar"
                  src={user?.photoURL || "src/assets/user.png"}
                  width="70"
                  height="70"
                  alt="Avatar"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                {user ? (
                  <button onClick={() => auth.signOut()}>Sign Out</button>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
