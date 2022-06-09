import React from "react";

export default function CardUser({ name, cargo }) {
  return (
    <div className="card">
      <div className="card__left">
        <div className="image"></div>
        <div>
          <h3>{name}</h3>
          <p className="normal-text">{cargo}</p>
        </div>
      </div>

      <div className="date"></div>
    </div>
  );
}
