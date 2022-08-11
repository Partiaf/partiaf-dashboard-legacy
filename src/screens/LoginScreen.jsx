import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { signin } from "../actions/adminActions";
import ErrorBox from "../components/ErrorBox";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "../styles/login.css";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const adminSignin = useSelector((state) => state.adminSignin);
  const { loading, error, adminInfo } = adminSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (email.length === 0 && password.length === 0) {
      swal("Los campos no pueden estar vacios", {
        icon: "error",
        dangerMode: true,
      });
    } else if (email.length === 0) {
      swal("El usuario no puede estar vacio", {
        icon: "error",
        dangerMode: true,
      });
    } else if (password.length === 0) {
      swal("La contraseña no puede estar vacia", {
        icon: "error",
        dangerMode: true,
      });
    } else {
      dispatch(signin(email.toLowerCase(), password));
    }
  };

  console.log(adminInfo);

  useEffect(() => {
    if (adminInfo) {
      if (adminInfo.status === "inactive") {
        console.log("entro");
        navigate("/verification");
      } 
      navigate(redirect)
    }
  }, [navigate, redirect, adminInfo]);
  console.log(error)

  return (
    <div className="container-login">
      {loading ? (
        <LoadingBox />
      ) : (
        <div className="login-card">
          <div className="container-logo">
            <img src="./assets/logo-partiaf.svg" alt="logo" />
          </div>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <h3 className="signin-title">Ingresa tus datos</h3>
          <form className="signin-form" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Correo electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error == "User dont exits" && <ErrorBox error={error} />}
            <input
              type="password"
              placeholder="Contrasena"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error == "Password incorrect" && <ErrorBox error={error} />}
            <input type="submit" value="Entrar" />
          </form>
          <a className="link-black" href="/reset-password">
            ¿Has olvidado tu contraseña?
          </a>
          <Link to="/register" className="register-btn">
            Ir a registrarme
          </Link>
        </div>
      )}
    </div>
  );
}
