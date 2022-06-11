import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { changePassword, resetPassword, signin } from "../actions/adminActions";
import ErrorBox from "../components/ErrorBox";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "../styles/login.css"

export default function ChangePasswordScreen() {
  
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;
  

  const navigate = useNavigate();
  const [email, setEmail] = useState(adminInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    dispatch(changePassword(email, password))
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
          
          <h3 className="signin-title">Ingresa una nueva contrasena</h3>
          <form className="signin-form" onSubmit={submitHandler} >
            
            <div className="form-control">

            <label className="label-input" htmlFor="">Contrasena</label>
            <input
              type="text"
              placeholder="Contrasena"
              
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>

        <div className="form-control">

          <label className="label-input" htmlFor="">Confirmar Contrasena</label>
            <input
              type="text"
              placeholder="Confirmar contrasena"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
        </div>
       
            <input type="submit" value="Continuar" />
          </form>
         
        </div>
    </div>
  );
}
