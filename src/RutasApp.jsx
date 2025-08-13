import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import VistaCategoria from "./pages/VistaCategoria.jsx";
import DetallePage from "./pages/DetallePage.jsx";
import FavoritosPage from "./pages/FavoritosPage.jsx";

const RutasApp = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/:categoria" element={<VistaCategoria />} />
    <Route path="/detalle/:categoria/:id" element={<DetallePage />} />
    <Route path="/favoritos" element={<FavoritosPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default RutasApp;