import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../index.css";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  return (
    <nav>
      <div className="navbar bg-neutral sticky">
        <div className="flex-1">
          <Link to="/">
            <a className="btn btn-ghost normal-case text-xl">suggestme.io</a>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <Link to="/Home">
            <a className="btn btn-sm normal-case text-l">Home</a>
          </Link>
          <Link to="/About">
            <a className="btn btn-outline btn-sm normal-case text-l">About</a>
          </Link>
          <div className="dropdown dropdown-end">
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
