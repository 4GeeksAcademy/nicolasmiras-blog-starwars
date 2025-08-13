import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BarraNavegacion from "./components/BarraNavegacion.jsx";
import RutasApp from "./RutasApp.jsx";

const App = () => (
  <Router>
    <BarraNavegacion />
    <main className="container py-4">
      <RutasApp />
    </main>
  </Router>
);

export default App;