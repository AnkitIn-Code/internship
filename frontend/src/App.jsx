import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AppRoutes from "./Routes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* All other routes (must include /user-login, /user-signup, /user-registration) */}
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </>
  );
}

export default App;
