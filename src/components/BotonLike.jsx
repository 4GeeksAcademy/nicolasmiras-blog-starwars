import React, { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const BotonLike = ({ elemento }) => {
  if (!elemento || !elemento.id || !elemento.categoria || !elemento.titulo) return null;

  const { store, actions } = useContext(AppContext);
  const esFavorito = store.favoritos.some(
    fav => fav.id === elemento.id && fav.categoria === elemento.categoria
  );

  const manejarClick = () => {
    esFavorito ? actions.quitarFavorito(elemento) : actions.agregarFavorito(elemento);
  };

  const btnClass = esFavorito ? "btn-danger" : "btn-outline-danger";
  const iconClass = esFavorito ? "fas fa-heart" : "far fa-heart";
  const label = esFavorito ? `Quitar a ${elemento.titulo} de favoritos` : `Agregar a ${elemento.titulo} a favoritos`;

  return (
    <button type="button" className={`btn ${btnClass}`} aria-label={label} onClick={manejarClick}>
      <i className={iconClass}></i>
    </button>
  );
};

export default BotonLike;