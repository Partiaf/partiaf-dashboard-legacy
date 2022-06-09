import React, { useState } from "react";
import "../styles/components/header.css";
import { Link } from "react-router-dom";
import { signout, signoutBussiness } from "../actions/adminActions";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  const signoutStoreHandler = () => {
    dispatch(signoutBussiness());
  };
  const [drop, setDrop] = useState(false);

  return (
    <header>
      <nav>
       
        <div className={drop ? "dropdown active" : "dropdown"}>
          <img className="user-image" src={adminInfo.image} alt="" />

          <div className="option">
            <Link to="/settings" className="color">
              <i className="bx bxs-cog"></i> Configuracion
            </Link>
            <button className="ml-10">
              <Link to="/setting"> Configuracion de usuario</Link>
            </button>
            <button className="ml-10" onClick={signoutStoreHandler}>
              Cambiar de negocio
            </button>
            <button className="ml-10" onClick={signoutHandler}>
              Cerrar Sesion
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
