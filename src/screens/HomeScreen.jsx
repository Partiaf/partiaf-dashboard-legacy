import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import "../styles/Home.css";

export default function HomeScreen() {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { loading } = adminSignin;

  return (
    <div className="container-home">
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          <img
            className="back-logo"
            src="./img/background_wallpaper.svg"
            alt=""
          />

          <span className="front-container-logo">
            <img
              className="front-logo"
              src="./img/resources/logo-header.svg"
              alt=""
            />
            <img
              className="front-logo-word"
              src="./img/resources/partiaf-icon.svg"
              alt=""
            />
          </span>

          <img className="user-icon" src="/img/usericon.svg" alt="" />
          <Link className="home__link" to="/login">
            Iniciar sesión
          </Link>
          <Link className="home__link-none" to="/register">
            Crear usuario
          </Link>
        </>
      )}
    </div>
  );
}
