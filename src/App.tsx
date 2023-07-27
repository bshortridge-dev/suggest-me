import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import Latest from "./pages/Latest";
import AISuggestion from "./pages/AISuggestion";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Latest" element={<Latest />} />
          <Route path="/AISuggestion" element={<AISuggestion />} />
          <Route path="/Login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
