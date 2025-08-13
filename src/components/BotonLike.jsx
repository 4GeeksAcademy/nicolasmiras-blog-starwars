import React, { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const BotonLike = ({ elemento }) => {
  const { store, actions } = useContext(AppContext);

  if (!elemento || !elemento.id || !elemento.categoria) {
    return null;
  }

  const esFavorito = store.favoritos.some(
    (fav) => fav.id === elemento.id && fav.categoria === elemento.categoria
  );

  const manejarClick = () => {
    if (esFavorito) {
      actions.removeFavorite(elemento);
    } else {
      actions.addFavorite(elemento);
    }
  };

  const btnClass = esFavorito ? "btn-danger" : "btn-outline-danger";
  const iconClass = esFavorito ? "fas fa-heart" : "far fa-heart";
  const label = esFavorito
    ? `Quitar ${elemento.titulo} de favoritos`
    : `Agregar ${elemento.titulo} a favoritos`;

  return (
    <button
      type="button"
      className={`btn ${btnClass}`}
      aria-label={label}
      onClick={manejarClick}
    >
      <i className={iconClass}></i>
    </button>
  );
};

export default BotonLike;