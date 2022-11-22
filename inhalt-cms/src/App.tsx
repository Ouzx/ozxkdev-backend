import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Post from "./pages/Post";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
  );
};

export default App;
