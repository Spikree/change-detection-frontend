import React from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home page/Home";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
