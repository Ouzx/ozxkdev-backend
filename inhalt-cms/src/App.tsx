import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import EditPost from "./EditPost";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit-post" element={<EditPost />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
  );
};

export default App;
