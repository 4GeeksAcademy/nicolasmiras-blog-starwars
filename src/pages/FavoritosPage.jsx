import React, { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import FichaItem from "../components/FichaItem.jsx";

const FavoritosPage = () => {
  const { store } = useContext(AppContext);
  const { favoritos } = store;

  return (
    <div>
      <h1 className="display-4 border-bottom border-secondary pb-2 mb-4">Mis Favoritos</h1>
      {favoritos.length === 0 ? (
        <div className="alert alert-info">
          No has guardado ningún favorito todavía. ¡Explora la galaxia y añade algunos!
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {favoritos.map(fav => (
            <div key={`${fav.categoria}-${fav.id}`} className="col">
              <FichaItem elemento={fav} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritosPage;