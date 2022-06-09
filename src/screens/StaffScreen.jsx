import React, { useState } from "react";
import data from "../utils/data";
import CardUser from "../components/CardUser";

export default function StaffScreen() {
  const [setName] = useState("");
  const [setNote] = useState("");
  const [chat] = useState(true);

  const setItem = (id) => {
    data.bookings
      .filter((booking) => booking.id === id)
      .map((booking) => {
        setName(booking.name);
        setNote(booking.note);
        return 200;
      });
  };
  return (
    <div className="screen-grid">
      <div className="center__screen grid">
        <div className="left__screen">
          {data.bookings.map((booking) => (
            <button
              className="button__none"
              onClick={() => setItem(booking.id)}
            >
              <CardUser
                key={booking.id}
                name={booking.name}
                cargo="Subgerente"
              />
            </button>
          ))}
          <button>
            <h4>Agregar Personal</h4>
          </button>
        </div>
        <div className="state left-state">
          {!chat ? (
            <div className="data">
              <form action="">
                <p>Datos de registro</p>

                <input type="text" placeholder="Nombre" />
                <input type="text" placeholder="Apellidos" />
                <input type="text" name="" id="" placeholder="CC" />
                <div>
                  <input type="text" placeholder="Email" />
                  <input type="text" name="" id="" placeholder="Movil" />
                </div>
                <div>
                  <input type="text" placeholder="Edad" />
                  <input type="text" name="" id="" placeholder="Direccion" />
                </div>

                <p>Ingrese contrseña y confirme</p>
                <div>
                  <input type="password" placeholder="Contraseña" />
                  <input type="password" placeholder="Confirmar contraseña" />
                </div>
                <span className="term">
                  Al registrase usted acepta los terminos y condiciones del
                  servicio de PARTIAF
                </span>
                <a href="/" className="register-link">
                  ¿Ya tiene una cuenta, desea iniciar sesión?
                </a>

                <div className="footer">
                  <button className="btn-normal">Atras</button>
                  <button>Crear</button>
                </div>
              </form>
            </div>
          ) : (
            <div className="chat">
              <h2>NO HAY MENSAJES</h2>
              <div className="footer-chat">
                <input type="text" placeholder="Escriba un mensaje" />
                <button>Enviar</button>
                <button>+</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
