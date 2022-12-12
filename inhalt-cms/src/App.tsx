import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import { Login, Home, Post, Search } from "./pages";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/santacruze" element={<Login />} />
        <Route path="/search/:searchValue" element={<Search />} />
        <Route path="*" element={<div>404 {}</div>} />
      </Routes>
    </Router>
  );
};

export default App;
