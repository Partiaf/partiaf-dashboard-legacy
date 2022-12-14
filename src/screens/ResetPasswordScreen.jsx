import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { resetPassword, signin } from "../actions/adminActions";
import ErrorBox from "../components/ErrorBox";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "../styles/login.css"

export default function ResetPasswordScreen() {
  
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;
  

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {search} = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl? redirectInUrl : "/";


  const dispatch = useDispatch();


  // useEffect(() => {
  //   if (adminInfo) {
  //     navigate("/");
  //   }
  //   if (adminInfo && !storeInfo) {
  //     props.history.push("/");
  //   }
  // }, [props.history, adminInfo, storeInfo, props]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email))
  }

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
          <form className="signin-form" onSubmit={submitHandler} >
            <input
              type="text"
              placeholder="Correo electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
       
            <input type="submit" value="Siguiente" />
          </form>
         
        </div>
    </div>
  );
}
