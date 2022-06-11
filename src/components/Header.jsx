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
       
        <div className={drop ? "dropdown active" : "dropdown active"}>

          <div className="header-user-info">
            <h3 className="user-name">{adminInfo.firstname} {adminInfo.lastname}</h3>
          <img className="user-image" src={adminInfo.photo} alt="" />

          </div>


          <div className="option">
            
              <Link className="btn-menu" to="/setting"> Mi perfil
              
        </Link>
        <button className="btn-menu" onClick={signoutStoreHandler}>
              Configurar negocio
            </button>
            
            <button className="btn-menu" onClick={signoutStoreHandler}>
              Cambiar de negocio
            </button>
            <button className="btn-menu" onClick={signoutHandler}>
              Cerrar Sesion
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
