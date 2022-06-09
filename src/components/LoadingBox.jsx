import React from "react";
import '../styles/loading.css'

export default function LoadingBox() {
  return (
    <div className="loading__box">
      <div className="loading__circle"></div>
      <h2 className="loading__text">Cargando...</h2>
    </div>
  );
}
