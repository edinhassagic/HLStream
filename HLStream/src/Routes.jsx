import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./LoginPage/Login";
import StreamPage from "./StreamPage/StreamPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/stream" element={<StreamPage />} />
    </Routes>
  );
};

export default MainRoutes;
