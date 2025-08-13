import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { getImageUrl } from "../api/swapiService.js";

const DetallePage = () => {
  const { categoria, id } = useParams();
  const { store, actions } = useContext(AppContext);
  const detallesElemento = store.detalles?.[`${categoria}-${id}`] || null;

  useEffect(() => {
    if (!detallesElemento) {
      actions.loadDetails(categoria, id);
    }
  }, [categoria, id]);
  
  if (!detallesElemento) {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
  }

  const imagenUrl = getImageUrl(categoria, id);
  const titulo = detallesElemento.name;
  const propiedadesFiltradas = Object.entries(detallesElemento).filter(
    ([key]) => !['name', 'created', 'edited', 'homeworld', 'url'].includes(key)
  );

  return (
    <div className="container mt-4">
      <div className="card bg-dark text-white border-secondary p-4">
        <div className="row g-5">
          <div className="col-md-5">
            <img src={imagenUrl} alt={titulo} className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-7">
            <h1 className="display-3 text-warning">{titulo}</h1>
            <hr className="border-secondary" />
            <dl className="row">
              {propiedadesFiltradas.map(([clave, valor]) => (
                <React.Fragment key={clave}>
                  <dt className="col-sm-4 text-warning text-capitalize">{clave.replace(/_/g, " ")}</dt>
                  <dd className="col-sm-8 text-capitalize">{String(valor)}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
         <Link to="/" className="btn btn-outline-primary">← Back to Home</Link>
      </div>
    </div>
  );
};

export default DetallePage;