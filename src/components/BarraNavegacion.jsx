import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const BarraNavegacion = () => {
  const { store, actions } = useContext(AppContext);
  const { favoritos } = store;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" alt="Star Wars Logo" style={{ height: '40px' }} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/personajes">Personajes</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/planetas">Planetas</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/vehiculos">Vehículos</NavLink></li>
          </ul>
          <div className="nav-item dropdown">
            <button className="btn btn-outline-warning dropdown-toggle" type="button" id="favoritosDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Favoritos <span className="badge bg-light text-dark">{favoritos.length}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="favoritosDropdown">
              {favoritos.length === 0 ? (
                <li><span className="dropdown-item-text text-muted">(Vacío)</span></li>
              ) : (
                favoritos.map(fav => (
                  <li key={`${fav.categoria}-${fav.id}`} className="d-flex align-items-center justify-content-between px-2">
                    <Link className="dropdown-item" to={`/detalle/${fav.categoria}/${fav.id}`}>{fav.titulo}</Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-danger"
                      onClick={() => actions.quitarFavorito(fav)}
                      aria-label={`Quitar a ${fav.titulo}`}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BarraNavegacion;