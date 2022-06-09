import React from "react";

export default function CardBooking({ name, number }) {
  return (
    <div className="card">
      <div className="card__left">
        <div className="number">{number}</div>
        <h3>{name}</h3>
      </div>
      <div className="date"></div>
    </div>
  );
}
