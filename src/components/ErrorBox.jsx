import React from "react";

export default function ErrorBox({ error }) {
  return (
    <div className="error">
      {error == "Password incorrect"
        ? "La contrasena ingresada es incorrecta"
        : error == "User dont exits"
        ? "Usuario no existe"
        : ""}
    </div>
  );
}
