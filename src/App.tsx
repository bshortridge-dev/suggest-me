import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Dashboard } from "./pages/Dashboard";
import { Register } from "./pages/Register";
import { Forgot } from "./pages/Forgot";
import Latest from "./pages/Latest";
import AskAI from "./pages/AskAI";
import Ask from "./pages/Ask";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Latest" element={<Latest />} />
          <Route path="/Ask" element={<Ask />} />
          <Route path="/AskAI" element={<AskAI />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Forgot" element={<Forgot />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
