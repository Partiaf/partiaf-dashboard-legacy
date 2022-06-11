import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { signin } from "../actions/adminActions";
import ErrorBox from "../components/ErrorBox";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "../styles/login.css"

export default function ResetPasswordScreen() {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {search} = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl? redirectInUrl : "/";


  const dispatch = useDispatch();


  return (
    <div className="container-login">
  
        <div className="login-card">
          
          <div className="container-logo">
            <img src="./assets/logo-partiaf.svg" alt="logo" />
          </div>
          <a href="/" className="back">
          <img src="./assets/left-back.svg" alt="back" />
          Atras
        </a>
          
          <h3 className="signin-title">Ingresa tu correo electronico</h3>
          <form className="signin-form" >
            <input
              type="text"
              placeholder="Correo electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
       
            <input type="submit" value="Entrar" />
          </form>
         
        </div>
    </div>
  );
}
