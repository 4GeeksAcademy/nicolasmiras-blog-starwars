import React, { useState } from "react";
import { Link } from "react-router-dom";
import BotonLike from "./BotonLike.jsx";
// CORRECCIÓN: Cambiamos getUrlImagen por getImageUrl
import { getImageUrl } from "../api/swapiService";

const FichaItem = ({ elemento }) => {
  const { id, titulo, categoria } = elemento;
  // CORRECCIÓN: Usamos el nombre correcto de la función
  const imagenUrl = getImageUrl(categoria, id);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="card shadow-sm h-100 bg-dark text-white border-secondary">
      <div style={{ height: '300px', backgroundColor: '#333' }}>
        {!imageLoaded && (
          <div className="placeholder-glow w-100 h-100">
            <div className="placeholder w-100 h-100"></div>
          </div>
        )}
        <img
          src={imagenUrl}
          className="card-img-top"
          alt={titulo}
          style={{
            height: '300px',
            objectFit: 'cover',
            display: imageLoaded ? 'block' : 'none'
          }}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.style.objectFit = 'contain';
            e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
            setImageLoaded(true);
          }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text text-muted small mb-0">ID: {id}</p>
        <div className="mt-auto pt-3 d-flex justify-content-between align-items-center">
          <Link to={`/detalle/${categoria}/${id}`} className="btn btn-outline-primary">
            Ver Detalles
          </Link>
          <BotonLike elemento={elemento} />
        </div>
      </div>
    </div>
  );
};

export default FichaItem;