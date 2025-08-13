import React from "react";
import FichaItem from "../components/FichaItem.jsx";

const GrillaCategorias = ({ titulo, elementos, categoria }) => {
  return (
    <section className="mb-5">
      <h2 className="border-bottom border-secondary pb-2 mb-4 text-warning">{titulo}</h2>
      {elementos && elementos.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {elementos.map(elemento => (
            <div key={`${categoria}-${elemento.id}`} className="col">
              <FichaItem elemento={{ ...elemento, categoria }} />
            </div>
          ))}
        </div>
      ) : (
        <p>No hay elementos para mostrar en esta categoría.</p>
      )}
    </section>
  );
};

export default GrillaCategorias;