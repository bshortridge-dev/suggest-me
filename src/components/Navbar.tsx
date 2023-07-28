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
          {/* Logo image and text */}
          <Link to="/">
            <img src="src/assets/logo.png" alt="logo" />
          </Link>
          <Link to="/">
            <span className="rounded-lg normal-case text-xl ml-2 h-5 pl-2 items-center hover:text-accent">
              SuggestMe.io
            </span>
          </Link>
        </div>
        {/* Start of Desktop Navigation*/}
        <div className="flex-none gap-2">
          <Link to="/">
            <span className="hidden md:block normal-case text-l hover:underline hover:text-accent pl-2 pr-2">
              Home
            </span>
          </Link>
          <Link to="/Latest">
            <span className="hidden md:block normal-case text-l hover:underline hover:text-accent pl-2 pr-2">
              Latest
            </span>
          </Link>
          {user ? (
            <>
              <Link to="/Ask">
                <span className="hidden md:block normal-case text-l hover:underline hover:text-accent pl-2 pr-2">
                  Ask Community
                </span>
              </Link>
              <Link to="/AskAI">
                <span className="hidden md:block normal-case text-l hover:underline hover:text-accent pl-2 pr-2">
                  Ask AI
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <span className="hidden md:block hover:underline hover:text-accent">
                  Login
                </span>
              </Link>
            </>
          )}
          {/* Start of Mobile Naviagtion */}
          <div className="md:hidden lg:hidden dropdown mr-5">
            <label
              tabIndex={0}
              className="btn btn-sm btn-secondary hover:btn-accent rounded-2xl swap swap-rotate "
            >
              <input type="checkbox" />
              {/* Hamburger menu icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 swap-off fill-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
              {/* Closing hamburger menu icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 swap-on fill-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <label
                  htmlFor="darkModeToggle"
                  className="flex items-center cursor-pointer"
                >
                  <div className="relative justify-end">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        className="toggle toggle-secondary toggle-sm"
                        id="darkModeToggle"
                        checked={!darkMode} // Invert the value for the checked attribute
                        onChange={handleDarkModeToggle}
                      />
                      {darkMode ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="pl-2 w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                            />
                          </svg>
                          <span className="pl-2">Light Mode</span>
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="pl-2 w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                            />
                          </svg>
                          <span className="pl-2">Dark Mode</span>
                        </>
                      )}
                    </label>
                  </div>
                </label>
              </li>
              <li>
                <Link to="/">
                  <span className="normal-case text-l hover:underline hover:text-accent pl-2 pr-2">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/Latest">
                  <span className="normal-case text-l hover:underline hover:text-accent pl-2 pr-2">
                    Latest
                  </span>
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link to="/Ask">
                      <span className="normal-case text-l hover:underline hover:text-accent pl-2 pr-2">
                        Ask Community
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/AskAI">
                      <span className="normal-case text-l hover:underline hover:text-accent pl-2 pr-2">
                        Ask AI
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login">
                    <span className="hover:underline hover:text-accent">
                      Login
                    </span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {/* Dark mode toggle */}
          <label
            htmlFor="darkModeToggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="hidden md:block toggle toggle-secondary toggle-sm"
                  id="darkModeToggle"
                  checked={!darkMode} // Invert the value for the checked attribute
                  onChange={handleDarkModeToggle}
                />
                {darkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="hidden md:block pl-2 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="hidden md:block pl-2 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                )}
              </label>
            </div>
          </label>
          {/* User avatar dropdown menu*/}
          <div className="dropdown dropdown-end pl-3 mr-5">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle hover:btn-accent avatar "
            >
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
                <Link to="/dashboard">
                  <span className="hover:underline hover:text-accent">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li>
                {user ? (
                  <button onClick={() => auth.signOut()}>
                    <span className="hover:underline hover:text-accent">
                      Sign Out
                    </span>
                  </button>
                ) : (
                  <Link to="/login">
                    <span className="hover:underline hover:text-accent">
                      Login
                    </span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
