import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import GrillaCategorias from "./GrillaCategorias.jsx";

const HomePage = () => {
  const { store, actions } = useContext(AppContext);
  const { people, planets, vehicles, loading, error } = store;

  useEffect(() => {
    if (!people || people.length === 0) actions.loadPeople();
    if (!planets || planets.length === 0) actions.loadPlanets();
    if (!vehicles || vehicles.length === 0) actions.loadVehicles();
  }, []);

  if (loading && (!people || people.length === 0)) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div>
      <GrillaCategorias titulo="Characters" elementos={people} categoria="people" />
      <GrillaCategorias titulo="Planets" elementos={planets} categoria="planets" />
      <GrillaCategorias titulo="Vehicles" elementos={vehicles} categoria="vehicles" />
    </div>
  );
};

export default HomePage;