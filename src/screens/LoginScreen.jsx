import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { signin } from "../actions/adminActions";
import ErrorBox from "../components/ErrorBox";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "../styles/login.css"

export default function LoginScreen() {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {search} = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl? redirectInUrl : "/";

  const adminSignin = useSelector((state) => state.adminSignin);
  const { loading, error, adminInfo } = adminSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (email.length === 0 && password.length === 0) {
      swal("The fields cannot be empty", {
        icon: "error",
        dangerMode: true,
      });
    } else if (email.length === 0) {
      swal("The username cannot be empty", {
        icon: "error",
        dangerMode: true,
      });
    } else if (password.length === 0) {
      swal("The password cannot be empty", {
        icon: "error",
        dangerMode: true,
      });
    } else {
      if (error) {
        console.log(error);
      } else {
        dispatch(signin(email.toLowerCase(), password));
      }
    }
  };

  useEffect(() => {
    if(adminInfo){
      navigate(redirect)
    }
  }, [navigate, redirect, adminInfo])

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
          <a>¿Has olvidado tu contraseña?</a>
          <Link to="/register" className="register-btn">Ir a registrarme</Link>
         
        </div>
      )}
    </div>
  );
}
