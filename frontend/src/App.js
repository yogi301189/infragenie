import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import PromptForm from "./PromptForm";
import Docs from "./pages/Docs"; // Make sure Docs.jsx is inside /src/pages

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route
          path="/"
          element={
            <>
              <LandingPage />
              <section id="prompt" className="bg-slate-900 py-24 px-4">
                <PromptForm />
              </section>
            </>
          }
        />

        {/* Docs Route */}
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </Router>
  );
}

export default App;
