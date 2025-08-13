import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import GrillaCategorias from "./GrillaCategorias.jsx";

const VistaCategoria = () => {
  const { categoria } = useParams();
  const { store, actions } = useContext(AppContext);
  const { loading, error } = store;

  const datosCategoria = store[categoria] || [];
  const tituloPagina = `Todos los ${categoria}`;
  
  useEffect(() => {
    if (datosCategoria.length === 0) {
      switch (categoria) {
        case "personajes":
          actions.cargarPersonajes();
          break;
        case "planetas":
          actions.cargarPlanetas();
          break;
        case "vehiculos":
          actions.cargarVehiculos();
          break;
        default:
          break;
      }
    }
  }, [categoria, datosCategoria.length]);

  if (loading && datosCategoria.length === 0) {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <div className="spinner-border text-primary" style={{ width: '4rem', height: '4rem' }} role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="alert alert-warning text-center" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            <strong>¡Ups!</strong> Algo salió mal: {error}
        </div>
    );
  }

  return <GrillaCategorias titulo={tituloPagina} elementos={datosCategoria} categoria={categoria} />;
};

export default VistaCategoria;